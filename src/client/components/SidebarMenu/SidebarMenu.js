import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';

export default class SidebarMenu extends React.Component {
  handleSuppliersClick = e => {
    e.preventDefault();
    browserHistory.push(`${window.simContextPath}/supplierInformation`);
  }

  handleDashboardClick = e => {
    e.preventDefault();
    browserHistory.push(`${window.simContextPath}/dashboard`);
  }

  render() {
    return (
      <section className="sidebar" style={{ minHeight: '100vh', position: 'fixed' }}>
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
                Dashboard
              </a>
            </li>
            <li>
              <a href={`${window.simContextPath}/campaigns`}>
                Campaigns
              </a>
            </li>
          </ul>
          <ul className="nav navbar-nav">
            <li>
              <a href="#" onClick={this.handleSuppliersClick}>
                Suppliers
              </a>
            </li>
          </ul>
        </nav>
      </section>
    )
  }
}

