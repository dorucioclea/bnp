import React from 'react';

export default class InvoiceInspect extends React.Component {
  render() {
    return (
      <div>
        <img src={`${window.simContextPath}/screenshots/invoiceInspect.jpg`} style={{ maxWidth: '80vw' }}/>
      </div>
    )
  }
}
