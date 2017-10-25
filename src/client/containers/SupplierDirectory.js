import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from './i18n'
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

export default class SupplierDirectory extends Components.ContextComponent {

  constructor(props, context) {

      super(props);

      context.i18n.register('SupplierDirectory', translations);

      const serviceRegistry = (service) => ({ url: `/supplier` });

      this.Directory = serviceComponent({
        serviceRegistry,
        serviceName: 'supplier' ,
        moduleName: 'supplier-directory',
        jsFileName: 'directory-bundle'
      });
  }

  render() {

    return (
      <div>
        <h1>{this.context.i18n.getMessage('SupplierDirectory.head')}</h1>
        <this.Directory />
      </div>
    )
  }
}
