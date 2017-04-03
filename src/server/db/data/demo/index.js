let users = require('./user.json');

function updateIfCreated(data, entity, created) {
  if (!created) {
    return entity.update(data, { fields: Object.keys(data) });
  }

  return entity;
}

module.exports = function(db) {
  const userPromises = users.map(data => {
    return db.models.User.findOrCreate({
      where: {
        loginName: data.loginName
      },
      defaults: data
    }).spread(updateIfCreated.bind(this, data));
  });

  return Promise.all(userPromises);
};

