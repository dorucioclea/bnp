import React from 'react';
import connect from 'react-redux/lib/components/connect';
import SidebarMenu from '../SidebarMenu';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

class MainLayout extends React.Component {
  static propTypes = {
    currentUserInfo: React.PropTypes.object
  }

  render() {
    let isOnboarding = this.props.currentUserInfo && !this.props.currentUserInfo.supplierId;
    let showSidebarMenu = this.props.currentUserInfo && this.props.currentUserInfo.supplierId;

    let header = isOnboarding ?
      (
        <Navbar
          collapseOnSelect={true}
          fluid={true}
          style={{
            height: '13%',
            backgroundColor: 'white !important',
            padding: '2% 2% 0 0'
          }}
        >
          <Navbar.Header>
            <Navbar.Brand style={{ lineHeight: '45px', height: '90px' }}>
              <img
                src={`${window.simContextPath}/img/OC-logo-BN-orange-gray.svg`}
                style={{ position: 'absolute', width: '15%', top: '15%', left: '0%' }}
              />
              <p
                style={{
                  display: 'table',
                  position: 'absolute',
                  top: '10%',
                  left: '30%',
                  fontSize: '200%',
                  color: '#67707C',
                  opacity: '0.75'
                }}
              >
                Welcome to OpusCapita
                <br/>
                Supplier Onboarding
              </p>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight={true} style={{ paddingRight: '31px' }}>
              <NavDropdown eventKey={3} title="English" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>German</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      ) :
      (
        <a className="applogo visible-md visible-sm visible-xs" href="http://www.opuscapita.com/">
          <img src={`${window.simContextPath}/img/oc-logo-rgb.svg`} />
        </a>
      );

    let footer = isOnboarding ?
      (
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
              <img src={`${window.simContextPath}/img/oc-logo-white.svg`} style={{ width: '40%', marginTop: '10%' }} />
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right" style={{ marginRight: '0.1%', marginTop: '1.5%' }}>
            <li style={{ color: 'white' }}>
              &copy; OpusCapita 2017
            </li>
          </ul>
        </footer>
      ) :
      (
        <footer>
          <div className="container copyright text-center">
            &copy; 2001 &mdash; 2016&nbsp;&nbsp;
            <a href="http://www.opuscapita.com/">
              <img
                src={`${window.simContextPath}/img/oc-logo-rgb.svg`}
                style={{ height: '1.2em' }}
              />
            </a>
          </div>
        </footer>
      );

    if (isOnboarding) {
      return (
        <section
          className="content"
          style={{
            backgroundImage: `url("${window.simContextPath}/img/service-config-welcome.jpg")`,
            maxWidth: '100%',
            backgroundSize: '100%',
            minHeight: '100vh'
          }}
        >
          {header}
          <div className="content-wrap" style={{ padding: '0px !important' }}>
            {this.props.children}
          </div>
          {footer}
        </section>
      );
    }

    return (
      <div style={{ minHeight: '100vh' }}>
        {showSidebarMenu && <SidebarMenu/>}
        <div className="container-fluid" style={{ paddingLeft: '250px' }}>
        <section className="content" style={{ overflow: 'visible' }}>
          {header}
          <div className="content-wrap">
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
    currentUserInfo: store.currentUserInfo
  };
}

export default connect(injectState)(MainLayout);
