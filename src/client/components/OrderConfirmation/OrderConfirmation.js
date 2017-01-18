import React from 'react';

export default class OrderCofirmation extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/orderConfirmation.png`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
