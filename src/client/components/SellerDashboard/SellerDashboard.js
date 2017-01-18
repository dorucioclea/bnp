import React from 'react';

export default class SellerDashboard extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <div>
        This is a Seller Dashboard page.
      </div>
    )
  }
}
