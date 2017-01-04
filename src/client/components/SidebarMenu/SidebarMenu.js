import React from 'react';

export default class SidebarMenu extends React.Component {
  render() {
    return (
      <section className="sidebar">
        <nav className="navbar navbar-default">
          <div className="nav-background"></div>
          <div className="navbar-header hidden-md">
            <a className="navbar-brand visible-lg" href="#">
              <img src="../../img/oc-logo-white.svg" style={{ height: '1.4em' }}/>
            </a>
          </div>
          <ul className="nav navbar-nav">
            <li>
              <a href="#">
                Campaigns
              </a>
            </li>
          </ul>
          <ul className="nav navbar-nav">
            <li>
              <a href="#">
                Suppliers
              </a>
            </li>
          </ul>
        </nav>
      </section>
    )
  }
}

