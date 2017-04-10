import httpResponseHandler from '../../httpResponseHandler';
import React from 'react';
import connect from 'react-redux/lib/components/connect';
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
    httpResponseHandler: React.PropTypes.func
  };

  state = {}

  getChildContext() {

    return {
      i18n: this.i18n,
      formatPatterns: this.state.formatPatterns,
      dateTimePattern: this.state.dateTimePattern,
      simUrl: this.state.simUrl,
      supplierUrl: this.state.simSupplierUrl,
      httpResponseHandler
    };
  }


  componentWillUnmount() {
    this.ignoreAjax = true;
  }

  _initI18n = (language) => {
    if (
      (
        !this.i18n ||
        this.i18n.locale !== language
      ) &&
      this.state.formatPatterns
    ) {
      this.i18n = new I18nManager(language, validateMessages, this.state.formatPatterns);
      this.i18n.register('Common', locales);
      this.setState({
        dateTimePattern: this.state.formatPatterns[language].dateTimePattern
      });
    }
  };

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
