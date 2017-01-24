import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import SidebarMenu from '../SidebarMenu';
import browserHistory from 'react-router/lib/browserHistory';

export default class Welcome extends React.Component {
  render() {
    return (
      <div style={{ minHeight: '100vh' }}>
        <SidebarMenu activeMainMenuName="Company" activeSubMenuName="ServiceConfig" />
        <section
          className="content"
          style={{
            overflow: 'visible'
          }}
        >
          <div
            className="content-wrap"
            style={{
              background: `url(${window.simContextPath}/img/service-config-welcome.jpg) top center`,
              backgroundSize: 'cover',
              backgroundAttachment: 'fixed',
              minHeight: '100vh',
              padding: '0px !important'
            }}
          >
            <div className="container">
              <div
                style={{
                  backgroundColor: 'white',
                  zIndex: '1',
                  opacity: '0.75',
                  width: '82%',
                  height: '90%',
                  position: 'fixed',
                  display: 'inline',
                  left: '13.7%',
                  top: '5%',
                  margin: 'auto'
                }}
              >
              <div className="row" style={{ maxWidth: '100%' }}>
                <div className="col-md-6" style={{ margin: '10% 0 0 8%' }}>
                  <h1>Service Configuration</h1>
                  <p style={{ fontSize: '25px', marginTop: '5%' }}>
                    Thank you for choosing OpusCapita Business Network!
                    To integrate buyers, suppliers and other business partners
                    Business Network service needs to be conﬁgured.
                  </p>
                  <br/>
                  <p style={{ fontSize: '25px' }}>
                    This is a setup service to help you get up and running.
                    Setup service will involve information depending on
                    the services you select.
                  </p>
                  <br/>
                  <div className="form-submit text-right" style={{ marginTop: '25%' }}>
                    <a
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        browserHistory.push(`${window.simContextPath}/serviceConfigFlow`);
                      }}
                      style={{ zIndex: '3' }}
                    >
                      <Button bsStyle="primary" bsSize="lg">Start</Button>
                    </a>
                  </div>
                </div>
                <div className="col-md-4 col-md-offset-1" style={{ margin: '10% 8% 0 -15%' }}>
                  <img
                    src={`${window.simContextPath}/img/cog-lighter.svg`}
                    style={{
                      position: 'fixed',
                      zIndex: '2',
                      top: '2%',
                      left: '60%',
                      width: '50%',
                      opacity: '0.6'
                    }}
                  />
                  <img src={`${window.simContextPath}/img/cog.svg`} style={{ width: '250%' }} />
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>
      </div>
    )
  }
}
