import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../i18n'
import { ReferenceAutocomplete } from '@opuscapita/react-reference-select';
import { Supplier, Customer } from '../../api';

export default class UserSelectCreate extends Components.ContextComponent {
  state = { supplier: null, customer: null }

  constructor(props, context) {
    super(props);
    context.i18n.register('UserCreate', translations);
    this.supplierApi = new Supplier();
    this.customerApi = new Customer();
  }

  handleOnClick(event, tenantType, tenantId) {
    event.preventDefault();
    this.context.router.push(`/bnp/${tenantType}s/${tenantId}/createUser`);
  }

  handleOnChange(tenantType, tenant) {
    this.setState({ [tenantType]: tenant });
  }

  renderSupplierPicker() {
    return (
      <div className='input-group'>
        <ReferenceAutocomplete
          autocompleteAction={(input) => {
            const search = input ? { supplierName: input } : {}
            return this.supplierApi.getSuppliers(search).then(suppliers => {
              return new Promise((resolve) => resolve({ options: suppliers, complete: false }));
            });
          }}
          value={this.state.supplier}
          labelProperty='supplierName'
          valueProperty='id'
          onChange={supplier => this.handleOnChange('supplier', supplier)}
          onBlur={() => null}
        />

        {this.renderSubmitButton('supplier', this.state.supplier && this.state.supplier.supplierId)}
      </div>
    );
  }

  renderCustomerPicker() {
    return (
      <div className='input-group'>
        <ReferenceAutocomplete
          autocompleteAction={(input) => {
            const search = input ? { customerName: input } : {}
            return this.customerApi.getCustomers(search).then(customers => {
              return new Promise((resolve) => resolve({ options: customers, complete: false }));
            });
          }}
          value={this.state.customer}
          labelProperty='customerName'
          valueProperty='id'
          onChange={customer => this.handleOnChange('customer', customer)}
          onBlur={() => null}
        />

        {this.renderSubmitButton('customer', this.state.customer && this.state.customer.id)}
      </div>
    );
  }

  renderSubmitButton = (tenantType, tenantId) => {
    return (
      <span className='input-group-btn'>
        <button className='btn btn-primary' disabled={this.submitButtonDisabbled(tenantId)} onClick={event => this.handleOnClick(event, tenantType, tenantId)}>
          {this.context.i18n.getMessage('UserCreate.createUser')}
        </button>
      </span>
    );
  };

  submitButtonDisabbled(tenantId) {
    return !tenantId;
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-lg-offset-3 col-lg-6 col-sm-offset-2 col-sm-8 col-xs-12'>
            <h4>{this.context.i18n.getMessage('UserCreate.select.supplier')}</h4>
            {this.renderSupplierPicker()}
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-lg-offset-3 col-lg-6 col-sm-offset-2 col-sm-8 col-xs-12'>
            <h4>{this.context.i18n.getMessage('UserCreate.select.customer')}</h4>
            {this.renderCustomerPicker()}
          </div>
        </div>
      </div>
    );
  }
}
