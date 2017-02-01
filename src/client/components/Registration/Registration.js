import React from 'react';
import createUser from './../../service/UserRegistrationService'
import Label from './../Labels/Label.js';
import './styles/spinner.css';
import locales from './i18n/locales.js'
import browserHistory from 'react-router/lib/browserHistory';
import Spinner from 'react-spinkit';
import Button from 'react-bootstrap/lib/Button';
import Alert from './../Alert/Alert.jsx';
import validator from 'validate.js';
import CryptoJS from 'crypto-js';

function getCookie(name) {
  let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match && match[2] || '';
}

export default class Registration extends React.Component {
  static contextTypes = {
    i18n: React.PropTypes.object
  };

  static childContextTypes = {
    locale: React.PropTypes.string,
    i18n: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    // document.cookie = 'CAMPAIGN_INFO={"companyName":"NCC Svenska","contactEmail":"test@arne-graeper.de"}';
    let match = JSON.parse(getCookie('CAMPAIGN_INFO') || '{}');

    this.state = {
      isLoading: false,
      email: match && match.contactEmail || '',
      formErrors: {
        email: null,
        passwordHash: null
      },
      isWarningsExists: false
    };
  }

  getChildContext() {
    return {
      i18n: this.i18n
    };
  }

  componentWillUnmount() {
    this.ignoreAjax = true;
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

    this.setState({
      isLoading: true
    });

    createUser({
      EMail: this.state.email,
      Password: CryptoJS.AES.encrypt(this.state.passwordHash, 'SecretJcatalogPasswordKey').toString()
    }).
      then(({ status, message }) => {
        if (this.ignoreAjax) {
          return;
        }

        switch (status) {
          case 201:
            browserHistory.push(`${window.simContextPath}/registration/success`);
            break;
          default:
            this.setState({
              isLoading: false,
              isWarningsExists: true,
              warningMessage: message
            });
            break;
        }
      }).
      catch(errors => {
        if (this.ignoreAjax) {
          return;
        }

        let newState = {
          isLoading: false
        };

        if (errors && errors.length > 0) {
          newState.formErrors = errors.reduce((rez, error) => {
            if (!rez[error.field]) {
              rez[error.field] = []; // eslint-disable-line no-param-reassign
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

    let spinner = this.state.isLoading ?
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
      <div className="row">
        <div className="col-md-8">
          <h2>{i18n.getMessage('RegistrationHeader.registration')}</h2>
          {warnings}
          <div className="col-md-12">
            <div className="form-group">
              <Label
                className="col-sm-4 control-label"
                htmlFor="email"
                objectName="RegistrationLabel"
                fieldName="email"
                isRequired={true}
              />
              <div className="col-sm-8">
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  value={this.state.email}
                  placeholder="Your eMail"
                  onBlur={this.handleValidateField}
                  onChange={e => this.setState({ email: e.target.value })}
                  autoFocus={true}
                />
                <small>
                  {/* i18n.getMessage('RegistrationLabel.email.comment') */}
                </small>
                {emailErrorMessage}
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <Label
                className="col-sm-4 control-label"
                htmlFor="passwordHash"
                objectName="RegistrationLabel"
                fieldName="password"
                isRequired={true}
              />
              <div className="col-sm-8">
                <input
                  type='password'
                  id="passwordHash"
                  className="form-control"
                  placeholder="Choose a Password"
                  onBlur={this.handleValidateField}
                  onChange={e => this.setState({ passwordHash: e.target.value })}
                />
                <small>
                  {/* i18n.getMessage('RegistrationLabel.password.comment') */}
                </small>
                {passwordErrorMessage}
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-submit text-right">
              <Button
                bsStyle="link"
                disabled={this.state.isLoading}
                onClick={this.handleCancelClick}
              >{this.i18n.getMessage('CommonButtonLabel.cancel')}</Button>
              <Button
                bsStyle="primary"
                disabled={this.state.isLoading}
                onClick={this.handleRegisterClick}
              >{this.i18n.getMessage('RegistrationButtonLabel.register')}</Button>
            </div>
            {spinner}
          </div>
        </div>
        <div className="col-md-4">
          <p
            style={{
              margin: "25% 0 0 10%",
              fontSize: "150%"
            }}
          >
            Registration
          </p>
        <br />
        <p>
          Registration requires a valid e-mail address. Once your registration has been submitted,
          you will receive an e-mail containing a link for account activation.
        </p>
        <p
          style={{
            marginLeft: "10%",
            fontSize: "150%"
          }}
        >
          Password
        </p>
      <ul>
        <li>
          Consist of at least 8 characters
        </li>
        <li>
          Has a number and capital letter
        </li>
        <li>
          Has a special character
        </li>
        <li>
          Be unlike username
        </li>
      </ul>
    </div>
  </div>
    )
  }
}
