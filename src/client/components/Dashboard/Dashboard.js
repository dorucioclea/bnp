import React from 'react';

export default class Dashboard extends React.Component {

  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <div>
        This is a Dashboard.
      </div>
    )
  }
}
