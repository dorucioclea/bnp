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

serverService.runServer(app);

// Export below is needed for the sake of testing (see "request(app)" in "test/utils/testUtils.js", line 21).
export default app;
