const getUserData = (db, username, _user) => {
  let user = _user;
  return db.models.User.find({
    where: { loginName: username },
    raw: true,
  }).then((data) => {
    if (data) {
      user['showWelcomePage'] = data.showWelcomePage;
      return Promise.resolve(user);
    } else {
      return Promise.reject({});
    }
  })
}

exports.getUserData = getUserData;
