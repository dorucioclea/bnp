const sendMail = require('./../mailer');

let modelsPromise = require('./../db/models');
let md5 = require('md5');
let serviceErrorHandlingService = require('./../service/serviceErrorHandlingService');
let databaseErrorHandlingService = require('./../service/databaseErrorHandlingService');
let CryptoJS = require('crypto-js');

function verify(req, res) {
  modelsPromise.then(models => models.User.update({
    locked: false,
    verificationToken: null
  }, {
    where: {
      verificationToken: req.body.verificationToken
    }
  })).then(([affectedCount]) => {
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
    loginName: req.body.LoginName,
    password: md5(CryptoJS.AES.decrypt(req.body.Password, 'SecretJcatalogPasswordKey').toString(CryptoJS.enc.Utf8)),
    verificationToken: md5(new Date().getTime()),
    locked: true,
    firstName: req.body.FirstName,
    surname: req.body.Name,
    email: req.body.EMail,
    createdBy: req.body.LoginName,
    changedBy: req.body.LoginName
  };

  return modelsPromise.then(models => models.User.create(newUser, {
    transaction
  })).then(createdUser => sendMail(
    req.cookies.LANGUAGE_COOKIE_KEY,
    'registration',
    {
      email: req.body.EMail,
      surname: req.body.Name,
      simUrl: req.protocol + '://' + req.get('host'),
      verificationToken: newUser.verificationToken,
      name: 'Supplier Information manager service'
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

  modelsPromise.then(models => models.User.findOne({
    where: {
      loginName: req.body.LoginName
    }
  })).then(existingUser => {
    if (existingUser) {
      res.status(203).send(`User ${req.body.EMail} already exists!`);
      return Promise.resolve();  // The same as
      // return;
    }

    return modelsPromise.
      then(models => models.sequelize.transaction()).
      then(transaction => createAbsentUser(req, transaction)).
      then(() => res.status(201).send('Message sent'));
  }).catch(err => databaseErrorHandlingService.generateErrorAndSendResponse(err, res));
}

function getCurrentUserInfo(req, res) {
  res.send({
    currentUserInfo: req.session.currentUserInfo
  });
}

module.exports = {
  verify: verify,
  createUser: createUser,
  getCurrentUserInfo: getCurrentUserInfo
};
