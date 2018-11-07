'use strict'

const Promise = require('bluebird');

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
    const checkTentantMiddleware = (req, res, next) =>
    {
        const { roles } = req.opuscapita.userData();

        if(roles && roles.includes('registering_supplier') && !req.originalUrl.toLowerCase().startsWith('/supplierregistration'))
            res.redirect(`/bnp/supplierRegistration`);
        else
            next();
    };

    const indexFilePath = process.cwd() + '/src/server/templates/index.html';

    app.get('*', [ checkTentantMiddleware ], (req, res) => res.sendFile(indexFilePath));

    return Promise.resolve();
}
