import React from 'react';

export default class Dashboard extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/static/partners.jpg`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
