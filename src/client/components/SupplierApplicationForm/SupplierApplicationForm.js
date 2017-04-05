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
import connect from 'react-redux/lib/components/connect';
import { setCurrentUserInfo } from './../../redux/actions.js';
import I18nBundle from '../Widgets/components/I18nBundle';
import ApplicationFormService from '../../service/ApplicationFormService';
import OnboardingUserService from '../../service/OnboardingUserService';

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
    isLoading: true
  }

  setCookieData(cname,cvalue,exdays) {
    var date = new Date();
    date.setTime(date.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + date.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  componentDidMount() {
    console.log('----currentUserInfo----', this.props.currentUserInfo);
    new ApplicationFormService(this.context.simUrl).getCountryList().
      then(countryList => this.ignoreAjax || this.setState({
        isLoading: false,
        countries: countryList.
          map(({ countryId: id, countryName: name }) => ({ id, name })).
          sort((a, b) => a.name.localeCompare(b.name))
      })).
      catch(err => this.ignoreAjax || this.context.httpResponseHandler(err));
    
    /*
      calling IDPRO API to get onboarding user's data and saving in cookie
    */
    new OnboardingUserService(this.context.simUrl).getOnboardingUserData(this.props.currentUserInfo.username).
      then(userDetail => {
        if(!this.ignoreAjax){
          this.setCookieData('ONBOARDING_DATA', JSON.stringify(userDetail.onboardData), 5);
          this.setState({
            isLoading: false,
            onboardData: userDetail.onboardData
          });
        }
      }).
      catch(err => this.ignoreAjax || this.context.httpResponseHandler(err));

    console.log('this.state', this.state);
  }

  componentWillUnmount() {
    this.ignoreAjax = true;
  }

  i18n = this.context.i18n.register('SupplierApplicationForm', locales)
  _confirmLeaveChangesUnsaved = () => window.confirm(this.i18n.getMessage('ApplicationFormConfirmation.unsavedChanges'))
  isShowWelcomePage = () => true;

  handleDirtyState = event => {
    this.isDirty = event.isDirty;
  }

  handleSupplierUpdate = newSupplier => {
    this.isDirty = false;
    let wasSupplierlessUser = !this.props.currentUserInfo.supplierId;

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
    if (this.state.isLoading) {
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
          onboardData={this.state.onboardData}
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
    currentUserInfo: store.currentUserInfo
  };
}

export default connect(injectState)(SupplierApplicationForm);
