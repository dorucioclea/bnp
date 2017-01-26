import React from 'react';
import { Button } from 'react-bootstrap';
import browserHistory from 'react-router/lib/browserHistory';

export default class ServiceConfigStepFive extends React.Component {
  static contextTypes = {
    authenticationService: React.PropTypes.object
  };

  static propTypes = {
    onPreviousTab: React.PropTypes.func
  };

  state = {
    isAccepted: false
  }

  handleSubmit = () => {
    this.context.authenticationService.onboardingDone();
  }

  render() {
    return (
      <div>
        <h3>Complete</h3>
        <p>Please submit your registration by agreeing to "GTC".</p>
        <div className="col-md-6">
          <label className="oc-check">
            <input type="checkbox"
              checked={this.state.isAccepted}
              onChange={e => this.setState({ isAccepted: e.target.checked })}
            />
            <a href="#" onClick={e => {
              this.setState({ isAccepted: !this.state.isAccepted });
              e.preventDefault();
            }}>
              I have read and understood the terms and conditions for the invoice portal.
            </a>
          </label>
        </div>
        <div className="form-submit text-right" style={{ marginTop: '80px' }}>
          <Button onClick={() => this.props.onPreviousTab()}>Previous</Button>
          <Button
            bsStyle="primary"
            disabled={!this.state.isAccepted}
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    )
  }
}
