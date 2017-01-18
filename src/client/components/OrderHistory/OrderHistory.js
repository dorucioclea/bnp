import React from 'react';

export default class OrderHistory extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/orderHistory.png`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
