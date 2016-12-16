import axios from 'axios';
const supplierUrl = require('./../../../service.config.json').supplier;
const modelsPromise = require('./../db/models');

module.exports = function(request) {
  let currentUserInfo = {
    ...request.session.currentUserInfo,  // It may be undefined
    username: request.session.passport.user,
    locale: request.body.language,
    readOnly: false  // TODO: user's attachment to a particular supplier needs to be approved.
  }

  let promises = [
    modelsPromise.then(models => models.User.findOne({
      where: {
        LoginName: currentUserInfo.username
      }
    })),
    axios.get(`${supplierUrl}/api/suppliers`, {
      params: {
        userId: currentUserInfo.username
      }
    })
  ];

  return Promise.all(promises).then(([user, suppliers]) => {
    if (!user) {
      return Promise.reject({
        status: 404,
        data: `Unknown user ${currentUserInfo.username}`
      })
    }

    let userData = user.dataValues;
    let suppliersData = suppliers.data;

    console.log('\n\n\n');
    console.log('===== user =====', userData);
    console.log('===== suppliers =====', suppliersData);

    /* eslint-disable key-spacing */
    currentUserInfo.user = {
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
    };
    /* eslint-enable key-spacing */

    currentUserInfo.supplierId = suppliersData.length === 0 ?
      null :
      suppliersData[0].supplierId;

    // eslint-disable-next-line no-param-reassign
    request.session.currentUserInfo = currentUserInfo;
    console.log('===== SUCCESSFULLY EXTRACTING USER INFO');
    return currentUserInfo;  // The same as return Promise.resolve(currentUserInfo);
  }).catch(err => Promise.reject({
    status: err.status || 500,
    data: err.data || err.message
  }));
};
