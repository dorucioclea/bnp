import React from 'react';
import locales from './../../Registration/i18n/locales.js'

export default class SuccessRegistration extends React.Component {

  static contextTypes = {
    i18n: React.PropTypes.object,
    router: React.PropTypes.object
  };

  i18n = this.context.i18n.register('SuccessRegistration', locales);

  handleLogin = () => {
    this.context.router.push('/login');
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h2>{this.i18n.getMessage('RegistrationHeader.successRegistration')}</h2>
          <p>
            We have sent an activation link to you e-mail.
            Please use the link to complete your registration.
            <br/>
            Please note that receiving the e-mail might take some time.
          </p>
          <a href="#">
            <p style={{ color: "#ec6608" }}>
              Didn't get the e-mail?
            </p>
          </a>
          <br/>
          <div className="form-submit text-right">
            <button className="btn btn-link">Cancel</button>
            <button
              className="btn btn-primary"
              onClick={this.handleLogin}
            >
              {this.i18n.getMessage('CommonButtonLabel.login')}
            </button>
          </div>
        </div>
      </div>
    )
  }
}
