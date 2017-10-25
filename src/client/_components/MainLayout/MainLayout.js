import React from 'react';
import connect from 'react-redux/lib/components/connect';
import { HeaderMenu, SidebarMenu } from '@opuscapita/react-menus';
import NotificationSystem from 'react-notification-system';
import { MenuItem, Dropdown, Glyphicon } from 'react-bootstrap';
import locales from './i18n/locales.js';

class MainLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeLanguage: 'English'
    }
  }

  static propTypes = {
    currentUserData: React.PropTypes.object
  }

  static contextTypes = {
    i18n: React.PropTypes.object,
    formatPatterns: React.PropTypes.object,
    dateTimePattern: React.PropTypes.string
  }

  static childContextTypes = {
    showNotification: React.PropTypes.func,
    hideNotification: React.PropTypes.func,
    clearNotifications: React.PropTypes.func
  }

  getChildContext(){
    return {
      showNotification: this.showNotification,
      hideNotification: this.hideNotification,
      clearNotifications: this.clearNotifications
    };
  }

  showNotification = (message, level, autoDismiss = 5, dismissible = true, position = 'tc') => {
    if(!level){
      level = 'info'
    }
    return this.renderNotification({
      message,
      level,
      position,
      autoDismiss,
      dismissible
    });
  }

  hideNotification = (notification) => {
    return this.removeNotification(notification);
  }

  clearNotifications = () => {
    return this.refs.notificationSystem.clearNotifications();
  }

  componentWillMount() {
    this.setState({ i18n: this.context.i18n.register('MainLayout', locales) });
  }

  componentWillReceiveProps(nextProps, nextContext){
    if(this.state.i18n && this.state.i18n.locale && nextContext.i18n.locale != this.state.i18n.locale){
      this.setState({ i18n: nextContext.i18n.register('MainLayout', locales) });
    }
  }

  renderNotification = (notification) => {
    if(this.refs.notificationSystem && notification && notification.message && notification.message.length > 0)
      {
        const translatedMessage = notification.message;
        return this.refs.notificationSystem.addNotification({ ...notification, message: translatedMessage });
      }

    return false;
  }

  removeNotification = (notification) => {
    if(this.refs.notificationSystem && notification)
        return this.refs.notificationSystem.removeNotification(notification);

    return false;
  }

  renderHeader(isOnboarding) {
    if (isOnboarding) {
      return (
        <nav
          className="navbar navbar-default"
          style={{
            height: "100px",
            backgroundColor: "white",
            padding: "2% 2% 0 0"
          }}
        >
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <img
                src={`${window.simUrl}/static/jcatalog/img/OC-logo-BN-orange-gray.svg`}
                style={{
                  position: "absolute",
                  width: "15%",
                  top: "8%"
                }}
              />
              <p
                style={{
                  display: "table",
                  position: "absolute",
                  top: "10%",
                  left: "38%",
                  fontSize: "200%",
                  color: "#67707C",
                  opacity: "0.75"
                }}
              >
                {this.state.i18n.getMessage('MainLayout.header.welcome')}
                <br/>
                {this.state.i18n.getMessage('MainLayout.header.supplierOnboarding')}
              </p>
            </div>
          </div>
        </nav>
      )
    }

    return (
      <a className="applogo visible-md visible-sm visible-xs" href="http://www.opuscapita.com/">
        <img src={`${window.simContextPath}/img/oc-logo-rgb.svg`} />
      </a>
    )
  }

  renderFooter(isOnboarding) {
    if (isOnboarding) {
      return (
        <footer
          style={{
            position: 'absolute',
            bottom: '0',
            width: '100%',
            height: '10%',
            backgroundColor: '#ec6608',
          }}
        >
          <ul className="nav navbar-nav navbar-left">
            <li>
              <img src={`${window.simContextPath}/static/jcatalog/img/oc-logo-white.svg`} style={{ width: '40%', marginTop: '10%' }} />
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right" style={{ marginRight: '0.1%', marginTop: '1.5%' }}>
            <li style={{ color: 'white' }}>
              &copy; OpusCapita 2017
            </li>
          </ul>
        </footer>
      )
    }

    return (
      <footer>
        <div className="container copyright text-center">
          &copy; 2001 &mdash; {new Date().getFullYear()}&nbsp;&nbsp;
          <a href="http://www.opuscapita.com/">
            <img
              src={`${window.simContextPath}/img/oc-logo-rgb.svg`}
              style={{ height: '1.2em' }}
            />
          </a>
        </div>
      </footer>
    )
  }

  render() {
    const { currentUserData } = this.props;
    const isOnboarding = currentUserData && (!currentUserData.supplierid && !currentUserData.customerid);
    const showSidebarMenu = currentUserData && (currentUserData.supplierid || currentUserData.customerid);
    const header = this.renderHeader(isOnboarding);
    const footer = this.renderFooter(isOnboarding);

    if (isOnboarding) {
      return (
        <div style={{ height: "100%" }}>
          <section
            className="content"
            style={{
              backgroundImage: `url("${window.simContextPath}/static/jcatalog/img/service-config-welcome.jpg")`,
              maxWidth: '100%',
              backgroundSize: '100%',
              minHeight: '100vh'
            }}
          >
            {header}
            <div className="content-wrap" style={{ padding: '0px !important' }}>
              <div className="container" id="container">
                <div
                  className="box col-xs-12"
                  style={{
                    // width: "87%",
                    // marginTop: "2%",
                    // // marginLeft: "10%",
                    // padding: "3%",
                    // textAlign: "left",
                    // zIndex: 3,
                    // backgroundColor: "white"
                  }}
                  id="bluebox"
                >
                  <form className="form-horizontal">
                    {this.props.children}
                  </form>
                </div>
              </div>
            </div>
            </section>
            {footer}
        </div>
      );
    }

    return (
      <div style={{ minHeight: '100vh' }}>
        {showSidebarMenu && <SidebarMenu isBuyer={currentUserData.customerid} />}
        <div className="container-fluid">
        <section className="content" style={{ overflow: 'visible' }}>
          <HeaderMenu currentUserData={currentUserData} />
          {header}
          <NotificationSystem ref="notificationSystem"/>
          <div className="content-wrap" style={{ paddingLeft: '250px' }}>
            {this.props.children}
          </div>
            {footer}
          </section>
        </div>
      </div>
    )
  }
}

function injectState(store) {
  return {
    currentUserData: store.currentUserData
  };
}

export default connect(injectState)(MainLayout);
