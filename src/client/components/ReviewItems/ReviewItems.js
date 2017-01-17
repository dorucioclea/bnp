import React from 'react';

export default class ReviewItems extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <img src={`${window.simContextPath}/screenshots/reviewItems.jpg`} style={{ maxWidth: '80vw' }}/>
    )
  }
}
