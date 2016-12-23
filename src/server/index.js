const express = require('express');
const serverService = require('./service/serverService');
const app = express();

let bundle = (process.env.NODE_ENV === 'production') ?
  require(__dirname + '/../client/assets.json').main.js :
  'bundle.js';

serverService.initRequestHelpers(app);
serverService.initSession(app);
serverService.initRequestInterceptor(app, bundle);  // Init global request interceptor for adding headers.

let chunksManifest;

if (process.env.NODE_ENV === 'production') {
  chunksManifest = require(__dirname + '/../client/chunk-manifest.json');
  serverService.initChunksStatic(app, chunksManifest);
  serverService.initBundleStatic(app, bundle);
  serverService.initCssBundle(app);
} else {
  serverService.initMorganLogger(app);

  if (process.env.NODE_ENV !== 'test') {
    serverService.initDevWebpack(app);
  }
}

if (process.env.NODE_ENV !== 'test') {
  // require("./logger");
  serverService.initResources(app);
  serverService.initSecurityManager(app);
  serverService.initRoutes(app);
  serverService.initTemplate(app, bundle, chunksManifest);
}

let server = app.listen(process.env.PORT, err => {
  if (err) {
    console.log(err);
  }

  console.info(
    'The server is running at http://%s:%s/',
    server.address().address === '::' ? '0.0.0.0' : server.address().address,
    server.address().port
  )
});

function gracefulShutdown(msg) {
  console.log('SERVER GRACEFUL SHUTDONW', msg && `: ${msg}` || '', '...');
  server.close(() => process.exit(0));
}

// listen for TERM signal .e.g. "kill" or "docker[-compose] stop" commands.
process.on('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);

// Export below is needed for the sake of testing (see "request(app)" in "test/utils/testUtils.js", line 21).
export default app;
