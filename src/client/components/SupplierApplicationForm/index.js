import SupplierApplicationForm from './SupplierApplicationForm';

export default function(location, cb) {
  if (typeof require.ensure === 'function') {
    require.ensure([], require => cb(null, SupplierApplicationForm));
  } else {
    cb(null, SupplierApplicationForm);
  }
}
