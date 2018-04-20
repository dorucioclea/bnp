import React from 'react';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';
import translations from './i18n';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

class SupplierInformation extends Components.ContextComponent
{
  state = { tabKey: this.props.location.query.tab || 'company' };

  constructor(props, context) {
      super(props);

      context.i18n.register('SupplierInformation', translations);

      this.SupplierEditor = context.loadComponent({
        serviceName: 'supplier' ,
        moduleName: 'supplier-information',
        jsFileName: 'information-bundle'
      });

      this.SupplierOrganization = context.loadComponent({
        serviceName: 'supplier' ,
        moduleName: 'supplier-organization',
        jsFileName: 'organization-bundle'
      });

      this.SupplierAddressEditor = context.loadComponent({
        serviceName: 'supplier' ,
        moduleName: 'supplier-address',
        jsFileName: 'address-bundle'
      });

      this.SupplierContactEditor = context.loadComponent({
        serviceName: 'supplier' ,
        moduleName: 'supplier-contact',
        jsFileName: 'contact-bundle'
      });

      this.SupplierBankAccountEditor = context.loadComponent({
        serviceName: 'supplier' ,
        moduleName: 'supplier-bank_accounts',
        jsFileName: 'bank_accounts-bundle'
      });

      if (context.userData.roles.includes('supplier-admin')) {
        this.SupplierApproval = context.loadComponent({
          serviceName: 'supplier',
          moduleName: 'supplier-access_approval',
          jsFileName: 'access_approval-bundle'
        });
      }
  }

  confirmLeaveChangesUnsaved = () => {
      return new Promise((resolve, reject) => {
          const { i18n } = this.context;

          const title = i18n.getMessage('UserAdmin.Editor.unsavedChangesConfirmation.title');
          const text = i18n.getMessage('UserAdmin.Editor.unsavedChangesConfirmation.message');
          const buttons = { 'no' : i18n.getMessage('System.no'), 'yes' : i18n.getMessage('System.yes') };
          const onButtonClick = (button) => resolve(button === 'yes');

          this.context.showModalDialog(title, text, onButtonClick, buttons)
      });
  }

  handleDirtyState = event => {
    this.isDirty = event.isDirty;
  };

  handleSupplierUpdate = updatedSupplier => null;



  handleSelect = tabKey => {
    if(this.isDirty) {
        this.confirmLeaveChangesUnsaved().then(go => {
            if(go) {
                this.isDirty = false;
                this.setState({ tabKey });
            }
        })
    }
    else {
        this.setState({ tabKey });
    }
  };

  handleUnauthorized = () => {
    this.context.logOutUser(document.location.href);
  };

  handleBackUrlClick = () => {
    window.location.replace(`${this.props.location.query.backUrl}`);
  };

  renderBackUrlLink = () => {
    if (!this.props.location.query.backUrl) return null;

    return (
      <div className='alert alert-info'>
        <button className='btn btn-link' onClick={this.handleBackUrlClick} >{this.context.i18n.getMessage('SupplierInformation.ApplicationFormButton.backToServiceConfig')}</button>
      </div>
    );
  }

  renderUserAccessApproval = () => {
    if (!this.context.userData.roles.includes('supplier-admin')) return null;

    return (
      <Tab eventKey='accessApproval' title={this.context.i18n.getMessage('CompanyProfile.tab.userAccessApproval')}>
        <this.SupplierApproval key='approval' supplierId={this.context.userData.supplierid} />
      </Tab>
    );
  }

  handleLogout = () => {
    this.context.logOutUser();
  };

  render() {
    const { userData, i18n } = this.context;

    this.context.setPageTitle(i18n.getMessage('SupplierInformation.page.title'));

    if (!userData.supplierid) {
      return <p>{i18n.getMessage('SupplierInformation.notExists')}</p>
    }

    const company = (
      <this.SupplierEditor
        key='company'
        onUnauthorized={this.handleUnauthorized}
        supplierId={userData.supplierid}
        username={userData.id}
        userRoles={userData.roles}
        onChange={this.handleDirtyState}
        onUpdate={this.handleSupplierUpdate}
        onLogout={this.handleLogout}
      />
    );

    const organization = (
      <this.SupplierOrganization
        key='organization'
        onUnauthorized={this.handleUnauthorized}
        supplierId={userData.supplierid}
        onLogout={this.handleLogout}
      />
    );

    const address = (
      <this.SupplierAddressEditor
        key='address'
        onUnauthorized={this.handleUnauthorized}
        supplierId={userData.supplierid}
        username={userData.id}
        userRoles={userData.roles}
        onChange={this.handleDirtyState}
      />
    );

    const contact = (
      <this.SupplierContactEditor
        key='contact'
        onUnauthorized={this.handleUnauthorized}
        supplierId={userData.supplierid}
        username={userData.id}
        userRoles={userData.roles}
        onChange={this.handleDirtyState}
      />
    );

    const banks = (
      <this.SupplierBankAccountEditor
        key='bank_accounts'
        onUnauthorized={this.handleUnauthorized}
        supplierId={userData.supplierid}
        username={userData.id}
        userRoles={userData.roles}
        onChange={this.handleDirtyState}
      />
    );

    return (
      <div>
        {this.renderBackUrlLink()}
        <Tabs id="supplierTabs" activeKey={this.state.tabKey} onSelect={() => this.handleSelect()}>
          <Tab eventKey='company' title={i18n.getMessage('CompanyProfile.tab.company')}>
            {company}
          </Tab>
          <Tab eventKey='organization' title={i18n.getMessage('CompanyProfile.tab.organization')}>
            <br />
            {organization}
          </Tab>
          <Tab eventKey='address' title={i18n.getMessage('CompanyProfile.tab.address')}>
            {address}
          </Tab>
          <Tab eventKey='contact' title={i18n.getMessage('CompanyProfile.tab.contact')}>
            {contact}
          </Tab>
          <Tab eventKey='bankAccount' title={i18n.getMessage('CompanyProfile.tab.bankAccount')}>
            {banks}
          </Tab>
          {this.renderUserAccessApproval()}
        </Tabs>
      </div>
    )
  }
}

export default SupplierInformation;
