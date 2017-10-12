import React from 'react';
import locales from './i18n/locales.js';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

export default class SupplierDirectory extends React.Component {
  static contextTypes = {
    i18n: React.PropTypes.object,
    simPublicUrl: React.PropTypes.string
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
    this.context.i18n.register('SupplierDirectory', locales);
  }

  componentWillReceiveProps(nextProps, nextContext){
    if(nextContext.i18n){
      nextContext.i18n.register('SupplierDirectory', locales);
    }
  }

  render() {
    const { Directory } = this.externalComponents;
    return (
      <div>
        <h1>{this.context.i18n.getMessage('SupplierDirectory.head')}</h1>
        <Directory actionUrl={this.context.simPublicUrl} />
      </div>
    )
  }
}
