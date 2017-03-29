var express = require('express');
var serverService = require('./service/serverService');
var app = express();
var network = require('network');
var Promise = require('bluebird');

import db from "ocbesbn-dbinit";
import config from "ocbesbn-config";

var server;

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
  //launch aplication
  getConsulAddress(function (address) {
    launchApplication(address, server);
  })
}

function getConsulAddress(callback) {
  if (process.env.CONSUL_HOST) {
    callback(process.env.CONSUL_HOST);
  } else {
    network.get_gateway_ip(function(err, ip) {
      if (err) {
        console.log('warn: Gateway IP not found');
        callback('consul');
      } else {
        callback(ip);
      }
    })
  }
}

function launchApplication(consulAddress, server) {
  console.log("Initializing Consul connection.");
  config.init({ host: consulAddress })
    .tap(function() {console.log("Consul connection initialized!")})
    .then(function (config) {
      return Promise.props({
        database: config.get("mysql/database"),
        username: config.get("mysql/username"),
        password: config.get("mysql/password"),
        _service: config.getEndPoint("mysql")
      });
    })
    .then(function (credentials) {
      console.log("Initializing Database connection.");
      credentials.host = credentials._service.host;
      credentials.port = credentials._service.port;

      if (process.env.NODE_ENV !== 'production') {
        credentials.username = credentials.username || "root";
        credentials.password = credentials.password || process.env.MYSQL_ROOT_PASSWORD;
        credentials.database = credentials.database || process.env.MYSQL_DATABASE;
      }

      return db.init(credentials);
    })
    .tap(function() {console.log("DB connection initialized!")})
    .then(function () {
      console.log("Migrating Database.");
      return db.migrate(`./src/server/db/migrations`);
    })
    .tap(function() {console.log("DB migrated!")})
    .then(db => {
      console.log("Preparing models.")
      require(`./db/models`).associateModels(db.getConnection());  // prepare models
      return db;
    })
    .then(db => {
      console.log("Populating data.")
      require(`./db/data`)(db.getConnection());  // populate data
    })
    .then(db => {
      serverService.initSecurityManager(app, db, config);
      serverService.initRoutes(app, db, config);
      serverService.initTemplate(app, bundle, chunksManifest);
    })
    .then(function () {
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

function gracefulShutdown(msg) {
  if (msg) {
    console.log('SERVER GRACEFUL SHUTDONW:', msg);
  }

  server && server.close(() => process.exit(0));
}

// listen for TERM signal .e.g. "kill" or "docker[-compose] stop" commands.
process.on('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);

// Export below is needed for the sake of testing (see "request(app)" in "test/utils/testUtils.js", line 21).
export default app;
