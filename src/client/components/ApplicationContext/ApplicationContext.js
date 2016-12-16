import httpResponseHandler from '../../httpResponseHandler';
import React from 'react';
import connect from 'react-redux/lib/components/connect';
import { setCurrentUserInfo } from './../../redux/actions.js';
import cookie from 'react-cookie';
import I18nManager from 'opuscapita-i18n/lib/utils/I18nManager';
import locales from './../i18n/locales';

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
    currentUserInfo: {
      locale: cookie.load('LANGUAGE_COOKIE_KEY'),
      user: null,
      username: null,
      supplierId: null
    }
  }

  getChildContext() {
    if (cookie.load('LANGUAGE_COOKIE_KEY')) {
      this.props.route.context.authenticationService.currentUserInfo().then(response => {
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
          let currentUserInfo = this.state.currentUserInfo;
          currentUserInfo.locale = response.data;
          this.setState({
            currentUserInfo: currentUserInfo
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
      let validateMessages = require('./i18n').default;
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
      location.pathname === `${window.simContextPath}/supplierInformation` && !currentUserInfo.user ||
      !this.state.currentUserInfo.locale ||
      !this.state.simUrl ||
      !this.i18n
    ) {
      return null;
    }

    return (
      <div>
        {children}
      </div>
    );
  }
}

function injectState(store) {
  return {
    currentUserInfo: store.currentUserInfo
  };
}

export default connect(injectState)(ApplicationContext);
