import React from 'react';

export default class ServiceConfiguration extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <div>
        This is Service Configuration page.
      </div>
    )
  }
}
