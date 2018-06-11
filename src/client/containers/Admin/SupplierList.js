import React from 'react';
import { Components } from '@opuscapita/service-base-ui';

export default class SupplierList extends Components.ContextComponent {

  constructor(props, context) {
    super(props);

    this.SupplierList = context.loadComponent({
      serviceName: 'supplier' ,
      moduleName: 'supplier-list',
      jsFileName: 'list-bundle'
    });
  }

  componentDidMount() {
    if (!this.context.userData.roles.includes('admin')) this.context.router.push(`/bnp`);
  }

  handleEdit(supplierId) {
    this.context.router.push(`/bnp/suppliers/${supplierId}`);
  }

  handleCreateUser(supplierId) {
    this.context.router.push(`/bnp/suppliers/${supplierId}/createUser`);
  }

  handleCreateSupplierClick() {
    this.context.router.push(`/bnp/suppliers/new`);
  }

  render() {
    return (
      <div>
        <button className='btn btn-primary pull-right' onClick={this.handleCreateSupplierClick.bind(this)} >
          {this.context.i18n.getMessage('SupplierList.createSupplier')}
        </button>
        <this.SupplierList
          onEdit={supplierId => this.handleEdit(supplierId)}
          onCreateUser={supplierId => this.handleCreateUser(supplierId)}
        />
      </div>
    );
  }
}
