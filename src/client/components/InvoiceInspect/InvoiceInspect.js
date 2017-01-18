import React from 'react';

export default class InvoiceInspect extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  render() {
    return (
      <div>
        This is Invoice Inspect page.
      </div>
    )
  }
}
