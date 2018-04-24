'use strict';

const Logger = require('ocbesbn-logger'); // Logger
const db = require('@opuscapita/db-init'); // Database
const server = require('@opuscapita/web-init'); // Web server


const isProduction = process.env.NODE_ENV === 'production';
const logger = new Logger();

if(isProduction)
    logger.redirectConsoleOut(); // Force anyone using console outputs into Logger format.

// Basic database and web server initialization.
// See database : https://github.com/OpusCapita/db-init
// See web server: https://github.com/OpusCapita/web-init
db.init().then((db) => server.init({
    routes : {
        dbInstance : db
    },
    server : {
        port : process.env.PORT || 3000,
        staticFilePath : process.cwd() + '/src/server/static',
        webpack : {
           useWebpack : !isProduction,
           configFilePath : process.cwd() + '/webpack.development.config.js'
       }
    }
}))
.catch((e) =>
{
    server.end();
    throw e;
});
