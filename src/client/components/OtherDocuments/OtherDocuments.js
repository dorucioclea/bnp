import React from 'react';

export default class OtherDocuments extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/otherDocuments.png`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
