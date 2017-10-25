import React from 'react';

export default class OrderHistory extends React.Component {
  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/orderHistory.png`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
