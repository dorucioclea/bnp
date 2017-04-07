const express = require('express');
const db = require('ocbesbn-db-init');
const config = require('ocbesbn-config');
const serverService = require('./service/serverService');

const app = express();

let server;
let bundle = (process.env.NODE_ENV === 'production') ?
  require(__dirname + '/../client/assets.json').main.js :
  'bundle.js';

serverService.initRequestHelpers(app);
serverService.initSession(app);
serverService.initRequestInterceptor(app, bundle);  /* Init global request interceptor for adding headers. */

serverService.initResources(app);

let chunksManifest;

function gracefulShutdown(msg) {
  if (msg) {
    console.log('SERVER GRACEFUL SHUTDONW:', msg);
  }

  if (server) {
    server.close(() => process.exit(0));
  }
}

function launchApplication() {
  db.init({ consul: { host: 'consul' }, retryCount: 50 })
    .then(function(db) { // eslint-disable-line dot-location
      serverService.initSecurityManager(app, db, config);
      serverService.initRoutes(app, db, config);
      serverService.initTemplate(app, bundle, chunksManifest);
    })
    .then(function() { // eslint-disable-line dot-location
      server = app.listen(process.env.PORT, err => {
        if (err) {
          console.log(err);
        }

        console.info(
          'The server is running at http://%s:%s/',
          server.address().address === '::' ? '0.0.0.0' : server.address().address,
          server.address().port
        )
      });
    }).catch(gracefulShutdown);
}

if (process.env.NODE_ENV === 'production') {
  /* chunksManifest = require(__dirname + '/../client/chunk-manifest.json'); */
  /* serverService.initChunksStatic(app, chunksManifest); */
  serverService.initBundleStatic(app, bundle);
  serverService.initCssBundle(app);
} else {
  if (process.env.NODE_ENV !== 'test') {
    serverService.initDevWebpack(app);
  }
}
if (process.env.NODE_ENV !== 'test') {
  /* launch aplication */
  launchApplication();
}

// listen for TERM signal .e.g. "kill" or "docker[-compose] stop" commands.
process.on('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);

// Export below is needed for the sake of testing (see "request(app)" in "test/utils/testUtils.js", line 21).
module.exports = app;
