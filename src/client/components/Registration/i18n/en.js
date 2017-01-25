// Confirmation dialogs
let RegistrationConfirmation = {};
RegistrationConfirmation.checkEmail = 'A confirmation has been sent to your ' +
  'Email account.\nPlease, check your email to confirm registration.';
RegistrationConfirmation.doLogin = 'Login into the system using your email and password.';

let RegistrationButtonLabel = {};
RegistrationButtonLabel.register = 'Register';

let RegistrationLabel = {
  company: {},
  duns: {},
  name: {},
  firstName: {},
  password: {},
  passwordConfirmation: {},
  email: {},
  emailConfirmation: {}
};
RegistrationLabel.company.label = 'Company';
RegistrationLabel.duns.label = 'DUNS/GTIN';
RegistrationLabel.name.label = 'Name';
RegistrationLabel.firstName.label = 'First name';
RegistrationLabel.password.label = 'Password';
RegistrationLabel.password.comment =
  'Your password has to be at least 8 characters long and needs to contain at least 1 letter and 1 figure.';
RegistrationLabel.passwordConfirmation.label = 'Password confirmation';
RegistrationLabel.email.label = 'Email';
RegistrationLabel.email.comment =
  'Please enter a valid eMail address, you will be required to confirm an eMail sent to this address.';
RegistrationLabel.emailConfirmation.label = 'Email confirmation';

let RegistrationHeader = {};
RegistrationHeader.registration = 'Please Register as New User';
RegistrationHeader.successRegistration = 'Your registration was successful';
RegistrationHeader.successConfirmation = 'Your account has been confirmed and activated';

let RegistrationError = {};
RegistrationError.userExists = 'User already exists';
RegistrationError.matchPassword = 'Passwords don\'t match';
RegistrationError.matchEmail = 'Emails don\'t match';

export default {
  RegistrationConfirmation: RegistrationConfirmation,
  RegistrationButtonLabel: RegistrationButtonLabel,
  RegistrationLabel: RegistrationLabel,
  RegistrationError: RegistrationError,
  RegistrationHeader: RegistrationHeader
}
