import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import browserHistory from 'react-router/lib/browserHistory';
import locales from './../../Registration/i18n/locales.js'

export default class SuccessRegistration extends React.Component {

  static contextTypes = {
    i18n: React.PropTypes.object
  };

  i18n = this.context.i18n.register('SuccessRegistration', locales);

  handleLogin() {
    browserHistory.push(`${window.simContextPath}/login`);
  }

  render() {
    return (
      <div>
        <h2>{this.i18n.getMessage('RegistrationHeader.successRegistration')}</h2>
        <h4>{this.i18n.getMessage('RegistrationConfirmation.checkEmail')}</h4>
        <div className="form-submit text-right">
          <Button bsStyle="primary" onClick={this.handleLogin}>
            {this.i18n.getMessage('CommonButtonLabel.login')}
          </Button>
        </div>
      </div>
    )
  }
}
