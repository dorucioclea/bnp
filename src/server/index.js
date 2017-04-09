'use strict';

const server = require('ocbesbn-web-init'); // Web server
const db = require('ocbesbn-db-init'); // Database

const PORT = process.env.PORT || 3000;
const webpackConfig = __dirname + '/webpack.config.js';

// Basic database and web server initialization.
// See database : https://github.com/OpusCapitaBusinessNetwork/db-init
// See web server: https://github.com/OpusCapitaBusinessNetwork/web-init

db.init({ consul : { host: 'consul' }, retryCount: 50 })
  .then((db) => server.init({
    server: {
      port: PORT,
      staticFilePath: __dirname + '/static',
      webpack: {
        useWebpack: true,
        configFilePath: webpackConfig
      }
    },
    routes: { dbInstance: db }
  }))
  .catch((e) => { server.end(); throw e; });
