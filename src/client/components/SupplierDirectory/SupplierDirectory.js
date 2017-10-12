import React from 'react';
import locales from './i18n/locales.js';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

export default class SupplierDirectory extends React.Component {
  static contextTypes = {
    i18n: React.PropTypes.object
  };

  componentWillMount() {
    let serviceRegistry = (service) => ({ url: `/supplier` });
    const Directory = serviceComponent({
      serviceRegistry,
      serviceName: 'supplier' ,
      moduleName: 'supplier-directory',
      jsFileName: 'directory-bundle'
    });

    this.externalComponents = { Directory };
    this.setState({ i18n: this.context.i18n.register('SupplierDirectory', locales) });
  }

  componentWillReceiveProps(nextProps, nextContext){
    this.setState({ i18n: nextContext.i18n.register('SupplierDirectory', locales) });
  }

  render() {
    const { Directory } = this.externalComponents;
    return (
      <div>
        <h1>{this.state.i18n.getMessage('SupplierDirectory.head')}</h1>
        <Directory actionUrl={this.context.simPublicUrl} />
      </div>
    )
  }
}
