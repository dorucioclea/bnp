'use strict';
const Promise = require('bluebird');

const User = require('./User');


module.exports.init = function(db) {
  db.import('User', User);
  return Promise.resolve();
};
