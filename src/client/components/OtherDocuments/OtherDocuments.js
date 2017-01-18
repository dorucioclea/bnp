import React from 'react';

export default class OtherDocuments extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <div>
        This is Other Documents page.
      </div>
    )
  }
}
