// Confirmation dialogs
let RegistrationConfirmation = {};
RegistrationConfirmation.checkEmail = 'Es wurde eine Bestätigungsmail an die von Ihnen angegebene Adresse gesendet.\n' +
  'Bitte prüfen Sie Ihren Posteingang und bestätigen die Registrierung.\n' +
  'Danach können Sie sich einloggen.';
RegistrationConfirmation.doLogin = 'Sie können sich nun mit Ihrem Login-Namen und Ihrem Passwort einloggen.';


let RegistrationButtonLabel = {};
RegistrationButtonLabel.register = 'Registrieren';

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
RegistrationLabel.company.label = 'Unternehmen';
RegistrationLabel.duns.label = 'DUNS/GTIN';
RegistrationLabel.name.label = 'Name';
RegistrationLabel.firstName.label = 'Vorname';
RegistrationLabel.password.label = 'Passwort';
RegistrationLabel.password.comment =  // TODO: substitute with de.
  'Your password has to be at least 8 characters long and needs to contain at least 1 letter and 1 figure.';
RegistrationLabel.passwordConfirmation.label = 'Passwort-Bestätigung';
RegistrationLabel.email.label = 'E-Mail';
RegistrationLabel.email.comment =  // TODO: substitute with de.
  'Please enter a valid eMail address, you will be required to confirm an eMail sent to this address.';
RegistrationLabel.emailConfirmation.label = 'E-Mail-Bestätigung';

let RegistrationHeader = {};
RegistrationHeader.registration = 'Benutzerkonto registrieren';
RegistrationHeader.successRegistration = 'Ihre Registrierung war erfolgreich';
RegistrationHeader.successConfirmation = 'Sie haben Ihr Benutzerkonto erfolgreich aktiviert';

let RegistrationError = {};
RegistrationError.userExists = 'Der Benutzer existiert schon';
RegistrationError.matchPassword = 'Die Passwörter stimmen nicht überein';
RegistrationError.matchEmail = 'Die E-Mail-Adressen stimmen nicht überein';

export default {
  RegistrationConfirmation: RegistrationConfirmation,
  RegistrationButtonLabel: RegistrationButtonLabel,
  RegistrationLabel: RegistrationLabel,
  RegistrationError: RegistrationError,
  RegistrationHeader: RegistrationHeader
}
