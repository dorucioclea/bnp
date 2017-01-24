import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import browserHistory from 'react-router/lib/browserHistory';
import locales from './../../Registration/i18n/locales.js'
import ServerError from './../../Errors/ServerError';

export default class SuccessConfirmation extends React.Component {

  static contextTypes = {
    i18n: React.PropTypes.object,
    authenticationService: React.PropTypes.object
  }

  componentDidMount() {
    if (this.props.routeParams.verificationToken) {
      this.context.authenticationService.verifyUser(this.props.routeParams.verificationToken).
        catch(err => this.setState({
          serverErrorMessage: this.i18n.getMessage('CommonMessages.systemError')
        }));
    }
  }

  i18n = this.context.i18n.register('SuccessConfirmation', locales)

  handleLogin = () => {
    browserHistory.push(`${window.simContextPath}/login`);
  };

  render() {
    if (this.state && this.state.serverErrorMessage) {
      return (
        <ServerError message={this.state.serverErrorMessage} />
      );
    } else {
      return (
        <div>
          <h2>{this.i18n.getMessage('RegistrationHeader.successConfirmation')}</h2>
          <h4>{this.i18n.getMessage('RegistrationConfirmation.doLogin')}</h4>
          <div className="form-submit text-right">
            <Button bsStyle="primary" onClick={this.handleLogin}>
              {this.i18n.getMessage('CommonButtonLabel.login')}
            </Button>
          </div>
        </div>
      )
    }
  }
}
