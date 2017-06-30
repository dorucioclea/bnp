import httpResponseHandler from '../../httpResponseHandler';
import React from 'react';
import connect from 'react-redux/lib/components/connect';
import I18nManager from 'opuscapita-i18n/lib/utils/I18nManager';
import locales from './../i18n/locales';
import { changeUserLanguage } from './../../redux/actions.js';
import validateMessages from './i18n';
import { formatPatterns } from '../../../../formatPatterns.config.json'
import request from 'superagent-bluebird-promise';

class ApplicationContext extends React.Component {
  constructor(props) {
    super(props);
    console.log("ReMounting : ", props.currentUserData.locale)
    const locale = props.currentUserData.locale;
    const i18n = new I18nManager(locale, validateMessages, formatPatterns);
    i18n.register('Common', locales);

    this.state = {
      i18n: i18n,
      locale: locale,
      formatPatterns: formatPatterns,
      dateTimePattern: formatPatterns[locale].dateTimePattern,
      datePattern: formatPatterns[locale].datePattern
    }
  }

  static propTypes = {
    currentUserData: React.PropTypes.object
  };

  static childContextTypes = {
    i18n: React.PropTypes.object,
    formatPatterns: React.PropTypes.object,
    dateTimePattern: React.PropTypes.string,
    datePattern: React.PropTypes.string,
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
      datePattern: this.state.datePattern,
      simUrl: window.simUrl,
      simPublicUrl: window.simPublicUrl,
      httpResponseHandler,
      locale: this.props.currentUserData.locale,
      setLocale: this.setLocale
    };
  }

  setLocale = (locale) => {
    let i18n = new I18nManager(locale, validateMessages, formatPatterns);
    this.props.dispatch(changeUserLanguage({
      ...this.props.currentUserData,
     locale: locale
    }));
    this.setState({
      i18n: i18n,
      locale: locale
    });

    return request.put('/user/users/' + this.props.currentUserData.id + '/profile')
    .set('Content-Type', 'application/json')
    .send({
      languageId: locale
    })
    .then(data => request.post('/refreshIdToken').set('Content-Type', 'application/json').promise());
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
