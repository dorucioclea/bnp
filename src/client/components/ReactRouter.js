import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRedirect from 'react-router/lib/IndexRedirect';
import browserHistory from 'react-router/lib/browserHistory';
import Layout from './MainLayout';
import LoginPage from './LoginPage';
import Registration from './Registration';
import Dashboard from './Dashboard';
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
  authenticationService.isAuthenticated().then(response => {
    if (!response.data.username) {
      replace(`${window.simContextPath}/login`);
    } else if (!resonse.data.supplierId) {
      replace(`${window.simContextPath}/supplierInformation`);
    }
    done();
  }).catch(() => {
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
        <Route path={window.simRootContextPath} component={Layout}>
          <Route path={`${window.simContextPath}/registration`} component={Registration}/>
          <Route path={`${window.simContextPath}/registration/success`} component={SuccessRegistration}/>
          <Route path={`${window.simContextPath}/accessDenied`} component={AccessDenied}/>
          <Route
            path={`${window.simContextPath}/registration/confirmation/:verificationToken`}
            component={SuccessConfirmation}
          />
          <Route
            onEnter={beforeSupplierComponentEnterInterceptor}
            path={`${window.simContextPath}/supplierInformation`}
            getComponent={(location, cb) => require('./SupplierApplicationForm')(location, cb)}
          />
          <Route
            onEnter={beforeDashboardComponentEnterInterceptor}
            path={`${window.simContextPath}/dashboard`}
            component={Dashboard}
          />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('rootApplicationComponent'));

