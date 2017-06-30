import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRedirect from 'react-router/lib/IndexRedirect';
import browserHistory from 'react-router/lib/browserHistory';
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
    replace(`${window.simContextPath}/supplierRegistration`);
  } else if (currentUserData.companyRole === BUYING_ROLE || currentUserData.customerid) {
    replace(`${window.simContextPath}/buyerDashboard`);
  } else if (currentUserData.companyRole === SELLING_ROLE || currentUserData.supplierid) {
    replace(`${window.simContextPath}/sellerDashboard`);
  }
}

function handleShowWelcomePage(nextState, replace) {
  const currentUserData = getCurrentUserInfo();
  const welcomePagePath = `${window.simContextPath}/welcome`;

  if (currentUserData.showWelcomePage && nextState.location.pathname !== welcomePagePath) {
    replace(welcomePagePath);
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route
        path={window.simRootContextPath}
        component={ApplicationContext}
        onEnter={handleShowWelcomePage}
      >
        <IndexRedirect to={`${window.simContextPath}/dashboard`}/>
        <Route
          path={`${window.simContextPath}/welcome`}
          component={Welcome}
        />
        <Route path={window.simRootContextPath} component={MainLayout}>
          <Route
            path={`${window.simContextPath}/supplierInformation`}
            getComponent={(location, cb) => SupplierApplicationForm(location, cb)}
          />
          <Route
            path={`${window.simContextPath}/supplierRegistration`}
            getComponent={(location, cb) => SupplierRegistrationForm(location, cb)}
          />
          <Route
            path={`${window.simContextPath}/invoiceApproval`}
            component={InvoiceApproval}
          />
          <Route
            path={`${window.simContextPath}/invoiceInspect`}
            component={InvoiceInspect}
          />
          <Route
            path={`${window.simContextPath}/invoice/create`}
            component={InvoiceCreate}
          />
          <Route
            path={`${window.simContextPath}/invoice/create/po(/:POId)`}
            component={InvoiceCreate}
          />
          <Route
            path={`${window.simContextPath}/invoice/create/pdf(/:step)`}
            component={InvoiceCreate}
          />
          <Route
            path={`${window.simContextPath}/shippingNotice`}
            component={ShippingNotice}
          />
          <Route
            path={`${window.simContextPath}/otherDocuments`}
            component={OtherDocuments}
          />
          <Route
            path={`${window.simContextPath}/companyInformation`}
            component={CompanyInformation}
          />
          <Route
            path={`${window.simContextPath}/createRfQ`}
            component={CreateRfQ}
          />
          <Route
            path={`${window.simContextPath}/viewRfQs`}
            component={ViewRfQs}
          />
          <Route
            path={`${window.simContextPath}/inspectRfQ`}
            component={InspectRfQ}
          />
          <Route
            path={`${window.simContextPath}/supplierDirectory`}
            component={SupplierDirectory}
          />
          <Route
            path={`${window.simContextPath}/supplierRating`}
            component={SupplierRating}
          />
          <Route
            path={`${window.simContextPath}/disputeManagement`}
            component={DisputeManagement}
          />
          <Route
            path={`${window.simContextPath}/products`}
            component={Products}
          />
          <Route
            path={`${window.simContextPath}/orderHistory`}
            component={OrderHistory}
          />
          <Route
            path={`${window.simContextPath}/orderConfirmation`}
            component={OrderConfirmation}
          />
          <Route
            path={`${window.simContextPath}/orderInspect`}
            component={OrderInspect}
          />
          <Route
            path={`${window.simContextPath}/settings`}
            component={Settings}
          />
          <Route
            path={`${window.simContextPath}/poDownload`}
            component={PoDownload}
          />
          <Route
            path={`${window.simContextPath}/dashboard`}
            onEnter={companyRoleInterceptor}
          />
          <Route
            path={`${window.simContextPath}/buyerDashboard`}
            component={BuyerDashboard}
          />
          <Route
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
