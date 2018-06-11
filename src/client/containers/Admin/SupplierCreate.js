import React from 'react';
import { Components } from '@opuscapita/service-base-ui';


export default class SupplierCreate extends Components.ContextComponent {
  constructor(props, context) {
    super(props);

    this.SupplierCreate = context.loadComponent({
      serviceName: 'supplier',
      moduleName: 'supplier-creation',
      jsFileName: 'creation-bundle'
    });
  }

  componentDidMount() {
     if (!this.context.userData.roles.includes('admin')) this.context.router.push(`/bnp`);
  }

  handleCreate(supplierId) {
    this.context.router.push(`/bnp/suppliers/${supplierId}`);
  }

  render() {
    return (
      <this.SupplierCreate
        user={this.context.userData}
        userRoles={this.context.userData.roles}
        onCreate={id => this.handleCreate(id)}
        onChange={() => null}
      />
    );
  }
}
