import SupplierRegistrationForm from './SupplierRegistrationForm';

export default function(location, cb) {
  if (typeof require.ensure === 'function') {
    require.ensure([], require => cb(null, SupplierRegistrationForm));
  } else {
    cb(null, SupplierRegistrationForm);
  }
}
