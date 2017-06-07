import httpResponseHandler from '../../httpResponseHandler';
import React from 'react';
import connect from 'react-redux/lib/components/connect';
import I18nManager from 'opuscapita-i18n/lib/utils/I18nManager';
import locales from './../i18n/locales';
import { setCurrentUserInfo } from './../../redux/actions.js';
import validateMessages from './i18n';
import { formatPatterns } from '../../../../formatPatterns.config.json'
import request from 'superagent-bluebird-promise';

class ApplicationContext extends React.Component {
  constructor(props) {
    super(props);

    const locale = 'en';
    const i18n = new I18nManager(locale, validateMessages, formatPatterns);
    i18n.register('Common', locales);

    this.state = {
      i18n: i18n,
      locale: locale,
      formatPatterns: formatPatterns,
      dateTimePattern: formatPatterns[locale].dateTimePattern
    }
  }

  static propTypes = {
    currentUserData: React.PropTypes.object
  };

  static childContextTypes = {
    i18n: React.PropTypes.object,
    formatPatterns: React.PropTypes.object,
    dateTimePattern: React.PropTypes.string,
    simUrl: React.PropTypes.string,
    simPublicUrl: React.PropTypes.string,
    httpResponseHandler: React.PropTypes.func,
    locale: React.PropTypes.string,
    setLocale: React.PropTypes.func
  };

  getChildContext() {
    return {
      i18n: this.state.i18n,
      formatPatterns: this.state.formatPatterns,
      dateTimePattern: this.state.dateTimePattern,
      simUrl: window.simUrl,
      simPublicUrl: window.simPublicUrl,
      httpResponseHandler,
      locale: this.props.currentUserData.locale,
      setLocale: this.setLocale
    };
  }

  setLocale = (locale) => {
    let i18n = new I18nManager(locale, validateMessages, formatPatterns);
    this.props.dispatch(setCurrentUserInfo({
      ...this.props.currentUserData,
     locale: locale
    }));
    this.setState({
      ...this.state,
      i18n: i18n
    }, console.log(this.state.i18n))
    request.post('/refreshIdToken').set('Content-Type', 'application/json').then(() => {
      request.get('/user/users/current/profile')
          .set('Content-Type', 'application/json')
          .then(res => console.log(JSON.parse(res.text)))
    });
  }

  render() {
    let { children } = this.props;
    return (
      <div style={{ height: "100%" }}>
        {children}
      </div>
    );
  }
}

function injectState({ currentUserData }) {  // Transform the current Redux store state into the component's props.
  return { currentUserData };
}

export default connect(injectState)(ApplicationContext);
