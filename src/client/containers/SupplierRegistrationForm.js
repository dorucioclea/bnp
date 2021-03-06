import React from 'react';
import { Components } from '@opuscapita/service-base-ui';
import request from 'superagent-bluebird-promise';
import translations from './i18n';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import { OnboardingUserService } from '../api';

class SupplierRegistrationForm extends Components.ContextComponent {

  state = {
    onboardData : null
  }

  constructor(props, context)
  {
      super(props);

      context.i18n.register('SupplierRegistrationForm', translations);

      this.SupplierRegistrationEditor = context.loadComponent({
        serviceName: 'supplier',
        moduleName: 'supplier-registration',
        jsFileName: 'registration-bundle'
      });

      this.onboardingUserServiceApi = new OnboardingUserService();
  }

  componentDidMount() {
    this.onboardingUserServiceApi.getOnboardingUserData(this.context.userData.id)
        .then(onboardData => this.setState({ onboardData }))
        .catch(e => console.log(e.message));
  }

  handleDirtyState = event => {
    this.isDirty = event.isDirty;
  }

  handleSupplierUpdate = newSupplier => {
    this.isDirty = false;
    const wasSupplierlessUser = !this.context.userData.supplierid;

    if (wasSupplierlessUser) {
      this.context.refreshUserData(true).then(() => this.context.router.push('/bnp/connections'))
        .catch(e => this.context.showNotification(e.message, 'error', 10));
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
      name: onboardData.tradingPartnerDetails.name,
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

    const userData = this.context.userData;

    if (userData.supplierid) {
      return <div className="alert alert-danger">{this.context.i18n.getMessage('SupplierRegistrationForm.supplierExists')}</div>;
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
