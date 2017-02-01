import React from 'react';

export default class OrderCofirmation extends React.Component {
  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/orderConfirmation.png`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
