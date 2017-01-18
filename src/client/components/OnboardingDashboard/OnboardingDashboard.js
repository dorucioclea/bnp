import React from 'react';

export default class OnboardingDashboard extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/onboardingDashboard.jpg`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
