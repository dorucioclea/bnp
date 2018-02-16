import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

export default class SupplierList extends Components.ContextComponent {

  constructor(props, context) {
    super(props);
    const serviceRegistry = (service) => ({ url: `/supplier` });

    this.SupplierList = serviceComponent({
      serviceRegistry,
      serviceName: 'supplier' ,
      moduleName: 'supplier-list',
      jsFileName: 'list-bundle'
    });
  }

  handleEdit(supplierId) {
    this.context.router.push(`/bnp/suppliers/${supplierId}`);
  }

  handleCreateUser(supplierId) {
    this.context.router.push(`/bnp/suppliers/${supplierId}/createUser`);
  }

  render() {
    return (
      <this.SupplierList
        onEdit={supplierId => this.handleEdit(supplierId)}
        onCreateUser={supplierId => this.handleCreateUser(supplierId)}
      />
    );
  }
}
