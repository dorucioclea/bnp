/**
 * An middleware which parse
 * the user data from gatway and append them inside the request header
 */

const _  = require('lodash');

function userIdentity(_req, res, next) {
  let userData = {};
  let req = _req;
  _.each(req.headers, function(value, key) {
    if (key.indexOf('x-user-') > -1) {
      userData[key.replace('x-user-', '')] = value;
    }
  });

  userData['username'] = userData['email'];

  /**
   * function to return the userdata completely or
   * based on the key
   * @param key - string
   * @return userData
   */
  req.userData = function(key) {
    if (key) {
      return userData[key];
    }

    return userData;
  };

  if (userData['username']) {
    req.isAuthenticated = true;
    next();
  } else {
    req.isAuthenticated = false;
    // #TODO send 401 to invalidate the request infuture
    // res.sendStatus(401);
    next()
  }
}

module.exports = userIdentity;
