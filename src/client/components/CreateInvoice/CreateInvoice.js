import React from 'react';

export default class CreateInvoice extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/createInvoice.jpg`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
