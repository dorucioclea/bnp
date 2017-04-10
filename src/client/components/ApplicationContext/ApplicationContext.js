import httpResponseHandler from '../../httpResponseHandler';
import React from 'react';
import connect from 'react-redux/lib/components/connect';
import I18nManager from 'opuscapita-i18n/lib/utils/I18nManager';
import locales from './../i18n/locales';
import validateMessages from './i18n';
import { formatPatterns } from '../../../../formatPatterns.config.json'

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
    currentUserInfo: React.PropTypes.object
  };

  static childContextTypes = {
    i18n: React.PropTypes.object,
    formatPatterns: React.PropTypes.object,
    dateTimePattern: React.PropTypes.string,
    simUrl: React.PropTypes.string,
    supplierUrl: React.PropTypes.string,
    httpResponseHandler: React.PropTypes.func
  };

  getChildContext() {
    return {
      i18n: this.state.i18n,
      formatPatterns: this.state.formatPatterns,
      dateTimePattern: this.state.dateTimePattern,
      simUrl: window.simUrl,
      supplierUrl: window.simSupplierUrl,
      httpResponseHandler
    };
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

function injectState({ currentUserInfo }) {  // Transform the current Redux store state into the component's props.
  return { currentUserInfo };
}

export default connect(injectState)(ApplicationContext);
