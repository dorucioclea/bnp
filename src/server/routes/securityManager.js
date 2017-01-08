import LocalStrategy from 'passport-local';
import passport from 'passport';
import md5 from 'md5';
import databaseErrorHandlingService from '../service/databaseErrorHandlingService';
const currentUserInfoService = require('../service/currentUserInfoService');

module.exports = function(app, db) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy((username, password, done) => db.User.find({
    where: {
      LoginName: username,
      Password: md5(password)
    }
  }).then(user => {
    if (!user || !user.dataValues || user.dataValues.locked) {
      console.warn("User hasn't been logged in: no such user or the user is locked");
      return done(null, false);
    }

    return done(null, {
      username: username,
      password: password
    });
  }).catch(err => done(err, false))));

  passport.serializeUser((user, done) => done(null, user.username));

  passport.deserializeUser((username, done) => done(null, {
    username: username
  }));

  app.post('/login', (req, res, next) => {
    console.info(`Attempt to login user ${req.body.username}...`);

    passport.authenticate('local', (err, user, info) => {
      if (err || !user) {
        console.warn(`User isn't logged in, ${err || 'user not found'}`);

        if (err) {
          databaseErrorHandlingService.generateErrorAndSendResponse(err, res);
        } else {
          res.sendStatus(401);
        }

        return;
      }

      req.logIn(user, err => {
        if (err) {
          console.warn("User hasn't been logged in: ", err);
          return res.sendStatus(401);
        }

        console.info('User has been logged in');

        return currentUserInfoService(
          db,
          req.session,
          req.session.passport.user,
          req.body.language
        ).
          then(userInfo => res.send({
            userInfo,
            returnTo: req.session.returnTo
          })).
          catch(err => {
            console.log('ERROR EXTRACTING USER INFO:', err);
            res.status(err.status).send(err.data);
          });
      });
    })(req, res, next);
  });

  app.get('/logout', (req, res) => {
    req.session.destroy(err => res.sendStatus(200));
  });

  app.get('/isAuthenticated', (req, res) => {
    return req.isAuthenticated && req.isAuthenticated() ?
      res.send({
        username: req.session.currentUserInfo.username,
      }) :
      res.sendStatus(401);
  });

  app.use('/api/*', (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      console.warn(`Not authenticated user rejected to use api`);
      return res.sendStatus(401);
    }

    return next();
  });
}
