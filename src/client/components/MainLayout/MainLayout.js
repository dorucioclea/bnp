import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import connect from 'react-redux/lib/components/connect';
import locales from './i18n/locales.js'
import './styles/main-layout.css';
import { description, version } from './../../../../package.json';

class MainLayout extends React.Component {
  static propTypes = {
    currentUserInfo: React.PropTypes.object
  }

  static contextTypes = {
    i18n: React.PropTypes.object,
    currentUserInfo: React.PropTypes.object,
    authenticationService: React.PropTypes.object
  }

  i18n = this.context.i18n.register('MainLayout', locales)

  handleLogoutClick = () => {
    clearInterval(this.checkSessionInterval);
    this.context.authenticationService.logout();
  }

  handleCustomerMenuItemClick = (e) => {
    browserHistory.push(`${window.simContextPath}/${e.target.id}`);
  }

  handleHomeClick = () => {
    browserHistory.push(`${window.simContextPath}/supplierInformation`);
  }

  handleLoginModalClick = () => {
    window.open(`${window.simContextPath}/login`);
  }

  render() {
    let header = (
      <header className='navbar navbar-default navbar-main-menu'>
        <div className='navbar-header pull-left'>
          <div className='navbar-brand'>
            <img src={`${window.simContextPath}/oc-logo-rgb.svg`} alt='App Logo'/>
          </div>
        </div>
      </header>
    );

    return (
      <div>
        {header}
        <div className='container'>
          {this.props.children}
        </div>

        <footer>
          <div className='container copyright text-center'>
            <a target="_blank" href="http://www.opuscapita.com/">
              <img
                style={{ height: '1.2em' }}
                src={`${window.simContextPath}/oc-logo-rgb.svg`}
                alt='App Logo'
              />
            </a>
            <div>
              <small>
                {description} {version}
              </small>
            </div>
            &copy; {this.i18n.getMessage('MainLayoutLabel.jcatalogActivityTime')}&nbsp;
            <a href='http://www.opuscapita.com/' target='_blank'>
              {this.i18n.getMessage('MainLayoutLabel.jcatalog')}
            </a>
          </div>
        </footer>
      </div>
    )
  }
}

function injectState(store) {
  return {
    currentUserInfo: store.currentUserInfo
  };
}

export default connect(injectState)(MainLayout);
