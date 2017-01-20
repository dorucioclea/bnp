import React from 'react';

export default class InspectRfQ extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/inspectRfQ.jpg`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
