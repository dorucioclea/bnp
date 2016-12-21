import axios from 'axios';
const supplierUrl = require('./../../../service.config.json').supplier;
const modelsPromise = require('./../db/models');

module.exports = function(session, username, locale) {
  if (!username) {
    return Promise.reject({
      status: 404,
      data: `User must be specified`
    });
  }

  let promises = [
    modelsPromise.then(models => models.User.findOne({
      where: {
        LoginName: username
      }
    })),
    axios.get(`${supplierUrl}/api/suppliers`, {
      params: { username }
    })
  ];

  return Promise.all(promises).then(([user, suppliers]) => {
    if (!user) {
      return Promise.reject({
        status: 404,
        data: `Unknown user ${username}`
      })
    }

    let userData = user.dataValues;
    let suppliersData = suppliers.data;

    // eslint-disable-next-line no-param-reassign
    session.currentUserInfo = {
      username,
      supplierId: suppliersData.length ? suppliersData[0].supplierId : null,
      locale: locale || session.currentUserInfo && session.currentUserInfo.locale,
      readOnly: false,  // TODO: user's attachment to a particular supplier needs to be approved.
      user: {
        /* eslint-disable key-spacing */
        id         : userData.loginName,
        birthday   : userData.birthday,
        building   : userData.building,
        degree     : userData.degree,
        department : userData.department,
        email      : userData.email,
        faxNo      : userData.faxNo,
        firstName  : userData.firstName,
        floor      : userData.floor,
        homepage   : userData.homepage,
        phoneNo    : userData.phoneNo,
        room       : userData.room,
        salutation : userData.salutation,
        surname    : userData.surname
        /* eslint-enable key-spacing */
      }
    };

    return session.currentUserInfo;  // The same as return Promise.resolve(session.currentUserInfo);
  }).catch(err => Promise.reject({
    status: err.status || 500,
    data: err.data || err.message
  }));
};
