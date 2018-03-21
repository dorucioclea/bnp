import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from './i18n'

export default class SupplierDirectory extends Components.ContextComponent {

  constructor(props, context) {

      super(props);

      context.i18n.register('SupplierDirectory', translations);

      this.Directory = context.loadComponent({
        serviceName: 'supplier' ,
        moduleName: 'supplier-directory',
        jsFileName: 'directory-bundle'
      });
  }

  render() {

    this.context.setPageTitle(this.context.i18n.getMessage('SupplierDirectory.page.title'));

    return (
      <div>
        <h1>{this.context.i18n.getMessage('SupplierDirectory.head')}</h1>
        <this.Directory />
      </div>
    )
  }
}
