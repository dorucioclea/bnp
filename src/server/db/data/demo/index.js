let users = require('./user.json');

function updateIfCreated(data, entity, created) {
  if (!created) {
    return entity.update(data, { fields: Object.keys(data) });
  }

  return entity;
}

module.exports = function(db) {
  users.forEach(data => {
    db.User.findOrCreate({
      where: {
        loginName: data.loginName
      },
      defaults: data
    }).spread(updateIfCreated.bind(this, data));
  });
};

