module.exports = function(location, cb) {
  if (typeof require.ensure === 'function') {
    require.ensure([], (require) => {
      cb(null, require('./SupplierApplicationForm').default)
    })
  } else {
    cb(null, require('./SupplierApplicationForm').default);
  }
};
