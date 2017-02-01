import React from 'react';
import connect from 'react-redux/lib/components/connect';
import SidebarMenu from '../SidebarMenu';
import HeaderMenu from '../Header';
import { MenuItem, Dropdown, Glyphicon } from 'react-bootstrap';

class MainLayout extends React.Component {
  static propTypes = {
    currentUserInfo: React.PropTypes.object
  }

  render() {
    let isOnboarding = this.props.currentUserInfo && !this.props.currentUserInfo.supplierId;
    let showSidebarMenu = this.props.currentUserInfo && this.props.currentUserInfo.supplierId;

    let header = isOnboarding ?
      (
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
              src="/img/OC-logo-BN-orange-gray.svg"
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
              Welcome to OpusCapita<br/> Supplier Onboarding
            </p>
          </div>


          <ul className="nav navbar-nav navbar-right">
            <Dropdown id="dropdown-custom-1">
              <Dropdown.Toggle>
                <Glyphicon glyph="star" />
                English
              </Dropdown.Toggle>
              <Dropdown.Menu className="super-colors">
                <MenuItem eventKey="1">Suomi</MenuItem>
                <MenuItem eventKey="2">German</MenuItem>
                <MenuItem eventKey="3" active={true}>English</MenuItem>
                <MenuItem divider={true} />
                <MenuItem eventKey="4">Separated link</MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
        </div>
      </nav>
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
        <div style={{ height: "100%" }}>
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
        {showSidebarMenu && <SidebarMenu/>}
        <div className="container-fluid">
        <section className="content" style={{ overflow: 'visible' }}>
          <HeaderMenu/>
          {header}
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
    currentUserInfo: store.currentUserInfo
  };
}

export default connect(injectState)(MainLayout);
