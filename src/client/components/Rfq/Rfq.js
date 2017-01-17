import React from 'react';

export default class Rfq extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/rfq.jpg`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
