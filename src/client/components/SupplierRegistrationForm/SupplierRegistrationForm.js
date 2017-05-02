// TODO: need to remove unnecessary code.
// TODO: agree

import React from 'react';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';
import locales from './i18n/locales.js'
import browserHistory from 'react-router/lib/browserHistory';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import { SupplierRegistrationEditor } from 'supplier';
import connect from 'react-redux/lib/components/connect';
import { setCurrentUserInfo } from './../../redux/actions.js';
import I18nBundle from '../Widgets/components/I18nBundle';
import OnboardingUserService from '../../service/OnboardingUserService';
class SupplierRegistrationForm extends React.Component {

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
    key: 1,
    isLoading: true
  }

  componentDidMount() {
    console.log('----currentUserData----', this.props.currentUserData);
    /*
      calling IDPRO API to get onboarding user's data and saving in cookie
    */

    const onboardDataPromise = new OnboardingUserService(this.context.simUrl)
      .getOnboardingUserData(this.props.currentUserData.id)
      .then(userDetail => userDetail.onboardData)
      .catch(err => this.context.httpResponseHandler(err));

    onboardDataPromise.then(onboardData => {
      this.setCookieData('ONBOARDING_DATA', JSON.stringify(onboardData), 5);

      this.setState({
        isLoading: false,
        onboardData
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

  i18n = this.context.i18n.register('SupplierRegistrationForm', locales)

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

  handleSelect = key => {
    if (!this.isDirty || this._confirmLeaveChangesUnsaved()) {
      this.isDirty = false;
      this.setState({ key });
    }
  }

  handleUnauthorized = () => {
    browserHistory.push(`${window.simContextPath}/login`);
  };

  handleGetSupplierData = () => {
    const { onboardData } = this.state;

    if (!onboardData) return null;

    console.log(onboardData);

    return _.merge({}, {
      supplierName: onboardData.tradingPartnerDetails.name,
      cityOfRegistration: onboardData.tradingPartnerDetails.city,
      countryOfRegistration: onboardData.tradingPartnerDetails.country,
      taxId: onboardData.tradingPartnerDetails.taxIdentNo,
      vatRegNo: onboardData.tradingPartnerDetails.vatIdentNo,
      dunsNo: onboardData.tradingPartnerDetails.dunsNo,
      registrationNumber: onboardData.tradingPartnerDetails.commercialRegisterNo
    });
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    let userInfo = this.props.currentUserData;

    if (userInfo.supplierid) {
      return <p>Supplier Already Exist!</p>
    }

    return (
      <I18nBundle locale={userInfo.locale} formatInfos={this.context.formatPatterns}>
        <SupplierRegistrationEditor
          key='company'
          onUnauthorized={this.handleUnauthorized}
          actionUrl={this.context.supplierUrl}
          locale={userInfo.locale}
          username={userInfo.id}
          dateTimePattern={this.context.dateTimePattern}
          onChange={this.handleDirtyState}
          onUpdate={this.handleSupplierUpdate}
          onLogout={this.handleLogout}
          supplier={this.handleGetSupplierData() || {}}
        />
      </I18nBundle>
    )
  }
}

function injectState(store) {
  return {
    currentUserData: store.currentUserData
  };
}

export default connect(injectState)(SupplierRegistrationForm);
