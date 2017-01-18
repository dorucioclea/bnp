import React from 'react';

export default class SupplierDirectory extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/supplierDirectory.jpg`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
