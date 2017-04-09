'use strict'

const Promise = require('bluebird');

const serverService = require('../service/serverService');
const bundle = (process.env.NODE_ENV === 'production') ? require(__dirname + '/../../client/assets.json').main.js : 'bundle.js';

/**
 * Initializes all routes for RESTful access.
 *
 * @param {object} app - [Express]{@link https://github.com/expressjs/express} instance.
 * @param {object} db - If passed by the web server initialization, a [Sequelize]{@link https://github.com/sequelize/sequelize} instance.
 * @param {object} config - Everything from [config.routes]{@link https://github.com/OpusCapitaBusinessNetwork/web-init} passed when running the web server initialization.
 * @returns {Promise} [Promise]{@link http://bluebirdjs.com/docs/api-reference.html}
 * @see [Minimum setup]{@link https://github.com/OpusCapitaBusinessNetwork/web-init#minimum-setup}
 */
module.exports.init = function(app, db, config)
{
    // Register routes here.
    // Use the passed db parameter in order to use Epilogue auto-routes.
    // Use require in order to separate routes into multiple js files.

    let chunksManifest;

    serverService.initSession(app);
    serverService.initResources(app);
    serverService.initSecurityManager(app, db, config);
    serverService.initRoutes(app, db, config);
    serverService.initTemplate(app, bundle, chunksManifest);


    if (process.env.NODE_ENV === 'production') {
      /* chunksManifest = require(__dirname + '/../client/chunk-manifest.json'); */
      /* serverService.initChunksStatic(app, chunksManifest); */
      serverService.initBundleStatic(app, bundle);
      serverService.initCssBundle(app);
    }

    // Always return a promise.
    return Promise.resolve();
}
