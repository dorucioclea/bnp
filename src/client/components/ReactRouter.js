import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import { browserHistory, useRouterHistory } from 'react-router';
import { createHistory } from 'history'
import IndexRedirect from 'react-router/lib/IndexRedirect';
import ajax from 'superagent-bluebird-promise';
import MainLayout from './MainLayout';
import SellerDashboard from './SellerDashboard';
import BuyerDashboard from './BuyerDashboard';
import Welcome from './Welcome';
import Settings from './Settings';
import InvoiceCreate from './InvoiceCreate';
import InvoiceApproval from './InvoiceApproval';
import InvoiceInspect from './InvoiceInspect';
import ShippingNotice from './ShippingNotice';
import OtherDocuments from './OtherDocuments';
import CompanyInformation from './CompanyInformation';
import InspectRfQ from './InspectRfQ';
import ViewRfQs from './ViewRfQs';
import CreateRfQ from './CreateRfQ';
import SupplierDirectory from './SupplierDirectory';
import SupplierRating from './SupplierRating';
import Products from './Products';
import DisputeManagement from './DisputeManagement';
import PoDownload from './PoDownload';
import EInvoice from './EInvoice';
import OrderConfirmation from './OrderConfirmation';
import OrderHistory from './OrderHistory';
import OrderInspect from './OrderInspect';
import AccessDenied from './Errors/AccessDenied';
import Provider from 'react-redux/lib/components/Provider';
import createStore from 'redux/lib/createStore';
import ApplicationContext from './ApplicationContext';
import simRootApplicationReducer from './../redux/reducers.js';
import SupplierApplicationForm from './SupplierApplicationForm';
import SupplierRegistrationForm from './SupplierRegistrationForm';


const BUYING_ROLE = 'buying';
const SELLING_ROLE = 'selling';
const ADMIN_ROLE = 'admin';

const history = useRouterHistory(createHistory)({ basename: '/bnp'});

function getInitialCurrentUserInfo() {
  let initialState =  window.currentUserData;
  initialState.locale = 'en';

  return initialState;
}

function getCurrentUserInfo() {
  return window.currentUserData;
}

const store = createStore(
  simRootApplicationReducer,
  { currentUserData: getInitialCurrentUserInfo() },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function companyRoleInterceptor(nextState, replace) {
  const currentUserData = getCurrentUserInfo();

  if (!currentUserData.supplierid && !currentUserData.customerid && currentUserData.roles.indexOf(ADMIN_ROLE) < 0) {
    replace('/supplierRegistration');
  } else if (currentUserData.companyRole === BUYING_ROLE || currentUserData.customerid) {
    replace('/buyerDashboard');
  } else if (currentUserData.companyRole === SELLING_ROLE || currentUserData.supplierid) {
    replace('/sellerDashboard');
  }
}

function handleShowWelcomePage(nextState, replace, callback) {
  // TODO: When exactly shall we show the Welcome page?
  //       Right now it is shown (if UserProfile.showWelcomePage == true) once per window due to the usage of sessionStorage.

  if (getCurrentUserInfo().supplierid && !sessionStorage.checked4WelcomePage) {
      sessionStorage.checked4WelcomePage = true;

      ajax.get('/user/users/current/profile')
      .then(res => {
        var userProfile = JSON.parse(res.text);
        var showWelcomePage = userProfile && userProfile.showWelcomePage;

        const welcomePagePath = '/welcome';
        if (showWelcomePage && nextState.location.pathname !== welcomePagePath) {
          replace(welcomePagePath);
        }
        callback();
      })
  }
  else {
    callback();
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route
        path="/"
        component={ApplicationContext}
        onEnter={handleShowWelcomePage}
      >
        <IndexRedirect to={'/dashboard'}/>
        <Route
          path={'/welcome'}
          component={Welcome}
        />
    <Route path="/" component={MainLayout}>
          <Route
            path={'/supplierInformation'}
            getComponent={(location, cb) => SupplierApplicationForm(location, cb)}
          />
          <Route
            path={'/supplierRegistration'}
            getComponent={(location, cb) => SupplierRegistrationForm(location, cb)}
          />
          <Route
            path={'/invoiceApproval'}
            component={InvoiceApproval}
          />
          <Route
            path={'/invoiceInspect'}
            component={InvoiceInspect}
          />
          <Route
            path={'/invoice/create'}
            component={InvoiceCreate}
          />
          <Route
            path={'/invoice/create/po(/:POId)'}
            component={InvoiceCreate}
          />
          <Route
            path={'/invoice/create/pdf(/:step)'}
            component={InvoiceCreate}
          />
          <Route
            path={'/shippingNotice'}
            component={ShippingNotice}
          />
          <Route
            path={'/otherDocuments'}
            component={OtherDocuments}
          />
          <Route
            path={'/companyInformation'}
            component={CompanyInformation}
          />
          <Route
            path={'/createRfQ'}
            component={CreateRfQ}
          />
          <Route
            path={'/viewRfQs'}
            component={ViewRfQs}
          />
          <Route
            path={'/inspectRfQ'}
            component={InspectRfQ}
          />
          <Route
            path={'/supplierDirectory'}
            component={SupplierDirectory}
          />
          <Route
            path={'/supplierRating'}
            component={SupplierRating}
          />
          <Route
            path={'/disputeManagement'}
            component={DisputeManagement}
          />
          <Route
            path={'/products'}
            component={Products}
          />
          <Route
            path={'/orderHistory'}
            component={OrderHistory}
          />
          <Route
            path={'/orderConfirmation'}
            component={OrderConfirmation}
          />
          <Route
            path={'/orderInspect'}
            component={OrderInspect}
          />
          <Route
            path={'/settings'}
            component={Settings}
          />
          <Route
            path={'/poDownload'}
            component={PoDownload}
          />
          <Route
            path={'/dashboard'}
            onEnter={companyRoleInterceptor}
          />
          <Route
            path={'/buyerDashboard'}
            component={BuyerDashboard}
          />
          <Route
            path={'/sellerDashboard'}
            component={SellerDashboard}
          />
          <Route path={'/accessDenied'} component={AccessDenied}/>
          <Route path={'/einvoice'} component={EInvoice}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('rootApplicationComponent'));
