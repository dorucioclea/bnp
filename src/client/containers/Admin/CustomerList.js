import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

export default class CustomerList extends Components.ContextComponent {

  constructor(props, context) {
    super(props);
    const serviceRegistry = (service) => ({ url: `/customer` });

    this.CustomerList = serviceComponent({
      serviceRegistry,
      serviceName: 'customer' ,
      moduleName: 'customer-list',
      jsFileName: 'list-bundle'
    });
  }

  handleEdit(customerId) {
    this.context.router.push(`/bnp/customers/${customerId}`);
  }

  handleCreateUser(customerId) {
    this.context.router.push(`/bnp/customers/${customerId}/user`);
  }

  render() {
    return (
      <this.CustomerList
        onEdit={customerId => this.handleEdit(customerId)}
        onCreateUser={customerId => this.handleCreateUser(customerId)}
      />
    );
  }
}
