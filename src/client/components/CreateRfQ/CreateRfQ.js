import React from 'react';

export default class CreateRfQ extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/createRfQ.png`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
