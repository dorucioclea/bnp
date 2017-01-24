import React from 'react';

export default class ServiceConfigStepFive extends React.Component {
  render() {
    return (
      <div>
        <h3>Complete</h3>
        <p>Please submit your registration by agreeing to "GTC".</p>
        <div className="col-md-6">
          <label className="oc-check">
            <input type="checkbox" />
            <a href="#">I have read and understood the terms and conditions for the invoice portal.</a>
          </label>
        </div>
      </div>
    )
  }
}
