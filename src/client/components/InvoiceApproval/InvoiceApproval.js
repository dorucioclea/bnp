import React from 'react';

export default class InvoiceApproval extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/invoiceApproval.png`} style={{ width: '80vw' }}/>
    )
  }
}
