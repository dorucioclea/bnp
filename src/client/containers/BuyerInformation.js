import React from 'react';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';
import translations from './i18n';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

class BuyerInformation extends Components.ContextComponent
{
  state = { tabKey: 'company' };

  constructor(props, context) {
    super(props);

    context.i18n.register('BuyerInformation', translations);

    this.CustomerEditor = context.loadComponent({
      serviceName: 'customer' ,
      moduleName: 'customer-information',
      jsFileName: 'information-bundle'
    });

    this.CustomerOrganization = context.loadComponent({
      serviceName: 'customer' ,
      moduleName: 'customer-organization',
      jsFileName: 'organization-bundle'
    });

    this.CustomerAddressEditor = context.loadComponent({
      serviceName: 'customer' ,
      moduleName: 'customer-addresses',
      jsFileName: 'addresses-bundle'
    });

    this.CustomerContactEditor = context.loadComponent({
      serviceName: 'customer' ,
      moduleName: 'customer-contacts',
      jsFileName: 'contacts-bundle'
    });

    this.CustomerBankAccountEditor = context.loadComponent({
      serviceName: 'customer' ,
      moduleName: 'customer-bank_accounts',
      jsFileName: 'bank_accounts-bundle'
    });
  }

  confirmLeaveChangesUnsaved = () => {
      return new Promise((resolve, reject) => {
          const { i18n } = this.context;

          const title = i18n.getMessage('CompanyProfile.form.unsavedChanges.title');
          const text = i18n.getMessage('CompanyProfile.form.unsavedChanges.text');
          const buttons = { 'no' : i18n.getMessage('System.no'), 'yes' : i18n.getMessage('System.yes') };
          const onButtonClick = (button) => resolve(button === 'yes');

          this.context.showModalDialog(title, text, onButtonClick, buttons)
      });
  }

  handleDirtyState = event => {
    this.isDirty = event.isDirty;
  };

  handleCustomerUpdate = () => null;

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

  handleLogout = () => {
    this.context.logOutUser();
  };

  render() {
    const { userData, i18n } = this.context;

    this.context.setPageTitle(i18n.getMessage('BuyerInformation.page.title'));

    if (!userData.customerid) {
      return <p>{i18n.getMessage('BuyerInformation.notExists')}</p>
    }

    const company = (
      <this.CustomerEditor
        key='company'
        onUnauthorized={this.handleUnauthorized}
        customerId={userData.customerid}
        username={userData.id}
        userRoles={userData.roles}
        onChange={this.handleDirtyState}
        onUpdate={this.handleCustomerUpdate}
        onLogout={this.handleLogout}
      />
    );

    const organization = (
      <this.CustomerOrganization
        key='organization'
        onUnauthorized={this.handleUnauthorized}
        customerId={userData.customerid}
        onLogout={this.handleLogout}
      />
    );

    const address = (
      <this.CustomerAddressEditor
        key='address'
        onUnauthorized={this.handleUnauthorized}
        customerId={userData.customerid}
        username={userData.id}
        userRoles={userData.roles}
        onChange={this.handleDirtyState}
      />
    );

    const contacts = (
      <this.CustomerContactEditor
        key='contact'
        onUnauthorized={this.handleUnauthorized}
        customerId={userData.customerid}
        username={userData.id}
        userRoles={userData.roles}
        onChange={this.handleDirtyState}
      />
    );

    const banks = (
      <this.CustomerBankAccountEditor
        key='bank_accounts'
        onUnauthorized={this.handleUnauthorized}
        customerId={userData.customerid}
        username={userData.id}
        userRoles={userData.roles}
        onChange={this.handleDirtyState}
      />
    );

    return (
      <div>
        <Tabs id="customerTabs" activeKey={this.state.tabKey} onSelect={() => this.handleSelect()}>
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
            {contacts}
          </Tab>
          <Tab eventKey='bankAccount' title={i18n.getMessage('CompanyProfile.tab.bankAccount')}>
            {banks}
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default BuyerInformation;
