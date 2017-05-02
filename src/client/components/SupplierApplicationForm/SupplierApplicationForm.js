// TODO: need to remove unnecessary code.
// TODO: agree

import React from 'react';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';
import locales from './i18n/locales.js'
import browserHistory from 'react-router/lib/browserHistory';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import { SupplierEditor, SupplierAddressEditor, SupplierContactEditor } from 'supplier';
import connect from 'react-redux/lib/components/connect';
import { setCurrentUserInfo } from './../../redux/actions.js';
import I18nBundle from '../Widgets/components/I18nBundle';
import OnboardingUserService from '../../service/OnboardingUserService';
class SupplierApplicationForm extends React.Component {

  static propTypes = {
    currentUserData: React.PropTypes.object
  }

  static contextTypes = {
    i18n: React.PropTypes.object,
    formatPatterns: React.PropTypes.object,
    dateTimePattern: React.PropTypes.string,
    simPublicUrl: React.PropTypes.string,
    simUrl: React.PropTypes.string,
    supplierUrl: React.PropTypes.string,
    httpResponseHandler: React.PropTypes.func,
  }

  state = { tabKey: 1 }

  componentWillUnmount() {
    this.ignoreAjax = true;
  }

  setCookieData(cname, cvalue, exdays) {
    let date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  i18n = this.context.i18n.register('SupplierApplicationForm', locales)

  _confirmLeaveChangesUnsaved = () => window.confirm(this.i18n.getMessage('ApplicationFormConfirmation.unsavedChanges'))

  isShowWelcomePage = () => true;

  handleDirtyState = event => {
    this.isDirty = event.isDirty;
  }

  handleSupplierUpdate = newSupplier => {
    this.isDirty = false;
    let wasSupplierlessUser = !this.props.currentUserData.supplierid;

    request.put(`${simPublicUrl}/user/users/${this.props.currentUserData.id}?tokenUpdate=true`, { supplierId: newSupplier.supplierId, status: 'onboarding' })
      .set('Content-Type', 'application/json')
      .then(() => {
        this.props.dispatch(setCurrentUserInfo({
          ...this.props.currentUserData,
          supplierid: newSupplier.supplierId,
          supplierName: newSupplier.supplierName,
          companyRole: 'selling',
          showWelcomePage: true
        }));

        if (wasSupplierlessUser) {
          browserHistory.push(`${window.simContextPath}/welcome`);
        }
      })
      .catch((err) => console.log('err', err));
  }

  handleLogout = function() {
    console.log("logout has no handler");
  };

  handleSelect = tabKey => {
    if (!this.isDirty || this._confirmLeaveChangesUnsaved()) {
      this.isDirty = false;
      this.setState({ tabKey });
    }
  }

  handleUnauthorized = () => {
    browserHistory.push(`${window.simContextPath}/login`);
  };

  render() {
    let userInfo = this.props.currentUserData;

    if (!userInfo.supplierid) {
      return <p>Supplier Does not exist! Please register first</p>
    }

    let company = (
      <I18nBundle locale={userInfo.locale} formatInfos={this.context.formatPatterns}>
        <SupplierEditor
          key='company'
          onUnauthorized={this.handleUnauthorized}
          readOnly={false /* TODO: only supplier creator can edit his supplier info */}
          actionUrl={this.context.supplierUrl}
          supplierId={userInfo.supplierid}
          supplierName={userInfo.supplierName}
          locale={userInfo.locale}
          username={userInfo.id}
          dateTimePattern={this.context.dateTimePattern}
          onChange={this.handleDirtyState}
          onUpdate={this.handleSupplierUpdate}
          onLogout={this.handleLogout}
        />
      </I18nBundle>
    );

    let address = (
      <I18nBundle locale={userInfo.locale} formatInfos={this.context.formatPatterns}>
        <SupplierAddressEditor
          key='address'
          onUnauthorized={this.handleUnauthorized}
          dateTimePattern={this.context.dateTimePattern}
          readOnly={false /* TODO: only supplier creator can edit his supplier info */}
          actionUrl={this.context.supplierUrl}
          supplierId={userInfo.supplierid}
          locale={userInfo.locale}
          username={userInfo.username}
          onChange={this.handleDirtyState}
        />
      </I18nBundle>
    );

    let contact = (
      <I18nBundle locale={userInfo.locale} formatInfos={this.context.formatPatterns}>
        <SupplierContactEditor
          key='contact'
          onUnauthorized={this.handleUnauthorized}
          dateTimePattern={this.context.dateTimePattern}
          readOnly={false /* TODO: only supplier creator can edit his supplier info */}
          actionUrl={this.context.supplierUrl}
          supplierId={userInfo.supplierid}
          locale={userInfo.locale}
          username={userInfo.username}
          onChange={this.handleDirtyState}
        />
      </I18nBundle>
    );

    return (
      <div>
        <Tabs id="supplierTabs" activeKey={this.state.tabKey} onSelect={this.handleSelect}>
          <Tab eventKey={1} title={this.i18n.getMessage('ApplicationFormTab.company')}>
            {company}
          </Tab>
          <Tab eventKey={2} title={this.i18n.getMessage('ApplicationFormTab.address')}>
            {address}
          </Tab>
          <Tab eventKey={3} title={this.i18n.getMessage('ApplicationFormTab.contact')}>
            {contact}
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
