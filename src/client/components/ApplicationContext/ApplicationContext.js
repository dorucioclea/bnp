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

      this.props.route.context.authenticationService.currentUserInfo(forceReload).then(response => {
        let currentUserInfo = response.data.currentUserInfo || {
          locale: cookie.load('LANGUAGE_COOKIE_KEY'),
          user: null,
          username: null,
          supplierId: null
        };

        if (this.props.currentUserInfo.supplierId) {
          // supplierId is known but server might have obsolete info
          // (the user could assign/change his supplier after initial login).
          currentUserInfo.supplierId = this.props.currentUserInfo.supplierId;
          currentUserInfo.supplierName = this.props.currentUserInfo.supplierName;
          currentUserInfo.companyRole = this.props.currentUserInfo.companyRole;
        }

        if (JSON.stringify(currentUserInfo) !== JSON.stringify(this.props.currentUserInfo)) {
          this.props.dispatch(setCurrentUserInfo(currentUserInfo));
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
      httpResponseHandler: httpResponseHandler,
      authenticationService: this.props.route.context.authenticationService
    };
  }

  componentDidMount() {
    this._fetchDefaultLocale();
    this._fetchApplicationUrl();
    this._fetchFormatPatterns();
  }

  _fetchDefaultLocale = () => {
    if (!cookie.load('LANGUAGE_COOKIE_KEY')) {
      this.props.route.context.authenticationService.defaultLocale().then(response => {
        if (!cookie.load('LANGUAGE_COOKIE_KEY')) {
          cookie.save('LANGUAGE_COOKIE_KEY', response.data, {
            path: window.simRootContextPath
          });
          this.setState({
            locale: response.data
          });
        }
      });
    }
  };

  _fetchApplicationUrl = () => {
    if (!this.state.simUrl) {
      this.props.route.context.authenticationService.applicationUrl().then(response => {
        if (!this.state.simUrl) {
          // this.simUrl = response.data;
          this.setState({
            simUrl: response.data
          });
        }
      });
    }
  };

  _fetchFormatPatterns = () => {
    if (!this.state.formatPatterns) {
      this.props.route.context.authenticationService.formatPatterns().then(response => {
        if (!this.state.formatPatterns) {
          // this.formatPatterns = response.data.formatPatterns;
          this.setState({
            formatPatterns: response.data.formatPatterns
          });
        }
      });
    }
  };

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
      // this.dateTimePattern = this.formatPatterns[cookie.load('LANGUAGE_COOKIE_KEY').toString()].dateTimePattern;
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
      <div style={{height: "100%"}}>
        {children}
      </div>
    );
  }
}

function injectState({ currentUserInfo }) {  // Transform the current Redux store state into the component's props.
  return { currentUserInfo };
}

export default connect(injectState)(ApplicationContext);
