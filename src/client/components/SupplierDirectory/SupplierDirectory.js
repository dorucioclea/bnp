import React from 'react';
import locales from './i18n/locales.js';

export default class SupplierDirectory extends React.Component {
  static contextTypes = {
    i18n: React.PropTypes.object
  };

  componentWillMount() {
    this.setState({ i18n: this.context.i18n.register('SupplierDirectory', locales) });
  }

  componentWillReceiveProps(nextProps, nextContext){
    this.setState({ i18n: nextContext.i18n.register('SupplierDirectory', locales) });
  }

  render() {
    return (
      <div>
        <h1>{this.state.i18n.getMessage('SupplierDirectory.head')}</h1>
      </div>
    )
  }
}
