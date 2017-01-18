import React from 'react';

export default class ShippingNotice extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/shippingNotice.png`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
