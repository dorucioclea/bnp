import React from 'react';
import UserRegistrationService from './../../service/UserRegistrationService'
import Label from './../Labels/Label.js';
import './styles/spinner.css';
import locales from './i18n/locales.js'
import browserHistory from 'react-router/lib/browserHistory';
import Spinner from 'react-spinkit';
import Button from 'react-bootstrap/lib/Button';
import Alert from './../Alert/Alert.jsx';
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
      email: null,
      passwordHash: null
    },
    isWarningsExists: false
  };

  getChildContext() {
    if (!this.context.userRegistrationService) {
      this.context.userRegistrationService = new UserRegistrationService();
    }
    return {
      i18n: this.i18n,
      userRegistrationService: this.context.userRegistrationService
    };
  }

  i18n = this.context.i18n.register('Registration', locales);

  constraints = {
    email: {
      presence: {
        message: this.i18n.getMessage('validatejs.blank.message')
      },
      email: {
        message: this.i18n.getMessage('validatejs.invalid.email.message')
      },
      length: {
        maximum: 50,
        tooLong: this.i18n.getMessage('validatejs.invalid.maxSize.message', {
          maxSize: 50
        })
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
    }
  };

  _validateAll = () => {
    let fieldErrors = validator(this.state, this.constraints, {
      fullMessages: false
    });

    this.setState({
      formErrors: fieldErrors || {}
    });

    return !fieldErrors;
  }

  handleEnterPress = e => {
    if (e.key === 'Enter') {
      this.handleRegisterClick();
    }
  }

  handleRegisterClick = () => {
    if (!this._validateAll()) {
      return;
    }

    let user = {
      "EMail": this.state.email,
      "Password": CryptoJS.AES.encrypt(this.state.passwordHash, 'SecretJcatalogPasswordKey').toString()
    };

    this.setState({
      loading: true
    });

    this.context.userRegistrationService.createUser(user).
      then(response => {
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
      }).
      catch(err => {
        let newState = {
          loading: false
        };

        if (err && err.data && err.data.data && err.data.data.errors && err.data.data.errors.length > 0) {
          newState.formErrors = err.data.data.errors.reduce((rez, error) => {
            if (!rez[error.field]) {
              rez[error.field] = [];
            }
            rez[error.field].push(error.message);
            return rez;
          }, this.state.formErrors);
        } else {
          newState.isWarningsExists = true;
          newState.warningMessage = this.i18n.getMessage('CommonMessages.systemError');
        }

        this.setState(newState);
      });

    return;
  }

  handleCancelClick = () => {
    browserHistory.push(`${window.simContextPath}/login`);
  }

  handleValidateField = e => {
    let fieldName = e.target.id;

    let fieldErrors = validator({
      [fieldName]: e.target.value
    }, {
      [fieldName]: this.constraints[fieldName]
    }, {
      fullMessages: false
    });

    this.setState({
      formErrors: {
        ...this.state.formErrors,
        [fieldName]: fieldErrors ? fieldErrors[fieldName] : null
      }
    });
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

    let spinner = this.state.loading ?
      <Spinner className="spinner" spinnerName='three-bounce' noFadeIn={true}/> :
      '';

    let warnings = this.state.isWarningsExists ?
      (<Alert
        bsStyle="danger"
        message={this.state.warningMessage}
        visible={this.state.isWarningsExists}
        hideCloseLink={true}
        alertClose={this._alertClose}
      />) :
      '';

    let emailErrorMessage = this._fetchFieldErrors('email');
    let passwordErrorMessage = this._fetchFieldErrors('passwordHash');

    return (
      <div onKeyPress={this.handleEnterPress}>
        <h2>{i18n.getMessage('RegistrationHeader.registration')}</h2>

        {spinner}

        {warnings}

        <div
          className={`form-group required ${emailErrorMessage ? 'has-error' : ''}`}
          style={{ paddingLeft: '15px' }}
        >
          <Label
            className="col-sm-3 control-label"
            htmlFor="email"
            objectName="RegistrationLabel"
            fieldName="email"
            isRequired={true}
          />
          <div className="col-sm-9">
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="Your eMail"
              onBlur={this.handleValidateField}
              onChange={e => this.setState({ email: e.target.value })}
              autoFocus
            />
            <small>
              {i18n.getMessage('RegistrationLabel.email.comment')}
            </small>
            {emailErrorMessage}
          </div>
        </div>

        <div
          className={`form-group required ${passwordErrorMessage ? 'has-error' : ''}`}
          style={{ paddingLeft: '15px' }}
        >
          <Label
            className="col-sm-3 control-label"
            htmlFor="passwordHash"
            objectName="RegistrationLabel"
            fieldName="password"
            isRequired={true}
          />
          <div className="col-sm-9">
            <input
              type='password'
              id="passwordHash"
              className="form-control"
              placeholder="Choose a Password"
              onBlur={this.handleValidateField}
              onChange={e => this.setState({ passwordHash: e.target.value })}
            />
            <small>
              {i18n.getMessage('RegistrationLabel.password.comment')}
            </small>
            {passwordErrorMessage}
          </div>
        </div>

        <div className="form-submit text-right">
          <Button
            bsStyle="link"
            onClick={this.handleCancelClick}
          >{this.i18n.getMessage('CommonButtonLabel.cancel')}</Button>
          <Button
            bsStyle="btn btn-primary"
            onClick={this.handleRegisterClick}
          >{this.i18n.getMessage('RegistrationButtonLabel.register')}</Button>
        </div>
      </div>
    )
  }
}
