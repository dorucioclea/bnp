const LocalStrategy = require('passport-local');
const passport = require('passport');
const md5 = require('md5');
const databaseErrorHandlingService = require('../service/databaseErrorHandlingService');
const currentUserInfoService = require('../service/currentUserInfoService');
const { getPublisher } = require("./redisConfig");

module.exports = function(app, db, config) {
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
          config,
          req.userData(),
          req.userData('username'),
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
    return req.isAuthenticated ?
      res.send({
        username: req.userData('username'),
      }) :
      res.sendStatus(401);
  });

  /*
    Event propagation code start here with redis
    ### TODO: Check for which event to publish.
  */
  const populateEvent = (username) => {
    const onboardingUser = JSON.parse(req.cookies.ONBOARDING_DATA);
    if (onboardingUser.campaignId && onboardingUser.userId === username) {
      getPublisher().then((publisher) => {
        publisher.publish("onboarding", JSON.stringify({
          "email": onboardingUser.userId,
          "transition": "onboarded",
          "contactId": onboardingUser.contactId,
          "campaignId": onboardingUser.campaignId
        }));
      })
    }
  }

  app.get('/onboardingDone', (req, res) => {
    db.User.
      update({
        showWelcomePage: false
      }, {
        where: { LoginName: req.userData('email') }
      }).
      then(([affectedCount]) => {
        if (affectedCount === 0) {
          console.warn(
            `Onboarding final submit has failed. User ${req.userData('username')} not found`
          );
          return res.sendStatus(401);
        }
        populateEvent(req.userData('username'));
        req.session.currentUserInfo.showWelcomePage = false;  // eslint-disable-line no-param-reassign
        return res.sendStatus(205);
      }).
      catch(err => {
        console.log(`Error unsetting "showWelcomePage" for ${req.userData('username')}`, err);
        res.status(403).send(err);
      });
  });

  app.use('/api/*', (req, res, next) => {
    if (!req.isAuthenticated) {
      console.warn(`Not authenticated user rejected to use api`);
      return res.sendStatus(401);
    }

    return next();
  });
}
