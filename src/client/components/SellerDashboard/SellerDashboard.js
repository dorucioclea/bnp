import React from 'react';

export default class SellerDashboard extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/sellerDashboard.png`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
