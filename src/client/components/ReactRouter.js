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
import Dashboard from './Dashboard';
import Statistics from './Statistics';
import CreateInvoice from './CreateInvoice';
import ReviewItems from './ReviewItems';
import Rfq from './Rfq';
import CreateInvoiceFromOrder from './CreateInvoiceFromOrder';
import Monitor from './Monitor';
import Partners from './Partners';
import Products from './Products';
import SuccessRegistration from './Notifications/SuccessRegistration';
import SuccessConfirmation from './Notifications/SuccessConfirmation';
import AccessDenied from './Errors/AccessDenied';
import AuthenticationService from './../service/AuthenticationService';
import Provider from 'react-redux/lib/components/Provider';
import createStore from 'redux/lib/createStore';
import httpResponseHandler from './../httpResponseHandler';
import ApplicationContext from './ApplicationContext';
import simRootApplicationReducer from './../redux/reducers.js';
import axios from 'axios';
import SupplierApplicationForm from './SupplierApplicationForm';

let authenticationService = new AuthenticationService({
  httpResponseHandler: httpResponseHandler
});

let store = createStore(simRootApplicationReducer, {
  currentUserInfo: {
    locale: 'en',
    username: undefined,
    supplierId: undefined
  }
});

function beforeSupplierComponentEnterInterceptor(nextState, replace, done) {
  authenticationService.isAuthenticated().then(response => {
    if (!response.data.username) {
      replace(`${window.simContextPath}/login`);
    }
    done();
  }).catch(() => {
    replace(`${window.simContextPath}/login`);
    done();
  });
}

function beforeDashboardComponentEnterInterceptor(nextState, replace, done) {
  authenticationService.currentUserInfo(true).then(response => {
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
        <IndexRedirect to={`${window.simContextPath}/supplierInformation`}/>
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
        <Route path={window.simRootContextPath} component={MainLayout}>
          <Route
            onEnter={beforeSupplierComponentEnterInterceptor}
            path={`${window.simContextPath}/supplierInformation`}
            getComponent={(location, cb) => SupplierApplicationForm(location, cb)}
          />
          <Route
            onEnter={beforeDashboardComponentEnterInterceptor}
            path={`${window.simContextPath}/statistics`}
            component={Statistics}
          />
          <Route
            onEnter={beforeDashboardComponentEnterInterceptor}
            path={`${window.simContextPath}/createInvoice`}
            component={CreateInvoice}
          />
          <Route
            onEnter={beforeDashboardComponentEnterInterceptor}
            path={`${window.simContextPath}/reviewItems`}
            component={ReviewItems}
          />
          <Route
            onEnter={beforeDashboardComponentEnterInterceptor}
            path={`${window.simContextPath}/rfq`}
            component={Rfq}
          />
          <Route
            onEnter={beforeDashboardComponentEnterInterceptor}
            path={`${window.simContextPath}/partners`}
            component={Partners}
          />
          <Route
            onEnter={beforeDashboardComponentEnterInterceptor}
            path={`${window.simContextPath}/products`}
            component={Products}
          />
          <Route
            onEnter={beforeDashboardComponentEnterInterceptor}
            path={`${window.simContextPath}/createInvoiceFromOrder`}
            component={CreateInvoiceFromOrder}
          />
          <Route
            onEnter={beforeDashboardComponentEnterInterceptor}
            path={`${window.simContextPath}/monitor`}
            component={Monitor}
          />
          <Route
            onEnter={beforeDashboardComponentEnterInterceptor}
            path={`${window.simContextPath}/dashboard`}
            component={Dashboard}
          />
          <Route path={`${window.simContextPath}/accessDenied`} component={AccessDenied}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('rootApplicationComponent'));

