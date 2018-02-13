import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import translations from '../i18n'
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

export default class UserCreate extends Components.ContextComponent {
  state = { tenant: null, supplierId: null, customerId: null }

  constructor(props, context) {
    super(props);
    context.i18n.register('UserCreate', translations);

    const supplierServiceRegistry = (service) => ({ url: `/supplier` });
    const customerServiceRegistry = (service) => ({ url: `/customer` });
    const userServiceRegistry = (service) => ({ url: `/user` });

    this.SupplierAutocomplete = serviceComponent({
      supplierServiceRegistry,
      serviceName: 'supplier',
      moduleName: 'supplier-autocomplete',
      jsFileName: 'autocomplete-bundle'
    });

    this.CustomerAutocomplete = serviceComponent({
      customerServiceRegistry,
      serviceName: 'customer',
      moduleName: 'customer-autocomplete',
      jsFileName: 'autocomplete-bundle'
    });

    this.UserCreateForm = serviceComponent({
      userServiceRegistry,
      serviceName: 'user',
      moduleName: 'user-create',
      jsFileName: 'create-bundle'
    });
  }

  handleOnCreate() {
    this.context.router.push('/bnp/users');
  }

  renderSupplierPicker() {
    return (
        <form className='form-inline' onSubmit={event => this.onSubmit(event)}>
        <div className='form-group'>
          <Select
            className='add-role-form-select'
            value={this.state.selectedRoleId}
            onChange={option => this.onRoleChange(option)}
            searchable={false}
            clearable={false}
            placeholder={i18n.getMessage('UserRoleEditor.addRoleForm.placeholder')}
            noResultsText={i18n.getMessage('UserRoleEditor.addRoleForm.noResults')}
            options={this.getAssignableRoles().map(roleId => ({value: roleId, label: roleId}))}
          />

          {renderSubmitButton('supplier', () => !this.state.supplierId)}
        </div>
      </form>
    );
  }

  renderSubmitButton(isButtonDisabled) {
    return (
      <button type='submit' className='btn btn-primary' disabled={isButtonDisabled()}>
            {i18n.getMessage('UserAdmin.button.add')}
      </button>
    );
  }

  renderUserCreateForm() {
    if (!this.state.tenant) return null;

    const tenantId = this.state.tenant === 'supplier' ? this.state.supplierId : this.state.customerId;
    return <this.UserCreateForm tenantType={this.state.tenant} tenantId={tenantId} onCreate={this.handleOnCreate()}/>
  }

  render() {
    return (
      <div>
        {renderSupplierPicker()}
        {renderCustomerPicker()}
        {renderUserCreateForm()}
      </div>
    );
  }
}
