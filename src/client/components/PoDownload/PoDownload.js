import React from 'react';

export default class PoDownload extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <div>
        This is a PO Download page.
      </div>
    )
  }
}
