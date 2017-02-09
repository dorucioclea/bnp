import httpResponseHandler from '../../httpResponseHandler';
import React from 'react';
import connect from 'react-redux/lib/components/connect';
import { setCurrentUserInfo } from './../../redux/actions.js';
import cookie from 'react-cookie';
import I18nManager from 'opuscapita-i18n/lib/utils/I18nManager';
import locales from './../i18n/locales';
import validateMessages from './i18n';

class ApplicationContext extends React.Component {

  static propTypes = {
    currentUserInfo: React.PropTypes.object
  };

  static childContextTypes = {
    i18n: React.PropTypes.object,
    formatPatterns: React.PropTypes.object,
    dateTimePattern: React.PropTypes.string,
    simUrl: React.PropTypes.string,
    supplierUrl: React.PropTypes.string,
    httpResponseHandler: React.PropTypes.func,
    authenticationService: React.PropTypes.object
  };

  state = {
    locale: cookie.load('LANGUAGE_COOKIE_KEY')
  }

  getChildContext() {
    if (cookie.load('LANGUAGE_COOKIE_KEY')) {
      let forceReload = this.props.currentUserInfo.username === undefined;  // Quering the server for the 1st time.

      this.props.route.context.authenticationService.currentUserInfo(forceReload).then(currentUserInfo => {
        let userInfo = currentUserInfo || {
          locale: cookie.load('LANGUAGE_COOKIE_KEY'),
          user: null,
          username: null,
          supplierId: null
        };

        if (this.props.currentUserInfo.supplierId) {
          // supplierId is known but server might have obsolete info
          // (the user could assign/change his supplier after initial login).
          userInfo.supplierId = this.props.currentUserInfo.supplierId;
          userInfo.supplierName = this.props.currentUserInfo.supplierName;
          userInfo.companyRole = this.props.currentUserInfo.companyRole;
          userInfo.username = this.props.currentUserInfo.username
        }

        if (JSON.stringify(userInfo) !== JSON.stringify(this.props.currentUserInfo)) {
          this.props.dispatch(setCurrentUserInfo(userInfo));
        }
      });

      this._initI18n();
    }

    return {
      i18n: this.i18n,
      formatPatterns: this.state.formatPatterns,
      dateTimePattern: this.state.dateTimePattern,
      simUrl: this.state.simUrl,
      supplierUrl: this.state.simUrl + '/gateway/supplier',
      httpResponseHandler,
      authenticationService: this.props.route.context.authenticationService
    };
  }

  componentDidMount() {
    // Fetch default locale.
    if (!cookie.load('LANGUAGE_COOKIE_KEY')) {
      this.props.route.context.authenticationService.defaultLocale().then(locale => {
        // The cookie could be set by Login Page by now.
        if (!cookie.load('LANGUAGE_COOKIE_KEY') && !this.ignoreAjax) {
          cookie.save('LANGUAGE_COOKIE_KEY', locale, { path: window.simRootContextPath });
          this.setState({ locale });
        }
      });
    }

    // Fetch SIM application url.
    this.props.route.context.authenticationService.applicationUrl().
      then(simUrl => this.ignoreAjax || this.setState({ simUrl }));

    // Fetch format patterns.
    this.props.route.context.authenticationService.formatPatterns().
      then(formatPatterns => this.ignoreAjax || this.setState({ formatPatterns }));
  }

  componentWillUnmount() {
    this.ignoreAjax = true;
  }

  _initI18n = () => {
    if (
      (
        !this.i18n ||
        this.i18n.locale !== cookie.load('LANGUAGE_COOKIE_KEY')
      ) &&
      this.state.formatPatterns
    ) {
      this.i18n = new I18nManager(cookie.load('LANGUAGE_COOKIE_KEY'), validateMessages, this.state.formatPatterns);
      this.i18n.register('Common', locales);
      this.setState({
        dateTimePattern: this.state.formatPatterns[cookie.load('LANGUAGE_COOKIE_KEY').toString()].dateTimePattern
      });
    }
  };

  render() {
    let { location, currentUserInfo, children } = this.props;

    // TODO: check conditions.
    if (
      (
        location.pathname === `${window.simContextPath}/supplierInformation` ||
        location.pathname === `${window.simContextPath}/dashboard` ||
        location.pathname === `${window.simContextPath}/buyerDashboard` ||
        location.pathname === `${window.simContextPath}/sellerDashboard`
      ) &&
      !currentUserInfo.user ||
      !this.state.locale ||
      !this.state.simUrl ||
      !this.i18n
    ) {
      return null;
    }

    return (
      <div style={{ height: "100%" }}>
        {children}
      </div>
    );
  }
}

function injectState({ currentUserInfo }) {  // Transform the current Redux store state into the component's props.
  return { currentUserInfo };
}

export default connect(injectState)(ApplicationContext);
