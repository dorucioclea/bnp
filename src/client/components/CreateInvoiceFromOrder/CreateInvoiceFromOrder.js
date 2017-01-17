import React from 'react';

export default class CreateInvoiceFromOrder extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/createInvoiceFromOrder.jpg`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
