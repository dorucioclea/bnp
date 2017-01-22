// TODO: need to remove unnecessary code.

import React from 'react';
import locales from './i18n/locales.js'
import browserHistory from 'react-router/lib/browserHistory';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import {
  SupplierEditor,
  SupplierAddressEditor,
  SupplierContactEditor
} from 'supplier';
import axios from 'axios';
import connect from 'react-redux/lib/components/connect';
import { setCurrentUserInfo } from './../../redux/actions.js';
import I18nBundle from '../Widgets/components/I18nBundle';
import ApplicationFormService from '../../service/ApplicationFormService';

class SupplierApplicationForm extends React.Component {

  static propTypes = {
    currentUserInfo: React.PropTypes.object
  }

  static contextTypes = {
    i18n: React.PropTypes.object,
    formatPatterns: React.PropTypes.object,
    dateTimePattern: React.PropTypes.string,
    simUrl: React.PropTypes.string,
    supplierUrl: React.PropTypes.string,
    httpResponseHandler: React.PropTypes.func,
    authenticationService: React.PropTypes.object
  }

  state = {
    countries: [],
    key: 1,
    isLoaded: false  // A flag showing whether necessary inicial AJAX calls are returned.
  }

  componentDidMount() {
    this.applicationFormService = new ApplicationFormService(this.context.simUrl);

    this.applicationFormService.getCountryList().then(countries => this.setState({
      isLoaded: true,
      countries: countries.data.map(country => ({
        id: country.countryId,
        name: country.countryName
      })).sort((a, b) => a.name.localeCompare(b.name)),
    })).catch(err => axios.isCancel(err) || this.context.httpResponseHandler(err));
  }

  componentWillUnmount() {
    this.axiosAjax.cancel();
  }

  i18n = this.context.i18n.register('SupplierApplicationForm', locales)
  axiosAjax = axios.CancelToken.source()

  _confirmLeaveChangesUnsaved = () => window.confirm(this.i18n.getMessage('ApplicationFormConfirmation.unsavedChanges'))

  handleDirtyState = event => {
    this.isDirty = event.isDirty;
  }

  handleSupplierUpdate = newSupplier => {
    this.isDirty = false;
    let wasSupplierlessUser = !this.props.currentUserInfo.supplierId;
    console.log('===== SupplierApplicationForm newSupplier', JSON.stringify(newSupplier));

    this.props.dispatch(setCurrentUserInfo({
      ...this.props.currentUserInfo,
      supplierId: newSupplier.supplierId,
      supplierName: newSupplier.supplierName,
      companyRole: newSupplier.companyRole
    }));

    if (wasSupplierlessUser) {
      browserHistory.push(`${window.simContextPath}/dashboard`);
    }
  }

  handleLogout = () => this.context.authenticationService.logout()

  handleSelect = key => {
    if (!this.isDirty || this._confirmLeaveChangesUnsaved()) {
      this.isDirty = false;
      this.setState({ key });
    }
  }

  handleUnauthorized = () => {
    browserHistory.push(`${window.simContextPath}/login`);
  };

  render() {
    if (!this.state.isLoaded) {
      return null;
    }

    let userInfo = this.props.currentUserInfo;

    let company = (
      <I18nBundle locale={userInfo.locale} formatInfos={this.context.formatPatterns}>
        <SupplierEditor
          key='company'
          onUnauthorized={this.handleUnauthorized}
          readOnly={false /* TODO: only supplier creator can edit his supplier info */}
          actionUrl={this.context.supplierUrl}
          supplierId={userInfo.supplierId}
          supplierName={userInfo.supplierName}
          companyRole={userInfo.companyRole}
          locale={userInfo.locale}
          username={userInfo.username}
          dateTimePattern={this.context.dateTimePattern}
          countries={this.state.countries}
          onChange={this.handleDirtyState}
          onUpdate={this.handleSupplierUpdate}
          onLogout={this.handleLogout}
          isOnboarding={!userInfo.supplierId}
        />
      </I18nBundle>
    );

    if (!userInfo.supplierId) {
      return company;
    }

    let address = (
      <I18nBundle locale={userInfo.locale} formatInfos={this.context.formatPatterns}>
        <SupplierAddressEditor
          key='address'
          onUnauthorized={this.handleUnauthorized}
          dateTimePattern={this.context.dateTimePattern}
          readOnly={false /* TODO: only supplier creator can edit his supplier info */}
          actionUrl={this.context.supplierUrl}
          supplierId={userInfo.supplierId}
          locale={userInfo.locale}
          username={userInfo.username}
          countries={this.state.countries}
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
          supplierId={userInfo.supplierId}
          locale={userInfo.locale}
          username={userInfo.username}
          onChange={this.handleDirtyState}
        />
      </I18nBundle>
    );

    return (
      <div>
        <Tabs activeKey={this.state.key} onSelect={this.handleSelect}>
          <Tab eventKey={1} title={this.i18n.getMessage('ApplicationFormTab.company')}>
            {(this.state.key === 1) ? company : null}
          </Tab>
          <Tab eventKey={2} title={this.i18n.getMessage('ApplicationFormTab.address')}>
            {(this.state.key === 2) ? address : null}
          </Tab>
          <Tab eventKey={3} title={this.i18n.getMessage('ApplicationFormTab.contact')}>
            {(this.state.key === 3) ? contact : null}
          </Tab>
        </Tabs>
      </div>
    )
  }
}

function injectState(store) {
  return {
    currentUserInfo: store.currentUserInfo
  };
}

export default connect(injectState)(SupplierApplicationForm);
