import React from 'react';

export default class Monitor extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/monitor.jpg`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
