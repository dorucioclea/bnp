const UserDemoData = require('../data/demo');

module.exports = {
  up(db) {
    return UserDemoData(db);
  },

  down(db) {
  }
};
