import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';
import translations from '../i18n';

export default class CustomerList extends Components.ContextComponent {

  constructor(props, context) {
    super(props);
    context.i18n.register('UserAdmin', translations);

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
    this.context.router.push(`/bnp/customers/${customerId}/createUser`);
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
