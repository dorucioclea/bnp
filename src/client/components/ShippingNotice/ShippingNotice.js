import React from 'react';

export default class ShippingNotice extends React.Component {
  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/shippingNotice.png`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
