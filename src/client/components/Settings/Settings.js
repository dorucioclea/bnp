import React from 'react';

export default class Settings extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <div>
        This is a Settings page.
      </div>
    )
  }
}
