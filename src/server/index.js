'use strict';

const Logger = require('ocbesbn-logger'); // Logger
const db = require('ocbesbn-db-init'); // Database
const server = require('ocbesbn-web-init'); // Web server

const logger = new Logger();

if(process.env.NODE_ENV === 'production')
    logger.redirectConsoleOut(); // Force anyone using console outputs into Logger format.

// Basic database and web server initialization.
// See database : https://github.com/OpusCapitaBusinessNetwork/db-init
// See web server: https://github.com/OpusCapitaBusinessNetwork/web-init
db.init({
    consul : {
        host : 'consul'
    },
    retryCount : 50
})
.then((db) => server.init({
    routes : {
        dbInstance : db
    },
    server : {
        port : process.env.PORT || 3000,
        enableBouncer : false,
        staticFilePath : process.cwd() + '/src/server/static',
        webpack : {
           useWebpack : true,
           configFilePath : process.cwd() + '/webpack.development.config.js'
       }
    },
    serviceClient : {
        injectIntoRequest : true,
        consul : {
            host: 'consul'
        }
    }
}))
.catch((e) =>
{
    server.end();
    throw e;
});
