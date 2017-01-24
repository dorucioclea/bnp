import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRedirect from 'react-router/lib/IndexRedirect';
import browserHistory from 'react-router/lib/browserHistory';
import MainLayout from './MainLayout';
import RegistrationLayout from './RegistrationLayout';
import LoginPage from './LoginPage';
import Registration from './Registration';
import SellerDashboard from './SellerDashboard';
import BuyerDashboard from './BuyerDashboard';
import Welcome from './Welcome';
import Settings from './Settings';
import ServiceConfiguration from './ServiceConfiguration';
import InvoiceCreate from './InvoiceCreate';
import InvoiceApproval from './InvoiceApproval';
import InvoiceInspect from './InvoiceInspect';
import ShippingNotice from './ShippingNotice';
import OtherDocuments from './OtherDocuments';
import CompanyInformation from './CompanyInformation';
import InspectRfQ from './InspectRfQ';
import ViewRfQs from './ViewRfQs';
import CreateRfQ from './CreateRfQ';
import OnboardingDashboard from './OnboardingDashboard';
import SupplierDirectory from './SupplierDirectory';
import SupplierRating from './SupplierRating';
import Products from './Products';
import DisputeManagement from './DisputeManagement';
import PoDownload from './PoDownload';
import EInvoice from './EInvoice';
import OrderConfirmation from './OrderConfirmation';
import OrderHistory from './OrderHistory';
import SuccessRegistration from './Notifications/SuccessRegistration';
import SuccessConfirmation from './Notifications/SuccessConfirmation';
import AccessDenied from './Errors/AccessDenied';
import AuthenticationService from './../service/AuthenticationService';
import Provider from 'react-redux/lib/components/Provider';
import createStore from 'redux/lib/createStore';
import httpResponseHandler from './../httpResponseHandler';
import ApplicationContext from './ApplicationContext';
import simRootApplicationReducer from './../redux/reducers.js';
import { setCurrentUserInfo } from './../redux/actions.js';
import axios from 'axios';
import SupplierApplicationForm from './SupplierApplicationForm';

const BUYING_ROLE = 'buying';
const SELLING_ROLE = 'selling';

function getInitialCurrentUserInfo() {
  return {
    locale: 'en',
    username: undefined,
    supplierId: undefined
  };
}

let store = createStore(simRootApplicationReducer, {
  currentUserInfo: getInitialCurrentUserInfo()
});

let authenticationService = new AuthenticationService({
  httpResponseHandler,
  resetCurrentUserInfo: () => store.dispatch(setCurrentUserInfo(getInitialCurrentUserInfo()))
});

function beforeSupplierComponentEnterInterceptor(nextState, replace, done) {
  authenticationService.isAuthenticated().then(response => {
    console.log('===== beforeSupplierComponentEnterInterceptor', JSON.stringify(response.data));
    if (!response.data.username) {
      replace(`${window.simContextPath}/login`);
    }
    done();
  }).catch(() => {
    replace(`${window.simContextPath}/login`);
    done();
  });
}

function beforeRegularComponentEnterInterceptor(nextState, replace, done) {
  // TODO: prevent suppliers from viewing buyer-only pages and vice-versa.
  authenticationService.currentUserInfo(true).then(response => {
    console.log('===== beforeRegularComponentEnterInterceptor', JSON.stringify(response.data));
    let currentUserInfo = response.data.currentUserInfo;

    if (!currentUserInfo.username) {
      replace(`${window.simContextPath}/login`);
    } else if (!currentUserInfo.supplierId) {
      replace(`${window.simContextPath}/supplierInformation`);
    }

    done();
  }).catch(err => {
    replace(`${window.simContextPath}/login`);
    done();
  });
}

function beforeDashboardComponentEnterInterceptor(nextState, replace, done) {
  authenticationService.currentUserInfo(true).then(response => {
    console.log('===== beforeDashboardComponentEnterInterceptor', JSON.stringify(response.data));
    let currentUserInfo = response.data.currentUserInfo;

    if (!currentUserInfo.username) {
      replace(`${window.simContextPath}/login`);
    } else if (!currentUserInfo.supplierId) {
      replace(`${window.simContextPath}/supplierInformation`);
    } else if (currentUserInfo.companyRole === BUYING_ROLE) {
      replace(`${window.simContextPath}/buyerDashboard`);
    } else if (currentUserInfo.companyRole === SELLING_ROLE) {
      replace(`${window.simContextPath}/sellerDashboard`);
    }

    done();
  }).catch(err => {
    replace(`${window.simContextPath}/login`);
    done();
  });
}

function logout(nextState, replace, cb) {
  authenticationService.logout();
  cb();
}

// may be can be deleted
axios.interceptors.response.use(response => {
  return response;
}, errors => {
  if (errors.status === 401) {
    browserHistory.push(`${window.simContextPath}/login`);
    return null;
  }
  return Promise.reject(errors);
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route
        path={window.simRootContextPath}
        context={{ authenticationService: authenticationService }} component={ApplicationContext}
      >
        <IndexRedirect to={`${window.simContextPath}/dashboard`}/>
        <Route path={`${window.simContextPath}/login`} component={LoginPage}/>
        <Route path={`${window.simContextPath}/logout`} onEnter={logout}/>
        <Route path={window.simRootContextPath} component={RegistrationLayout}>
          <Route path={`${window.simContextPath}/registration`} component={Registration}/>
          <Route path={`${window.simContextPath}/registration/success`} component={SuccessRegistration}/>
          <Route
            path={`${window.simContextPath}/registration/confirmation/:verificationToken`}
            component={SuccessConfirmation}
          />
        </Route>
        <Route
          onEnter={beforeRegularComponentEnterInterceptor}
          path={`${window.simContextPath}/welcome`}
          component={Welcome}
        />
        <Route path={window.simRootContextPath} component={MainLayout}>
          <Route
            onEnter={beforeSupplierComponentEnterInterceptor}
            path={`${window.simContextPath}/supplierInformation`}
            getComponent={(location, cb) => SupplierApplicationForm(location, cb)}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/invoiceApproval`}
            component={InvoiceApproval}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/invoiceInspect`}
            component={InvoiceInspect}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/invoiceCreate`}
            component={InvoiceCreate}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/shippingNotice`}
            component={ShippingNotice}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/otherDocuments`}
            component={OtherDocuments}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/companyInformation`}
            component={CompanyInformation}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/serviceConfiguration`}
            component={ServiceConfiguration}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/createRfQ`}
            component={CreateRfQ}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/viewRfQs`}
            component={ViewRfQs}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/inspectRfQ`}
            component={InspectRfQ}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/supplierDirectory`}
            component={SupplierDirectory}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/supplierRating`}
            component={SupplierRating}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/disputeManagement`}
            component={DisputeManagement}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/products`}
            component={Products}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/orderHistory`}
            component={OrderHistory}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/orderConfirmation`}
            component={OrderConfirmation}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/onboardingDashboard`}
            component={OnboardingDashboard}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/settings`}
            component={Settings}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/poDownload`}
            component={PoDownload}
          />
          <Route
            onEnter={beforeDashboardComponentEnterInterceptor}
            path={`${window.simContextPath}/dashboard`}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/buyerDashboard`}
            component={BuyerDashboard}
          />
          <Route
            onEnter={beforeRegularComponentEnterInterceptor}
            path={`${window.simContextPath}/sellerDashboard`}
            component={SellerDashboard}
          />
          <Route path={`${window.simContextPath}/accessDenied`} component={AccessDenied}/>
          <Route path={`${window.simContextPath}/einvoice`} component={EInvoice}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('rootApplicationComponent'));
