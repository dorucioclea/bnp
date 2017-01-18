import React from 'react';

export default class SupplierRating extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/supplierRating.png`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
