import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';

export default class SidebarMenu extends React.Component {
  state = {
    oldOpenMenuName: null,
    currentOpenMenuName: null
  };

  hideMenu = () => {
    if (this.state.currentOpenMenuName) {
      this.setState({
        oldOpenMenuName: this.state.currentOpenMenuName,
        currentOpenMenuName: null
      });
    } else if (this.state.oldOpenMenuName) {
      this.setState({ oldOpenMenuName: null });
    }
  };

  componentDidMount() {
    document.body.addEventListener('click', this.hideMenu, false);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.hideMenu, false);
  }

  mainMenuWithSubmenuClick(menuName, e) {
    e.preventDefault();

    if (this.state.oldOpenMenuName !== menuName) {
      this.setState({ currentOpenMenuName: menuName });
    }
  }

  handleDashboardClick(e) {
    e.preventDefault();
    browserHistory.push(`${window.simContextPath}/dashboard`);
  }

  handleSuppliersClick(e) {
    e.preventDefault();
    browserHistory.push(`${window.simContextPath}/supplierInformation`);
  }

  handleStatisticsClick(e) {
    e.preventDefault();
    browserHistory.push(`${window.simContextPath}/statistics`);
  }

  handleReviewItemsClick(e) {
    e.preventDefault();
    browserHistory.push(`${window.simContextPath}/reviewItems`);
  }

  handleCreateInvoiceClick(e) {
    e.preventDefault();
    browserHistory.push(`${window.simContextPath}/createInvoice`);
  }

  handleProductsClick(e) {
    e.preventDefault();
    browserHistory.push(`${window.simContextPath}/products`);
  }

  handlePoDownloadClick(e) {
    e.preventDefault();
    browserHistory.push(`${window.simContextPath}/poDownload`);
  }

  handleCreateInvoiceFromOrderClick(e) {
    e.preventDefault();
    browserHistory.push(`${window.simContextPath}/createInvoiceFromOrder`);
  }

  handleRfqClick(e) {
    e.preventDefault();
    browserHistory.push(`${window.simContextPath}/rfq`);
  }

  handlePartnersClick(e) {
    e.preventDefault();
    browserHistory.push(`${window.simContextPath}/partners`);
  }

  handleMonitorClick(e) {
    e.preventDefault();
    browserHistory.push(`${window.simContextPath}/monitor`);
  }

  handleSettingsClick(e) {
    e.preventDefault();
    browserHistory.push(`${window.simContextPath}/settings`);
  }

  render() {
    return (
      <section className="sidebar" style={{ minHeight: '100vh', position: 'fixed', zIndex: 3 }}>
        <nav className="navbar navbar-default">
          <div className="nav-background"></div>
          <div className="navbar-header hidden-md">
            <a className="navbar-brand visible-lg" href="http://www.opuscapita.com/">
              <img src={`${window.simContextPath}/img/oc-logo-white.svg`} style={{ height: '1.4em' }}/>
            </a>
          </div>
          <ul className="nav navbar-nav">
            <li>
              <a href="#" onClick={this.handleDashboardClick}>
                <span className="oci oci-store"></span>
                Home
              </a>
            </li>

            <li>
              <a href="#" onClick={this.handleStatisticsClick}>
                <span className="oci oci-reports"></span>
                Statistics
              </a>
            </li>

            <li className={`dropdown${this.state.currentOpenMenuName === 'Invoice' && ' open' || ''}`}>
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.mainMenuWithSubmenuClick.bind(this, 'Invoice')}
              >
                <span className="oci oci-invoice"></span>
                Invoice <span className="badge">7</span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a href="#" onClick={this.handleReviewItemsClick}>
                    Review Items <span className="badge">7</span>
                  </a>
                </li>
                <li><a href="#" onClick={this.handleCreateInvoiceClick}>Create Invoice</a></li>
              </ul>
            </li>

            <li>
              <a href="#" onClick={this.handleProductsClick}>
                <span className="oci oci-products"></span>
                Products
              </a>
            </li>

            <li className={`dropdown${this.state.currentOpenMenuName === 'Orders' && ' open' || ''}`}>
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.mainMenuWithSubmenuClick.bind(this, 'Orders')}
              >
                <span className="oci oci-order"></span>
                Orders
              </a>
              <ul className="dropdown-menu">
                <li><a href="#" onClick={this.handlePoDownloadClick}>PO Download</a></li>
                <li><a href="#" onClick={this.handleCreateInvoiceFromOrderClick}>Create Invoice from Order</a></li>
              </ul>
            </li>

            <li>
              <a href="#" onClick={this.handleRfqClick}>
                <span className="oci oci-order-v2"></span>
                RFQ <span className="badge">18</span>
              </a>
            </li>

            <li>
              <a href="#" onClick={this.handlePartnersClick}>
                <span className="oci oci-supdirect"></span>
                Partners
              </a>
            </li>

            <li className={`dropdown${this.state.currentOpenMenuName === 'Onboarding' && ' open' || ''}`}>
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.mainMenuWithSubmenuClick.bind(this, 'Onboarding')}
              >
                <span className="oci oci-campaigns"></span>
                Onboarding
              </a>
              <ul className="dropdown-menu">
                <li><a href={`${window.simContextPath}/campaigns/`}>New Campaign</a></li>
                <li><a href="#" onClick={this.handleMonitorClick}>Monitor</a></li>
              </ul>
            </li>

            <li className={`dropdown bottom-aligned${this.state.currentOpenMenuName === 'Profile' && ' open' || ''}`}>
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.mainMenuWithSubmenuClick.bind(this, 'Profile')}
              >
                <span className="oci oci-user"></span>
                Profile
              </a>
              <ul className="dropdown-menu">
                <li className="user-image" style={{ textAlign: 'center' }}>
                  <img src={`${window.simContextPath}/img/user-image.jpg`}/>
                </li>
                <li className="dropdown-header">Logged in as</li>
                <li><a href="#" onClick={e => e.preventDefault()}>Andrew Murray</a></li>
                <li className="dropdown-header">Buying on Behalf of</li>
                <li><a href={this.handleSuppliersClick}>UserName</a></li>
                <li role="separator" className="divider"></li>
                <li className="dropdown-header">Support</li>
                <li><a href="#" onClick={e => e.preventDefault()}>Help</a></li>
                <li><a href="#" onClick={e => e.preventDefault()}>Report a Problem</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">Logout</a></li>
              </ul>
            </li>

            <li>
              <a href="#" onClick={this.handleSettingsClick}>
                <span className="oci oci-admin"></span>
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </section>
    )
  }
}

