const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const onHeaders = require('on-headers');
const lessMiddleware = require('less-middleware');

const COOKIE_SECRET = 'keyboard cat';
const JCATALOG_RESOURCES = '../static/jcatalog';
const BNP_STATIC = '../static/bnp/static';
const FAVICON_ICO = path.join(JCATALOG_RESOURCES, 'favicon.ico');
const SIM_VIEWS = '../static/bnp/views';
const MAIN_CSS = '../../client/main.css';
const { getOriginalProtocolHostPort, getCurrentServiceHost, getSupplierServiceHost } = require('../utils/lib.js');

function scrubETag(res) {
  onHeaders(res, function() {
    this.removeHeader('ETag')
  });
}

function initRequestHelpers(app) {
  let userIdentityMiddleware = require('useridentity-middleware');
  app.use(userIdentityMiddleware);
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

function initCssBundle(app) {
  app.use('/static/main.css', express.static(path.join(__dirname, MAIN_CSS)));
}

function initRoutes(app, db, config) {
  let applicationConfigRoutes = require('./../routes/applicationConfig');
  app.get('/applicationConfig/url', (req, res) => res.send({
    simUrl: getCurrentServiceHost(req),
    simSupplierUrl: getSupplierServiceHost(req)
  }));
  app.get('/applicationConfig/defaultLocale', applicationConfigRoutes.getDefaultLocale);
  app.get('/applicationConfig/formatPatterns', applicationConfigRoutes.getFormatPatterns);
}

function initSecurityManager(app, db, config) {
}

function initTemplate(app, bundle, chunksManifest) {
  app.engine('handlebars', expressHandlebars());
  app.set('view engine', 'handlebars');
  app.set('views', path.resolve(path.join(__dirname, SIM_VIEWS)));
  app.set('trust proxy', true);

  app.use('/', function(req, res) {
    res.render('home', {
      simPublicUrl: getOriginalProtocolHostPort(req),
      simUrl: getCurrentServiceHost(req),
      simSupplierUrl: getSupplierServiceHost(req),
      bundle: bundle,
      chunksManifest: JSON.stringify(chunksManifest),
      isProductionMode: (process.env.NODE_ENV === 'production'),
      userData: req.userData(),
      helpers: {
        json: function (obj) {
          return JSON.stringify(obj);
        }
      }
    });
  });
}

module.exports = {
  initRequestHelpers,
  initSession,
  initResources,
  initChunksStatic,
  initCssBundle,
  initRoutes,
  initSecurityManager,
  initTemplate
}
