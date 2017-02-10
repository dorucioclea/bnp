const sendMail = require('./../mailer');
const currentUserInfoService = require('../service/currentUserInfoService');
const getOriginalProtocolHostPort = require('../utils/lib.js').getOriginalProtocolHostPort;

let md5 = require('md5');
let serviceErrorHandlingService = require('./../service/serviceErrorHandlingService');
let databaseErrorHandlingService = require('./../service/databaseErrorHandlingService');
let CryptoJS = require('crypto-js');
let db;

function verify(req, res) {
  db.User.update({
    locked: false,
    verificationToken: null
  }, {
    where: {
      verificationToken: req.body.verificationToken
    }
  }).then(([affectedCount]) => {
    if (affectedCount === 0) {
      console.warn(`User verification failed: verification token ${req.body.verificationToken} not found`);
      res.status(404).send({ global: 'User not found' });
      return;  // The same as return Promise.resolve();
    }

    console.info(`User verification success for verification token ${req.body.verificationToken}`);
    res.sendStatus(201);
    return;  // The same as return Promise.resolve();
  }).catch(err => {
    serviceErrorHandlingService.generateErrorAndSendResponse(err, res, 'Prov');
  });
}

function createAbsentUser(req, transaction) {
  let newUser = {
    loginName: req.body.EMail,
    password: md5(CryptoJS.AES.decrypt(req.body.Password, 'SecretJcatalogPasswordKey').toString(CryptoJS.enc.Utf8)),
    verificationToken: md5(new Date().getTime()),
    locked: true,
    email: req.body.EMail,
    createdBy: req.body.EMail,
    changedBy: req.body.EMail
  };

  return db.User.create(newUser, {
    transaction
  }).then(createdUser => sendMail(
    req.cookies.LANGUAGE_COOKIE_KEY,
    'registration',
    {
      email: req.body.EMail,
      simUrl: getOriginalProtocolHostPort(req),
      verificationToken: newUser.verificationToken,
      name: 'Business Network Portal service'
    }
  )).then(() => {
    console.info(`User ${newUser.loginName} has been created`);
    console.info(`Registration email has been sent`);
    console.info(`CurrentUserInfo is ${req.session.currentUserInfo}`);
    return transaction.commit();
  }).catch(err => {
    transaction.rollback();
    return Promise.reject(err);
  });
}

function createUser(req, res) {
  console.info(`Creating new account ${req.body.EMail}`);

  db.User.findOne({
    where: {
      loginName: req.body.EMail
    }
  }).then(existingUser => {
    if (existingUser) {
      res.status(203).send(`User ${req.body.EMail} already exists!`);
      return Promise.resolve();  // The same as
      // return;
    }

    return db.sequelize.transaction().
      then(transaction => createAbsentUser(req, transaction)).
      then(() => res.status(201).send('Message sent'));
  }).catch(err => databaseErrorHandlingService.generateErrorAndSendResponse(err, res));
}

function getCurrentUserInfo(req, res) {
  (req.query.reload === 'true' && req.isAuthenticated ?
    currentUserInfoService(db, req.userData(), req.userData('username')) :
    Promise.resolve(req.userData())
  ).  // eslint-disable-line dot-location
  then(currentUserInfo => res.send({ currentUserInfo })).
  catch(err => res.status(err.status).send(err.data));
}

module.exports = function(dbObj) {
  db = dbObj;

  return {
    verify,
    createUser,
    getCurrentUserInfo
  };
};
