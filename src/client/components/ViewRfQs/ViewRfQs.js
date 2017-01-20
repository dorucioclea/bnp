import React from 'react';

export default class ViewRfQs extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/viewRfQs.png`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
