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
        <a
          target="_blank"
          href="https://docs.google.com/document/d/1XHO3D2_10iTBmtZhhbStJ7oD4uZiTJoedjmTiH9I8qg/edit#heading=h.gjdgxs"
          className="btn btn-link pull-right"
        >{this.context.i18n.getMessage('CustomerList.createGuidelines')}</a>
        <this.CustomerList
          onEdit={customerId => this.handleEdit(customerId)}
          onCreateUser={customerId => this.handleCreateUser(customerId)}
        />
      </div>
    );
  }
}
