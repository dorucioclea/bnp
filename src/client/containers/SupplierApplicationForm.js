import React from 'react';
import PropTypes from 'prop-types';
import { Components } from '@opuscapita/service-base-ui';
import translations from './i18n';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

class SupplierApplicationForm extends Components.ContextComponent
{
  state = { tabKey: this.props.location.query.tab || 'company' };

  constructor(props, context) {
      super(props);

      context.i18n.register('SupplierApplicationForm', translations);

      const serviceRegistry = (service) => ({ url: '/supplier' });

      this.SupplierEditor = serviceComponent({
        serviceRegistry,
        serviceName: 'supplier' ,
        moduleName: 'supplier-information',
        jsFileName: 'information-bundle'
      });

      this.SupplierAddressEditor = serviceComponent({
        serviceRegistry,
        serviceName: 'supplier' ,
        moduleName: 'supplier-address',
        jsFileName: 'address-bundle'
      });

      this.SupplierContactEditor = serviceComponent({
        serviceRegistry,
        serviceName: 'supplier' ,
        moduleName: 'supplier-contact',
        jsFileName: 'contact-bundle'
      });

      this.SupplierBankAccountEditor = serviceComponent({
        serviceRegistry,
        serviceName: 'supplier' ,
        moduleName: 'supplier-bank_accounts',
        jsFileName: 'bank_accounts-bundle'
      });

      if (context.userData.roles.includes('supplier-admin')) {
        this.SupplierApproval = serviceComponent({
          serviceRegistry,
          serviceName: 'supplier',
          moduleName: 'supplier-access_approval',
          jsFileName: 'access_approval-bundle'
        });
      }
  }

  confirmLeaveChangesUnsaved = () => {
      return new Promise((resolve, reject) => {
          const { i18n } = this.context;

          const title = i18n.getMessage('SupplierApplicationForm.ApplicationFormConfirmation.unsavedChanges.title');
          const text = i18n.getMessage('SupplierApplicationForm.ApplicationFormConfirmation.unsavedChanges.text');
          const buttons = { 'no' : i18n.getMessage('System.no'), 'yes' : i18n.getMessage('System.yes') };
          const onButtonClick = (button) => resolve(button === 'yes');

          this.context.showModalDialog(title, text, onButtonClick, buttons)
      });
  }

  handleDirtyState = event => {
    this.isDirty = event.isDirty;
  };

  handleSupplierUpdate = updatedSupplier => {
    /*this.props.dispatch(setCurrentuserData({
      ...this.props.currentUserData,
      supplierid: updatedSupplier.supplierId,
      supplierName: updatedSupplier.supplierName,
      companyRole: 'selling'
    }));*/
  };



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
      <Alert bsStyle='info'>
        <Button bsStyle='link' onClick={this.handleBackUrlClick} >{this.context.i18n.getMessage('SupplierApplicationForm.ApplicationFormButton.backToServiceConfig')}</Button>
      </Alert>
    );
  }

  renderUserAccessApproval = () => {
    if (!this.context.userData.roles.includes('supplier-admin')) return null;

    return (
      <Tab eventKey='accessApproval' title={this.context.i18n.getMessage('SupplierApplicationForm.ApplicationFormTab.userAccessApproval')}>
        <this.SupplierApproval key='approval' supplierId={this.context.userData.supplierid} />
      </Tab>
    );
  }

  handleLogout = () => {
    this.context.logOutUser();
  };

  render() {
    const { userData, i18n } = this.context;

    this.context.setPageTitle(i18n.getMessage('SupplierApplicationForm.page.title'));

    if (!userData.supplierid) {
      return <p>{i18n.getMessage('SupplierApplicationForm.notExists')}</p>
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
          <Tab eventKey='company' title={i18n.getMessage('SupplierApplicationForm.ApplicationFormTab.company')}>
            {company}
          </Tab>
          <Tab eventKey='address' title={i18n.getMessage('SupplierApplicationForm.ApplicationFormTab.address')}>
            {address}
          </Tab>
          <Tab eventKey='contact' title={i18n.getMessage('SupplierApplicationForm.ApplicationFormTab.contact')}>
            {contact}
          </Tab>
          <Tab eventKey='bankAccount' title={i18n.getMessage('SupplierApplicationForm.ApplicationFormTab.bankAccount')}>
            {banks}
          </Tab>
          {this.renderUserAccessApproval()}
        </Tabs>
      </div>
    )
  }
}

export default SupplierApplicationForm;
