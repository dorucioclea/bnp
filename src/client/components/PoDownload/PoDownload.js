import React from 'react';

export default class PoDownload extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/poDownload.png`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
