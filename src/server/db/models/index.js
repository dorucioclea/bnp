'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_CONFIG_FILE = path.normalize(__dirname + './../../../../db.config.json');

let config = {};

try {
  // NOTE: config file has priority over env variables.
  config = require(DB_CONFIG_FILE)[NODE_ENV];
} catch (err) {
  if (
    ! process.env.RDS_USERNAME ||
    ! process.env.RDS_PASSWORD ||
    ! process.env.RDS_DB_NAME ||
    ! process.env.RDS_HOSTNAME ||
    ! process.env.RDS_PORT ||
    ! process.env.RDS_DIALECT
  ) {
    throw new Error(`DB configuration file "${DB_CONFIG_FILE}" is not found or can't be read.` +
      ' Use db.config.json.sample file as a boilerplate for your own config.');
  }

  config = {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    dialect: process.env.RDS_DIALECT
  };
}

let db = {
  Sequelize,
  sequelize: new Sequelize(config.database, config.username, config.password, config)
};

function findModels(dir) {
  return fs.readdirSync(dir).reduce((list, file) => {
    let name = path.join(dir, file);
    let isDir = fs.statSync(name).isDirectory();
    let moduleName = file.replace(/\.[^/.]+$/, '');
    return list.concat(isDir ? findModels(name) : (moduleName === 'index' ? [] : [moduleName]));
  }, []);
}

findModels(__dirname).forEach(moduleName => {
  let m = require(`./${moduleName}`)(db.sequelize);
  db[m.name] = m;
});

Object.keys(db).forEach(modelName => db[modelName].associate && db[modelName].associate(db));

if (config.populateDatabase) {
  switch (config.populateDatabase) {
    case 'system':
      require('../data/system').default(db);
      require('../data/demo').default(db);
      break;
    case 'demo':
      require('../data/demo').default(db);
      break;
    default:
      throw new Error(
        `${config.populateDatabase} is unknown populateDatabase param in DB configuration file "${DB_CONFIG_FILE}".`
      );
  }
}

export default db;
