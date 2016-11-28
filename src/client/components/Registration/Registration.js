import React from 'react';
import UserRegistrationService from './../../service/UserRegistrationService'
import Label from './../Labels/Label.js';
import './styles/spinner.css';
import locales from './i18n/locales.js'
import browserHistory from 'react-router/lib/browserHistory';
import Spinner from 'react-spinkit';
import Button from 'react-bootstrap/lib/Button';
import Alert from './../Alert/Alert.jsx';
import './../../styles/forms.css';
import validator from 'validate.js';
import CryptoJS from 'crypto-js';

export default class Registration extends React.Component {

  static contextTypes = {
    userRegistrationService: React.PropTypes.object,
    i18n: React.PropTypes.object
  };

  static childContextTypes = {
    locale: React.PropTypes.string,
    userRegistrationService: React.PropTypes.object,
    i18n: React.PropTypes.object
  };

  state = {
    formErrors: {
      company: null,
      name: null,
      firstName: null,
      email: null,
      emailConfirmation: null,
      passwordHash: null,
      passwordConfirmation: null
    },
    isWarningsExists: false
  }

  getChildContext() {
    if (!this.context.userRegistrationService) {
      this.context.userRegistrationService = new UserRegistrationService();
    }
    return {
      i18n: this.i18n,
      userRegistrationService: this.context.userRegistrationService
    };
  }

  i18n = this.context.i18n.register('Registration', locales)

  constraints = {
    company: {
      presence: {
        message: this.i18n.getMessage('validatejs.blank.message')
      },
      length: {
        maximum: 50,
        tooLong: this.i18n.getMessage('validatejs.invalid.maxSize.message', {
          maxSize: 50
        })
      }
    },
    duns: {
      length: {
        maximum: 250,
        tooLong: this.i18n.getMessage('validatejs.invalid.maxSize.message', {
          maxSize: 250
        })
      }
    },
    firstName: {
      presence: {
        message: this.i18n.getMessage('validatejs.blank.message')
      },
      length: {
        maximum: 50,
        tooLong: this.i18n.getMessage('validatejs.invalid.maxSize.message', {
          maxSize: 50
        })
      }
    },
    name: {
      presence: {
        message: this.i18n.getMessage('validatejs.blank.message')
      },
      length: {
        maximum: 50,
        tooLong: this.i18n.getMessage('validatejs.invalid.maxSize.message', {
          maxSize: 50
        })
      }
    },
    email: {
      presence: {
        message: this.i18n.getMessage('validatejs.blank.message')
      },
      email: {
        message: this.i18n.getMessage('validatejs.invalid.email.message')
      },
      length: {
        maximum: 30,
        tooLong: this.i18n.getMessage('validatejs.invalid.maxSize.message', {
          maxSize: 30
        })
      }
    },
    emailConfirmation: {
      presence: {
        message: this.i18n.getMessage('validatejs.blank.message')
      },
      equality: {
        attribute: "email",
        message: this.i18n.getMessage('RegistrationError.matchEmail'),
        comparator: function(v1, v2) {
          return v1 === v2;
        }
      }
    },
    passwordHash: {
      presence: {
        message: this.i18n.getMessage('validatejs.blank.message')
      },
      length: {
        maximum: 32,
        tooLong: this.i18n.getMessage('validatejs.invalid.maxSize.message', {
          maxSize: 32
        })
      }
    },
    passwordConfirmation: {
      presence: {
        message: this.i18n.getMessage('validatejs.blank.message')
      },
      equality: {
        attribute: "passwordHash",
        message: this.i18n.getMessage('RegistrationError.matchPassword'),
        comparator: (v1, v2) => v1 === v2
      }
    }
  }

  _validateAll = () => {
    let fieldErrors = validator(this.state, this.constraints, {
      fullMessages: false
    });
    this.setState({
      formErrors: fieldErrors ? fieldErrors : {}
    });
    return !fieldErrors;
  }

