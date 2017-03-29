import ajaxRequest from 'superagent';

module.exports = function(db, config, userdata, username, locale) {
  let supplierUrl;
  config.getEndPoint("supplier")
    .then(function(endpoint) { // eslint-disable-line dot-location
      supplierUrl = "http://" + endpoint.host + ":" + endpoint.port;
    })
    .catch(function(err) { // eslint-disable-line dot-location
      throw err;
    });


  if (!username) {
    return Promise.reject({
      status: 404,
      data: `User must be specified`
    });
  }

  let promises = [
    // db.User.findOne({
    //   where: { LoginName: username }
    // }),
    supplierUrl ?
      ajaxRequest.
        get(`${supplierUrl}/api/suppliers`).
        query({ userId: username }) :
      Promise.resolve({
        body: []
      })
  ];

  return Promise.all(promises).then(([suppliers]) => {
    let suppliersData = suppliers.body;

    return {
      username: userdata.username,
      supplierId: suppliersData.length ? suppliersData[0].supplierId : null,
      supplierName: suppliersData.length ? suppliersData[0].supplierName : null,
      companyRole: suppliersData.length ? suppliersData[0].role : null,
      locale: locale || userdata && userdata.locale,
      readOnly: false,  // TODO:
      user: userdata
    }

    // eslint-disable-next-line no-param-reassign
    // session.currentUserInfo = {
    //   username,
    //   showWelcomePage: userData.showWelcomePage,
    //   supplierId: suppliersData.length ? suppliersData[0].supplierId : null,
    //   supplierName: suppliersData.length ? suppliersData[0].supplierName : null,
    //   companyRole: suppliersData.length ? suppliersData[0].role : null,
    //   locale: locale || session.currentUserInfo && session.currentUserInfo.locale,
    //   readOnly: false,  // TODO: user's attachment to a particular supplier needs to be approved.
    //   user: {
    //     /* eslint-disable key-spacing */
    //     id         : userData.loginName,
    //     birthday   : userData.birthday,
    //     building   : userData.building,
    //     degree     : userData.degree,
    //     department : userData.department,
    //     email      : userData.email,
    //     faxNo      : userData.faxNo,
    //     firstName  : userData.firstName,
    //     floor      : userData.floor,
    //     homepage   : userData.homepage,
    //     phoneNo    : userData.phoneNo,
    //     room       : userData.room,
    //     salutation : userData.salutation,
    //     surname    : userData.surname
    //     /* eslint-enable key-spacing */
    //   }
    // };
    //
    // return session.currentUserInfo;  // The same as return Promise.resolve(session.currentUserInfo);
  }).catch(function(err) {
    console.log(err);
    return Promise.reject({
      status: err.status || 500,
      data: err.data || err.message
    })
  });
};
