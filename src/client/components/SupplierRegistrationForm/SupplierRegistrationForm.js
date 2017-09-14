// TODO: need to remove unnecessary code.
// TODO: agree

import React from 'react';
import request from 'superagent-bluebird-promise';
import locales from './i18n/locales.js'
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import connect from 'react-redux/lib/components/connect';
import { setCurrentUserInfo } from './../../redux/actions.js';
import I18nBundle from '../Widgets/components/I18nBundle';
import OnboardingUserService from '../../service/OnboardingUserService';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

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
    httpResponseHandler: React.PropTypes.func,
    router: React.PropTypes.object
  }

  state = {
    isLoading: true,
    onboardData: {}
  }

  componentWillMount() {
    let serviceRegistry = (service) => ({ url: `${this.context.simPublicUrl}/supplier` });
    const SupplierRegistrationEditor = serviceComponent({
      serviceRegistry,
      serviceName: 'supplier' ,
      moduleName: 'supplier-registration',
      jsFileName: 'registration-bundle'
    });

    this.externalComponents = { SupplierRegistrationEditor };
    this.setState({ i18n: this.context.i18n.register('SupplierRegistrationForm', locales) });
  }

  componentDidMount() {
    console.log('----currentUserData----', this.props.currentUserData);
    /*
      calling IDPRO API to get onboarding user's data and saving in cookie
    */

    const onboardDataPromise = new OnboardingUserService(this.context.simUrl)
      .getOnboardingUserData(this.props.currentUserData.id)

    onboardDataPromise.then(onboardData => {
      this.setCookieData('ONBOARDING_DATA', JSON.stringify(onboardData), 5);

      this.setState({
        isLoading: false,
        onboardData: onboardData
      })
    }).catch(err => this.context.httpResponseHandler(err));
  }

  componentWillUnmount() {
    this.ignoreAjax = true;
  }

  componentWillReceiveProps(nextProps, nextContext){
    if(this.state.i18n && this.state.i18n.locale && nextContext.i18n.locale != this.state.i18n.locale){
      this.setState({ i18n: nextContext.i18n.register('SupplierRegistrationForm', locales) });
    }
  }

  setCookieData(cname, cvalue, exdays) {
    let date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  i18n = this.context.i18n.register('SupplierRegistrationForm', locales)

  _confirmLeaveChangesUnsaved = () => window.confirm(this.i18n.getMessage('ApplicationFormConfirmation.unsavedChanges'))

  handleDirtyState = event => {
    this.isDirty = event.isDirty;
  }

  handleSupplierUpdate = newSupplier => {
    this.isDirty = false;
    let wasSupplierlessUser = !this.props.currentUserData.supplierid;

    this.props.dispatch(setCurrentUserInfo({
      ...this.props.currentUserData,
      supplierid: newSupplier.supplierId,
      supplierName: newSupplier.supplierName,
      companyRole: 'selling',
      showWelcomePage: true
    }));

    if (wasSupplierlessUser) {
      this.context.router.push('/welcome');
    }
  }

  handleLogout = function() {
    console.log("logout has no handler");
  };

  handleUnauthorized = () => {
    this.context.router.push('/login');
  };

  handleGetSupplierData = () => {
    const { onboardData } = this.state;

    if (!onboardData) return null;

    console.log(onboardData);

    if (!onboardData.tradingPartnerDetails) return null;

    return {
      supplierName: onboardData.tradingPartnerDetails.name,
      cityOfRegistration: onboardData.tradingPartnerDetails.city,
      countryOfRegistration: onboardData.tradingPartnerDetails.country,
      taxIdentificationNo: onboardData.tradingPartnerDetails.taxIdentNo,
      vatIdentificationNo: onboardData.tradingPartnerDetails.vatIdentNo,
      dunsNo: onboardData.tradingPartnerDetails.dunsNo,
      commercialRegisterNo: onboardData.tradingPartnerDetails.commercialRegisterNo
    };
  }

  userData = () => {
    const userInfo = this.props.currentUserData;

    return {
      id: userInfo.id,
      firstName: userInfo.firstname,
      lastName: userInfo.lastname,
      email: userInfo.email
    };
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    const { SupplierRegistrationEditor } = this.externalComponents;

    let userInfo = this.props.currentUserData;

    if (userInfo.supplierid) {
      return <p>{this.state.i18n.getMessage('RegistrationForm.supplierExists')}</p>
    }

    return (
      <SupplierRegistrationEditor
        key='company'
        onUnauthorized={this.handleUnauthorized}
        actionUrl={this.context.simPublicUrl}
        locale={this.context.i18n.locale}
        username={userInfo.id}
        dateTimePattern={this.context.dateTimePattern}
        onChange={this.handleDirtyState}
        onUpdate={this.handleSupplierUpdate}
        onLogout={this.handleLogout}
        supplier={this.handleGetSupplierData() || {}}
        user={this.userData()}
      />
    )
  }
}

function injectState(store) {
  return {
    currentUserData: store.currentUserData
  };
}

export default connect(injectState)(SupplierRegistrationForm);
