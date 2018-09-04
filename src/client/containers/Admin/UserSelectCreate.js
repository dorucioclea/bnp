import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../i18n';
import { Supplier, Customer } from '../../api';

export default class UserSelectCreate extends Components.ContextComponent {
  state = { supplier: null, customer: null }

  constructor(props, context) {
    super(props);
    context.i18n.register('UserCreate', translations);
    this.supplierApi = new Supplier();
    this.customerApi = new Customer();

    this.SupplierAutocomplete = context.loadComponent({
      serviceName: 'supplier',
      moduleName: 'supplier-autocomplete',
      jsFileName: 'autocomplete-bundle'
    });

    this.CustomerAutocomplete = context.loadComponent({
      serviceName: 'customer',
      moduleName: 'customer-autocomplete',
      jsFileName: 'autocomplete-bundle'
    });
  }

  handleOnClick(event, tenantType, tenantId) {
    event.preventDefault();
    this.context.router.push(`/bnp/${tenantType}s/${tenantId}/createUser`);
  }

  handleOnChange(tenantType, tenant) {
    this.setState({ [tenantType]: tenant });
  }

  getTenants(tenantType, search) {
    return tenantType === 'supplier' ? this.supplierApi.getSuppliers(search) : this.customerApi.getCustomers(search);
  }

  renderTenantPicker({ tenantType, component }) {
    return (
      <div className='row'>
        <div className='col-lg-offset-3 col-lg-6 col-sm-offset-2 col-sm-8 col-xs-12'>
          <h4>{this.context.i18n.getMessage(`UserCreate.select.${tenantType}`)}</h4>
          <div className='input-group'>
            {component}
            {this.renderSubmitButton(tenantType, this.state[tenantType] && this.state[tenantType].id)}
          </div>
        </div>
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
        {this.renderTenantPicker({
          tenantType: 'supplier',
          component: (
            <this.SupplierAutocomplete
              value={this.state.supplier}
              onChange={supplier => this.handleOnChange('supplier', supplier)}
              onBlur={() => null}
            />
          )
        })}
        <br />
        {this.renderTenantPicker({
          tenantType: 'customer',
          component: (
            <this.CustomerAutocomplete
              value={this.state.customer}
              onChange={customer => this.handleOnChange('customer', customer)}
              onBlur={() => null}
            />
          )
        })}
      </div>
    );
  }
}
