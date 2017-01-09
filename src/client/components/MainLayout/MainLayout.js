import React from 'react';
import connect from 'react-redux/lib/components/connect';
import SidebarMenu from '../SidebarMenu';

class MainLayout extends React.Component {
  static propTypes = {
    currentUserInfo: React.PropTypes.object
  }

  static contextTypes = {
    currentUserInfo: React.PropTypes.object
  }

  render() {
    console.log('===== MAIN LAYOUT CURRENT USER INFO', this.props.currentUserInfo);
    return (
      <div style={{ minHeight: '100vh' }}>
        {this.props.currentUserInfo && this.props.currentUserInfo.supplierId && <SidebarMenu/>}
        <div className="container">
        <section className="content" style={{ overflow: 'visible' }}>
          <a className="applogo visible-md visible-sm visible-xs" href="http://www.opuscapita.com/">
            <img src={`${window.simContextPath}/img/oc-logo-rgb.svg`}/>
          </a>
          <div className="content-wrap">
            {this.props.children}
          </div>
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