  handleRegisterClick = () => {
    if (this._validateAll()) {
      let user = {
        "LoginName": this.state.email,
        "Company": this.state.company,
        "DunsNo": this.state.duns,
        "Name": this.state.name,
        "FirstName": this.state.firstName,
        "Password": CryptoJS.AES.encrypt(this.state.passwordHash, 'SecretJcatalogPasswordKey').toString(),
        "EMail": this.state.email,
        "CreatedBy": this.state.email, // need to remove
        "ChangedBy": this.state.email // in future
      };
      this.setState({
        loading: true
      });
      this.context.userRegistrationService.createUser(user).then((response) => {
        switch (response.status) {
          case 201:
            browserHistory.push(`${window.simContextPath}/registration/success`);
            break;
          default:
            this.setState({
              loading: false,
              isWarningsExists: true,
              warningMessage: response.data
            });
            break;
        }
      }).catch(err => {
        let newState = {
          loading: false
        };
        if (err && err.data && err.data.data && err.data.data.errors && err.data.data.errors.length > 0) {
          let formErrors = this.state.formErrors;
          err.data.data.errors.forEach(error => {
            if (!formErrors[error.field]) {
              formErrors[error.field] = [];
            }
            formErrors[error.field].push(error.message);
          });
          newState.formErrors = formErrors;
        } else {
          newState.isWarningsExists = true;
          newState.warningMessage = this.i18n.getMessage('CommonMessages.systemError');
        }
        this.setState(newState);
      });
    }
  }

  handleCancelClick = () => {
    browserHistory.push(`${window.simContextPath}/login`);
  }

  handleValidateField = (e) => {
    let fieldName = e.target.id;
    let value = e.target.value;
    let fieldObject = {};
    fieldObject[fieldName] = value;
    let fieldConstraintObject = {};
    fieldConstraintObject[fieldName] = this.constraints[fieldName];
    if (fieldName === 'passwordConfirmation') {
      fieldObject.passwordHash = this.state.passwordHash;
      fieldConstraintObject.passwordHash = this.constraints.passwordHash;
    }
    if (fieldName === 'emailConfirmation') {
      fieldObject.email = this.state.email;
      fieldConstraintObject.email = this.constraints.email;
    }
    let fieldErrors = validator(fieldObject, fieldConstraintObject, {
      fullMessages: false
    });
    let formErrors = this.state.formErrors;
    formErrors[fieldName] = fieldErrors ? fieldErrors[fieldName] : null;
    let newState = {};
    newState.formErrors = formErrors;
    newState[fieldName] = value;
    this.setState(newState);
  }

  _alertClose = () => {
    this.setState({
      isWarningsExists: false
    });
  }

  _fetchFieldErrors = (fieldName) => {
    let errorMessages;
    if (this.state.formErrors[fieldName]) {
      errorMessages = this.state.formErrors[fieldName].map((error, index) => {
        return (
          <div key={`error-${fieldName}-${index}`}>
            <span className="label label-danger">{error}</span>
          </div>
        );
      });
    }
    return errorMessages;
  }

