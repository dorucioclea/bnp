import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

let getTenantType = function(params) {
  if (params.customerId) return 'customer';
  if (params.supplierId) return 'supplier';
  return null;
}

export default class UserSelectCreate extends Components.ContextComponent {
  constructor(props, context) {
    super(props);
    this.tenantType = getTenantType(props.params);
    this.tenantId = props.params.supplierId || props.params.customerId;

    this.UserCreate = serviceComponent({
      serviceRegistry: () => ({ url: `/user` }),
      serviceName: 'user',
      moduleName: 'user-create',
      jsFileName: 'create-bundle'
    });
  }

  handleCreate(userId) {
    this.context.router.push(`/bnp/users/${userId}`);
  }

  render() {
    return <this.UserCreate tenantType={this.tenantType} tenantId={this.tenantId} onCreate={userId => this.handleCreate(userId)} onChange={() => null}/>
  }
}
