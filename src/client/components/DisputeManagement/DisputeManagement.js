import React from 'react';

export default class DisputeManagement extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <div>
        This is Dispute Management page.
      </div>
    )
  }
}