  render() {
    let i18n = this.getChildContext().i18n;
    let spinner;
    if (this.state.loading) {
      spinner = <Spinner className="spinner" spinnerName='three-bounce' noFadeIn={true}/>;
    }

    let warnings;
    if (this.state.isWarningsExists) {
      warnings = (<Alert
        bsStyle="danger"
        message={this.state.warningMessage}
        visible={this.state.isWarningsExists}
        hideCloseLink={true}
        alertClose={this._alertClose}
      />)
    }

    let companyErrorMessage = this._fetchFieldErrors('company');
    let dunsErrorMessage = this._fetchFieldErrors('duns');
    let firstNameErrorMessage = this._fetchFieldErrors('firstName');
    let nameErrorMessage = this._fetchFieldErrors('name');
    let emailErrorMessage = this._fetchFieldErrors('email');
    let emailConfirmationErrorMessage = this._fetchFieldErrors('emailConfirmation');
    let passwordErrorMessage = this._fetchFieldErrors('passwordHash');
    let passwordConfirmationErrorMessage = this._fetchFieldErrors('passwordConfirmation');

    return (<div>
        <h2>{i18n.getMessage('RegistrationHeader.registration')}</h2>
        {spinner}
        {warnings}
        <form style={{ 'paddingLeft': 0 }} className="form-horizontal">
          <div className={`form-group jcatalog-form-group ${companyErrorMessage ? 'has-error' : ''}`}>
            <Label
              className="col-sm-2 control-label"
              htmlFor="currentCompany"
              objectName="RegistrationLabel"
              fieldName="company"
              isRequired={true}
            />
            <div className="col-sm-4">
              <input
                id="company"
                className="form-control"
                type='text'
                onBlur={this.handleValidateField}
              />
              {companyErrorMessage}
            </div>
          </div>
          <div className={`form-group jcatalog-form-group ${dunsErrorMessage ? 'has-error' : ''}`}>
            <Label
              className="col-sm-2 control-label"
              htmlFor="currentDuns"
              objectName="RegistrationLabel"
              fieldName="duns"
            />
            <div className="col-sm-4">
              <input
                id="duns"
                className="form-control"
                type='text'
                onBlur={this.handleValidateField}
              />
              {dunsErrorMessage}
            </div>
          </div>
          <div className={`form-group jcatalog-form-group ${firstNameErrorMessage ? 'has-error' : ''}`}>
            <Label
              className="col-sm-2 control-label"
              htmlFor="currentFirstName"
              objectName="RegistrationLabel"
              fieldName="firstName" isRequired={true}
            />
            <div className="col-sm-4">
              <input
                id="firstName"
                className="form-control"
                type='text'
                onBlur={this.handleValidateField}
              />
              {firstNameErrorMessage}
            </div>
          </div>
          <div className={`form-group jcatalog-form-group ${nameErrorMessage ? 'has-error' : ''}`}>
            <Label
              className="col-sm-2 control-label"
              htmlFor="currentName"
              objectName="RegistrationLabel"
              fieldName="name"
              isRequired={true}
            />
            <div className="col-sm-4">
              <input
                id="name"
                className="form-control"
                type='text'
                onBlur={this.handleValidateField}
              />
              {nameErrorMessage}
            </div>
          </div>
          <div className={`form-group jcatalog-form-group ${emailErrorMessage ? 'has-error' : ''}`}>
            <Label
              className="col-sm-2 control-label"
              htmlFor="currentEMail"
              objectName="RegistrationLabel"
              fieldName="email"
              isRequired={true}
            />
            <div className="col-sm-4">
              <input
                id="email"
                className="form-control"
                type='text'
                onBlur={this.handleValidateField}
              />
              {emailErrorMessage}
            </div>
          </div>
          <div
            className={`form-group jcatalog-form-group ${emailConfirmationErrorMessage ? 'has-error' : ''}`}
          >
            <Label
              className="col-sm-2 control-label"
              htmlFor="currentEMailConfirmation"
              objectName="RegistrationLabel"
              fieldName="emailConfirmation"
              isRequired={true}
            />
            <div className="col-sm-4">
              <input
                id="emailConfirmation"
                className="form-control"
                type='text'
                onBlur={this.handleValidateField}
              />
              {emailConfirmationErrorMessage}
            </div>
          </div>
          <div
            className={`form-group jcatalog-form-group ${passwordErrorMessage ? 'has-error' : ''}`}
          >
            <Label
              className="col-sm-2 control-label"
              htmlFor="passwordHash"
              objectName="RegistrationLabel"
              fieldName="password"
              isRequired={true}
            />
            <div className="col-sm-4">
              <input
                id="passwordHash"
                className="form-control"
                type='password'
                onBlur={this.handleValidateField}
              />
              {passwordErrorMessage}
            </div>
          </div>
          <div
            className={`form-group jcatalog-form-group ${passwordConfirmationErrorMessage ? 'has-error' : ''}`}
          >
            <Label
              className="col-sm-2 control-label"
              htmlFor="passwordConfirmation"
              objectName="RegistrationLabel"
              fieldName="passwordConfirmation"
              isRequired={true}
            />
            <div className="col-sm-4">
              <input
                id="passwordConfirmation"
                className="form-control"
                type='password'
                onBlur={this.handleValidateField}
              />
              {passwordConfirmationErrorMessage}
            </div>
          </div>
          <div className="form-group jcatalog-form-group">
            <div className="text-right col-sm-6">
              <Button
                key="supplier-register-cancel-button"
                bsStyle="link"
                onClick={this.handleCancelClick}
              >{this.i18n.getMessage('CommonButtonLabel.cancel')}</Button>
              <Button
                key="supplier-register-button"
                bsStyle="primary"
                onClick={this.handleRegisterClick}
              >{this.i18n.getMessage('RegistrationButtonLabel.register')}</Button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
