'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_CONFIG_FILE = path.normalize(__dirname + '/../../../../db.config.json');
const DB_SERVICE_NAME = 'mysql';

function findModels(dir) {
  return fs.readdirSync(dir).reduce((list, file) => {
    let name = path.join(dir, file);
    let isDir = fs.statSync(name).isDirectory();
    let moduleName = file.replace(/\.[^/.]+$/, '');
    return list.concat(isDir ?
      findModels(name) :
      (moduleName === 'index' || moduleName.charAt(0) === '.' ? [] : [moduleName])
    );
  }, []);
}

function getDb(config) {
  console.log('\n-----------\nDB configuration\n', config, '\n-----------\n');

  let db = {
    Sequelize,
    sequelize: new Sequelize(config.database, config.username, config.password, config)
  }

  findModels(__dirname).forEach(moduleName => {
    let m = require(`./${moduleName}`)(db.sequelize);
    db[m.name] = m;
  });

  Object.keys(db).forEach(modelName => db[modelName].associate && db[modelName].associate(db));
  return db;
}

let dbConfig;

try {
  // NOTE: config file has priority over env variables.
  dbConfig = require(DB_CONFIG_FILE)[NODE_ENV];
} catch (ignore) {
  // Config file is not found.
}

dbConfig = {
  username: dbConfig && dbConfig.username || process.env.DB_USER,
  password: dbConfig && dbConfig.password || process.env.DB_PASSWORD,
  database: dbConfig && dbConfig.database || process.env.DB_NAME,
  host: dbConfig && dbConfig.host || process.env.DB_HOST,
  port: dbConfig && dbConfig.port || process.env.DB_PORT,
  dialect: dbConfig && dbConfig.dialect || process.env.DB_DIALECT || 'mysql'
};

let consulPromises = [];

if (Object.keys(dbConfig).filter(param => !dbConfig[param]).length) {
  console.log('===== NOT ALL PARAMS ARE CORRECTLY SET',
    Object.keys(dbConfig).filter(param => !dbConfig[param])
  );
  // See why and how /etc/hosts is populated with "dockerhost" in "startup-script".
  const consul = require('consul')({ host: 'dockerhost' });

  if (!dbConfig.host || !dbConfig.port) {
    consulPromises.push(new Promise((resolve, reject) => consul.catalog.service.nodes(DB_SERVICE_NAME, (err, rez) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        host: rez && rez[0] && rez[0].ServiceAddress,
        port: rez && rez[0] && rez[0].ServicePort
      });

      return;
    })));
  }

  if (!dbConfig.username || !dbConfig.password || !dbConfig.database) {
    consulPromises.push(new Promise((resolve, reject) => consul.kv.get({
      key: 'MYSQL_',
      recurse: true
    }, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      resolve((Array.isArray(result) && result || []).reduce((rez, kvPair) => {
        let param;

        switch (kvPair.Key) {
          case 'MYSQL_DATABASE':
            param = 'database';
            break;
          case 'MYSQL_PASSWORD':
            param = 'password';
            break;
          case 'MYSQL_USER':
            param = 'username';
            break;
          default:
            param = null;
        }

        return param ? {
          ...rez,
          [param]: rez[param] || kvPair.Value
        } : rez;
      }, {}));

      return;
    })));
  }
}

let dbPromise = Promise.all(consulPromises).
  then(results => {
    results.forEach(result => Object.keys(result).forEach(param => {
      dbConfig[param] = dbConfig[param] || result[param];
    }));

    let notSpecified = Object.keys(dbConfig).filter(param => !dbConfig[param]);

    if (notSpecified.length) {
      return Promise.reject(`The following required params must be set in "${DB_CONFIG_FILE}", ENV vars or Consul: "` +
        notSpecified.join('", "') + '"');
    }

    let db = getDb(dbConfig);

    if (dbConfig.populateDatabase) {
      switch (dbConfig.populateDatabase) {
        case 'system':
          require('../data/system').default(db);
          require('../data/demo').default(db);
          break;
        case 'demo':
          require('../data/demo').default(db);
          break;
        default:
          throw new Error(
            `${dbConfig.populateDatabase} is unknown value for "populateDatabase" param in DB configuration file.`
          );
      }
    }

    return Promise.resolve(db);
  });

module.exports = dbPromise;

