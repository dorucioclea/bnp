const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const onHeaders = require('on-headers');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const lessMiddleware = require('less-middleware');
const ajaxRequest = require('superagent');

const COOKIE_SECRET = 'keyboard cat';
const JCATALOG_RESOURCES = '../../../resources/jcatalog';
const BNP_STATIC = '../../../resources/bnp/static';
const FAVICON_ICO = path.join(JCATALOG_RESOURCES, 'favicon.ico');
const SIM_VIEWS = '../../../resources/bnp/views';
const MAIN_CSS = '../../client/main.css';
const WEBPACK_DEV_CONFIG = './../../../webpack.development.config.js';
const bnpInternalUrl = 'http://127.0.0.1:' + process.env.PORT;
const getOriginalProtocolHostPort = require('../utils/lib.js').getOriginalProtocolHostPort;

function scrubETag(res) {
  onHeaders(res, function() {
    this.removeHeader('ETag')
  });
}

function initRequestHelpers(app) {
  app.use(bodyParser.json());
  app.use(cookieParser(COOKIE_SECRET));
  app.use(helmet());
}

function initRequestInterceptor(app, bundle) {
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Cache-control, Expires, ETag, Last-Modified');

    res.header('Access-Control-Request-Method', 'GET, POST, PUT, DELETE, OPTIONS');

    if (req.originalUrl.indexOf(bundle) === -1 || process.env.NODE_ENV !== 'production') {
      res.header('Cache-Control', 'max-age=0, must-revalidate');
      res.header('Expires', 0);
    }

    next();
  });
}

function initSession(app) {
  // TODO:
  // 1. change storage from in-memory one for production to prevent memory leaks.
  // 2. change secret, resave, and saveUninitializee according to recommendations.
  // For more details see https://github.com/expressjs/session
  app.use(session({
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    name: 'bnp.connect.sid'  // It must be different than session names of scripts running on the same host.
  }));
}

function initMorganLogger(app) {
  // TODO: replace "morgan" with "express-winston".
  app.use(morgan('dev', {
    stream: {
      write: console.log
    },
    skip(req, res) {
      return (req.originalUrl === '/user/isSessionExpired');
    }
  }));
}

function initResources(app) {
  // NOTE: less-middleware MUST be declared before static middleware, since the same JCATALOG_RESOURCES dir is used.
  // For more details see
  // https://github.com/emberfeather/less.js-middleware
  app.use(lessMiddleware(path.join(__dirname, JCATALOG_RESOURCES)));

  app.use(express.static(path.join(__dirname, JCATALOG_RESOURCES), {
    setHeaders(res, path) {
      if (path.indexOf('react') === -1) {
        // Remove ETag header because Apache modifies it for static resources
        // Use Last-Modified header instead for cache validation
        scrubETag(res);
      } else {
        // cache react resources
        res.header('Cache-Control', 'public, s-maxage=31536000, max-age=31536000');
        res.header('Expires', new Date(Date.now() + 31536000000).toUTCString());
      }
    }
  }));

  app.use(express.static(path.join(__dirname, BNP_STATIC)));

  app.use('/static/favicon.ico', express.static(path.join(__dirname, FAVICON_ICO)));
}

function initChunksStatic(app, chunksManifest) {
  for (let chunkNum of Object.keys(chunksManifest)) {
    let chunkFileName = chunksManifest[chunkNum];

    app.use(`/${chunkFileName}`, express.static(path.join(__dirname, `/../../client/${chunkFileName}`), {
      setHeaders(res) {
        res.header('Cache-Control', 'public, s-maxage=31536000, max-age=31536000');
        res.header('Expires', new Date(Date.now() + 31536000000).toUTCString());
        res.header('Content-Type', 'application/javascript');
      }
    }));
  }
}

function initBundleStatic(app, bundle) {
  console.error('init bundle', bundle);

  app.use(`/static/${bundle}`, express.static(path.join(__dirname, `/../../client/${bundle}`), {
    'setHeaders': function(res) {
      res.header('Cache-Control', 'public, s-maxage=31536000, max-age=31536000');
      res.header('Expires', new Date(Date.now() + 31536000000).toUTCString());
      res.header('Content-Type', 'application/javascript');
    }
  }));
}

function initCssBundle(app) {
  app.use('/static/main.css', express.static(path.join(__dirname, MAIN_CSS)));
}

function initRoutes(app, db) {
  let viewLogRoutes = require('./../routes/viewLog');
  app.get('/viewLog/*', viewLogRoutes.downloadLogs);

  let userRoutes = require('./../routes/user')(db);
  app.post('/user/verify', userRoutes.verify);
  app.post('/user/createUser', userRoutes.createUser);
  app.get('/user/currentUserInfo', userRoutes.getCurrentUserInfo);

  let applicationConfigRoutes = require('./../routes/applicationConfig');
  app.get('/applicationConfig/url', (req, res) => res.send(getOriginalProtocolHostPort(req)));
  app.get('/applicationConfig/defaultLocale', applicationConfigRoutes.getDefaultLocale);
  app.get('/applicationConfig/formatPatterns', applicationConfigRoutes.getFormatPatterns);
}

function initSecurityManager(app, db) {
  require('./../routes/securityManager')(app, db);
}

function initTemplate(app, bundle, chunksManifest) {
  app.engine('handlebars', expressHandlebars());
  app.set('view engine', 'handlebars');
  app.set('views', path.resolve(path.join(__dirname, SIM_VIEWS)));
  app.set('trust proxy', true);

  app.use('/', function(req, res) {
    // eslint-disable-next-line no-param-reassign
    req.session.returnTo = (
      !req.session.currentUserInfo &&
      req.originalUrl.indexOf('/login') === -1 &&
      req.originalUrl.indexOf('/logout') === -1 &&
      req.originalUrl.indexOf('/registration') === -1 &&
      req.originalUrl.indexOf('/registration/confirmation') === -1
    ) ?
      req.originalUrl :  // Unknown user wants to view portal internal resources.
      null;

    if (req.session.currentUserInfo && req.originalUrl.indexOf('/login') !== -1) {
      // Known user is at login-page.
      res.redirect(getOriginalProtocolHostPort(req) + '/dashboard');
    } else {
      res.render('home', {
        simPublicUrl: getOriginalProtocolHostPort(req),
        bundle: bundle,
        chunksManifest: JSON.stringify(chunksManifest),
        isProductionMode: (process.env.NODE_ENV === 'production')
      });
    }
  });
}

function initDevWebpack(app) {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const compiler = webpack(require(WEBPACK_DEV_CONFIG));

  app.use(webpackMiddleware(compiler, {
    publicPath: '/static',
    stats: { colors: true },
    noInfo: true
  }));

  app.use('/[0-9]+\.chunk\.js', (req, res) => ajaxRequest.
    get(`${bnpInternalUrl}/static${req.originalUrl}`).
    accept('json').
    then(response => {
      res.header('Content-Type', 'application/javascript');
      res.send(response.body);
    }).
    catch(err => { throw err })
  );
}

module.exports = {
  initRequestHelpers,
  initRequestInterceptor,
  initSession,
  initMorganLogger,
  initResources,
  initChunksStatic,
  initBundleStatic,
  initCssBundle,
  initRoutes,
  initSecurityManager,
  initTemplate,
  initDevWebpack
}
