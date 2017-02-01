import ajaxRequest from 'superagent';

const consulEmitter = require('./consulService.js').emitter;
let supplierUrl = null;

consulEmitter.on('service', (action, details) => {
  if (details.name === 'supplier') {
    switch (action) {
      case 'add':
        supplierUrl = 'http://' + details.ip + ':' + details.port;
        break;
      case 'delete':
        supplierUrl = null;
        break;
      case 'update':
        supplierUrl = 'http://' + details.ip + ':' + details.port;
        break;
      default:
        break;
    }
    console.log('===== supplierUrl =====', supplierUrl);
  }
});

module.exports = function(db, session, username, locale) {
  if (!username) {
    return Promise.reject({
      status: 404,
      data: `User must be specified`
    });
  }

  let promises = [
    db.User.findOne({
      where: { LoginName: username }
    }),
    supplierUrl ?
      ajaxRequest.
        get(`${supplierUrl}/api/suppliers`).
        query({ userId: username }) :
      Promise.resolve({
        body: []
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
    let suppliersData = suppliers.body;

    // eslint-disable-next-line no-param-reassign
    session.currentUserInfo = {
      username,
      showWelcomePage: userData.showWelcomePage,
      supplierId: suppliersData.length ? suppliersData[0].supplierId : null,
      supplierName: suppliersData.length ? suppliersData[0].supplierName : null,
      companyRole: suppliersData.length ? suppliersData[0].role : null,
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
