import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import locales from './../../Registration/i18n/locales.js'
import ServerError from './../../Errors/ServerError';

export default class SuccessConfirmation extends React.Component {

  static contextTypes = {
    i18n: React.PropTypes.object,
    authenticationService: React.PropTypes.object
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoading: !!this.props.routeParams.verificationToken
    };
  }

  componentDidMount() {
    if (this.state.isLoading) {
      this.context.authenticationService.verifyUser(this.props.routeParams.verificationToken).
        then(() => this.setState({ isLoading: false })).
        catch(() => this.ignoreAjax || this.setState({
          serverErrorMessage: this.i18n.getMessage('CommonMessages.systemError'),
          isLoading: false
        }));
    }
  }

  componentWillUnmount() {
    this.ignoreAjax = true;
  }

  i18n = this.context.i18n.register('SuccessConfirmation', locales)

  handleLogin = () => {
    browserHistory.push(`${window.simContextPath}/login`);
  };

  render() {
    if (this.state.isLoading) {
      return null;
    } else if (this.state.serverErrorMessage) {
      return <ServerError message={this.state.serverErrorMessage} />;
    } else {
      return (
        <div className="col-md-12">
          <h2>{this.i18n.getMessage('RegistrationHeader.successConfirmation')}</h2>
          <p>
            Thank you for registering. Please continue to entering company information.
          </p>
          <br />
          <div className="form-submit text-right">
            <button className="btn btn-link">Cancel</button>
            <button className="btn btn-primary" onClick={this.handleLogin}>Continue</button>
          </div>
        </div>
      )
    }
  }
}
