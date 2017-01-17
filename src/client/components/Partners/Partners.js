import React from 'react';

export default class Partners extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/partners.jpg`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
