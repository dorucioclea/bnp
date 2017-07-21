// TODO: need to remove unnecessary code.
// TODO: agree

import React from 'react';
import locales from './i18n/locales.js';
import browserHistory from 'react-router/lib/browserHistory';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import connect from 'react-redux/lib/components/connect';
import { setCurrentUserInfo } from './../../redux/actions.js';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

class SupplierApplicationForm extends React.Component {

  static propTypes = {
    currentUserData: React.PropTypes.object
  };

  static contextTypes = {
    i18n: React.PropTypes.object,
    formatPatterns: React.PropTypes.object,
    dateTimePattern: React.PropTypes.string,
    datePattern: React.PropTypes.string,
    simPublicUrl: React.PropTypes.string,
    simUrl: React.PropTypes.string,
    httpResponseHandler: React.PropTypes.func,
  };

  state = { tabKey: 1 };

  componentWillMount() {
    let serviceRegistry = (service) => ({ url: `${this.context.simPublicUrl}/supplier` });

    const SupplierEditor = serviceComponent({
      serviceRegistry,
      serviceName: 'supplier' ,
      moduleName: 'supplier-information',
      jsFileName: 'information-bundle'
    });

    const SupplierAddressEditor = serviceComponent({
      serviceRegistry,
      serviceName: 'supplier' ,
      moduleName: 'supplier-address',
      jsFileName: 'address-bundle'
    });

    const SupplierContactEditor = serviceComponent({
      serviceRegistry,
      serviceName: 'supplier' ,
      moduleName: 'supplier-contact',
      jsFileName: 'contact-bundle'
    });

    const SupplierBankAccountEditor = serviceComponent({
      serviceRegistry,
      serviceName: 'supplier' ,
      moduleName: 'supplier-bank_accounts',
      jsFileName: 'bank_accounts-bundle'
    });

    this.externalComponents = { SupplierEditor, SupplierAddressEditor, SupplierContactEditor, SupplierBankAccountEditor };
    this.setState({ i18n: this.context.i18n.register('SupplierApplicationForm', locales) });
  }

  componentWillReceiveProps(nextProps, nextContext){
    if(this.state.i18n && this.state.i18n.locale && nextContext.i18n.locale != this.state.i18n.locale){
      this.setState({ i18n: nextContext.i18n.register('SupplierApplicationForm', locales) });
    }
  }

  componentWillUnmount() {
    this.ignoreAjax = true;
  }

  setCookieData(cname, cvalue, exdays) {
    let date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  _confirmLeaveChangesUnsaved = () => window.confirm(this.state.i18n.getMessage('ApplicationFormConfirmation.unsavedChanges'));

  handleDirtyState = event => {
    this.isDirty = event.isDirty;
  };

  handleSupplierUpdate = updatedSupplier => {
    this.props.dispatch(setCurrentUserInfo({
      ...this.props.currentUserData,
      supplierid: updatedSupplier.supplierId,
      supplierName: updatedSupplier.supplierName,
      companyRole: 'selling'
    }));
  };

  handleLogout = function() {
    console.log("logout has no handler");
  };

  handleSelect = tabKey => {
    if (!this.isDirty || this._confirmLeaveChangesUnsaved()) {
      this.isDirty = false;
      this.setState({ tabKey });
    }
  };

  handleUnauthorized = () => {
    browserHistory.push(`${window.simContextPath}/login`);
  };

  render() {
    let userInfo = this.props.currentUserData;

    if (!userInfo.supplierid) {
      return <p>Supplier Does not exist! Please register first</p>
    }

    const { SupplierEditor, SupplierAddressEditor, SupplierContactEditor, SupplierBankAccountEditor } = this.externalComponents;

    let company = (
      <SupplierEditor
        key='company'
        onUnauthorized={this.handleUnauthorized}
        actionUrl={this.context.simPublicUrl}
        supplierId={userInfo.supplierid}
        locale={this.context.i18n.locale}
        username={userInfo.id}
        dateTimePattern={this.context.datePattern}
        onChange={this.handleDirtyState}
        onUpdate={this.handleSupplierUpdate}
        onLogout={this.handleLogout}
      />
    );

    let address = (
      <SupplierAddressEditor
        key='address'
        onUnauthorized={this.handleUnauthorized}
        readOnly={false /* TODO: only supplier creator can edit his supplier info */}
        actionUrl={this.context.simPublicUrl}
        supplierId={userInfo.supplierid}
        locale={this.context.i18n.locale}
        username={userInfo.id}
        onChange={this.handleDirtyState}
      />
    );

    let contact = (
      <SupplierContactEditor
        key='contact'
        onUnauthorized={this.handleUnauthorized}
        readOnly={false /* TODO: only supplier creator can edit his supplier info */}
        actionUrl={this.context.simPublicUrl}
        supplierId={userInfo.supplierid}
        locale={this.context.i18n.locale}
        username={userInfo.id}
        onChange={this.handleDirtyState}
      />
    );

    let banks = (
      <SupplierBankAccountEditor
        key='bank_accounts'
        onUnauthorized={this.handleUnauthorized}
        readOnly={false /* TODO: only supplier creator can edit his supplier info */}
        actionUrl={this.context.simPublicUrl}
        supplierId={userInfo.supplierid}
        locale={this.context.i18n.locale}
        username={userInfo.id}
        onChange={this.handleDirtyState}
      />
    );

    return (
      <div>
        <Tabs id="supplierTabs" activeKey={this.state.tabKey} onSelect={this.handleSelect}>
          <Tab eventKey={1} title={this.state.i18n.getMessage('ApplicationFormTab.company')}>
            {company}
          </Tab>
          <Tab eventKey={2} title={this.state.i18n.getMessage('ApplicationFormTab.address')}>
            {address}
          </Tab>
          <Tab eventKey={3} title={this.state.i18n.getMessage('ApplicationFormTab.contact')}>
            {contact}
          </Tab>
          <Tab eventKey={4} title={this.state.i18n.getMessage('ApplicationFormTab.bankAccount')}>
            {banks}
          </Tab>
        </Tabs>
      </div>
    )
  }
}

function injectState(store) {
  return {
    currentUserData: store.currentUserData
  };
}

export default connect(injectState)(SupplierApplicationForm);
