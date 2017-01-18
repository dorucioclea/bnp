import React from 'react';

export default class InvoiceCreate extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/invoiceCreate.jpg`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
