import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import request from 'superagent-bluebird-promise';
import translations from './i18n';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import { OnboardingUserService } from '../api';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

class SupplierRegistrationForm extends Components.ContextComponent {

  state = {
    onboardData : null
  }

  constructor(props, context)
  {
      super(props);

      context.i18n.register('SupplierRegistrationForm', translations);

      const serviceRegistry = (service) => ({ url: '/supplier' });

      this.SupplierRegistrationEditor = serviceComponent({
        serviceRegistry,
        serviceName: 'supplier' ,
        moduleName: 'supplier-registration',
        jsFileName: 'registration-bundle'
      });

      this.onboardingUserServiceApi = new OnboardingUserService();
  }

  componentDidMount() {
    this.onboardingUserServiceApi.getOnboardingUserData(this.context.userData.id)
        .then(onboardData => this.setState({ onboardData }))
        .catch(e => this.context.showNotification(e.message, 'error', 10));
  }

  handleDirtyState = event => {
    this.isDirty = event.isDirty;
  }

  handleSupplierUpdate = newSupplier => {
    this.isDirty = false;
    const wasSupplierlessUser = !this.context.userData.supplierid;

    if (wasSupplierlessUser) {
      this.context.router.push('/welcome');
    }
  }

  handleLogout = () => {
    this.context.logOutUser();
  };

  handleUnauthorized = () => {
    this.context.logOutUser(document.location.href);
  };

  getSupplierData = () => {
    const { onboardData } = this.state;

    if (!onboardData) return null;
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
    const { userData } = this.context;

    return {
      id: userData.id,
      firstName: userData.firstname,
      lastName: userData.lastname,
      email: userData.email
    };
  }

  render() {

    this.context.setPageTitle(this.context.i18n.getMessage('SupplierRegistrationForm.page.title'));

    if (!this.state.onboardData) {
      return null;
    }

    const userData = this.context.userData;

    if (userData.supplierid) {
      this.context.showNotification(this.context.i18n.getMessage('SupplierRegistrationForm.supplierExists'), 'error', 10);
      return null;
    }

    return (
      <this.SupplierRegistrationEditor
        key='company'
        onUnauthorized={this.handleUnauthorized}
        username={userData.id}
        onChange={this.handleDirtyState}
        onUpdate={this.handleSupplierUpdate}
        onLogout={this.handleLogout}
        supplier={this.getSupplierData() || {}}
        user={this.userData()}
      />
    )
  }
}


export default SupplierRegistrationForm;
