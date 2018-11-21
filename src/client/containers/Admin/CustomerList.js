import React from 'react';
import { Components } from '@opuscapita/service-base-ui';

export default class CustomerList extends Components.ContextComponent {

  constructor(props, context) {
    super(props);

    this.CustomerList = context.loadComponent({
      serviceName: 'customer' ,
      moduleName: 'customer-list',
      jsFileName: 'list-bundle'
    });
  }

  componentDidMount() {
     if (!this.context.userData.roles.includes('admin')) this.context.router.push(`/bnp`);
  }

  handleEdit(customerId) {
    this.context.router.push(`/bnp/customers/${customerId}`);
  }

  handleCreateUser(customerId) {
    this.context.router.push(`/bnp/customers/${customerId}/createUser`);
  }

  handleCreateCustomerClick() {
    this.context.router.push(`/bnp/customers/new`);
  }

  render() {
    return (
      <div>
        <button className='btn btn-primary pull-right' onClick={this.handleCreateCustomerClick.bind(this)} >{this.context.i18n.getMessage('CustomerList.createCustomer')}</button>
        <this.CustomerList
          onEdit={customerId => this.handleEdit(customerId)}
          onCreateUser={customerId => this.handleCreateUser(customerId)}
        />
      </div>
    );
  }
}
