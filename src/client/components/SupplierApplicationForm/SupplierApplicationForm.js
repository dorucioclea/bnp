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
import ApplicationFormService from '../../service/ApplicationFormService';
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

  state = {
    countries: [],
    key: 1,
    isLoading: true
  }

  componentDidMount() {
    console.log('----currentUserData----', this.props.currentUserData);

    const countriesPromise = new ApplicationFormService(this.context.simUrl).getCountryList()
      .then(countryList => {
        return countryList.map(({ countryId: id, countryName: name }) => ({ id, name }))
          .sort((a, b) => a.name.localeCompare(b.name))
      })
      .catch(err => this.context.httpResponseHandler(err));

    countriesPromise.then(countries => {
      this.setState({
        isLoading: false,
        countries
      })
    });

    console.log('this.state', this.state);
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
          companyRole: newSupplier.companyRole,
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
    if (this.state.isLoading) {
      return null;
    }

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
          countries={this.state.countries}
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
          supplierId={userInfo.supplierid}
          locale={userInfo.locale}
          username={userInfo.username}
          onChange={this.handleDirtyState}
        />
      </I18nBundle>
    );

    return (
      <div>
        <Tabs id="supplierTabs" activeKey={this.state.key} onSelect={this.handleSelect}>
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
    currentUserData: store.currentUserData
  };
}

export default connect(injectState)(SupplierApplicationForm);
