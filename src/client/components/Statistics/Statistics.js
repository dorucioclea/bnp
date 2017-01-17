import React from 'react';

export default class Statistics extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/statistics.jpg`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
