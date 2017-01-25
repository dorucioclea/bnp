import React from 'react';

export default class OrderInspect extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/orderInspect.png`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
