import React from 'react';
import locales from './i18n/locales.js';

class RegistrationLayout extends React.Component {
  static contextTypes = {
    i18n: React.PropTypes.object,
    authenticationService: React.PropTypes.object
  };

  i18n = this.context.i18n.register('RegistrationLayout', locales);

  render() {
    return (
      <div
        style={{
          background: `url(${window.simContextPath}/img/oc-bnp-bg.png) top center`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          minHeight: '100vh'
        }}
      >
        <div className="container">
          <form className="form-horizontal">
            <div className="row" style={{ marginTop: '3em' }}>
              <div className="clearfix col-md-6 col-md-offset-3"
                style={{
                  background: '#fff',
                  boxShadow: '0px 0px 20px rgba(0,0,0,.25)',
                  padding: '1em 0 6em'
                }}
              >
                <div className="col-xs-12">
                  {this.props.children}
                  <footer>
                    <div className="copyright text-center">
                      &copy; 2001 &mdash; 2016&nbsp;&nbsp;
                      <a href="http://www.opuscapita.com/">
                        <img
                          src={`${window.simContextPath}/img/oc-logo-rgb.svg`}
                          style={{ height: '1.2em' }}
                        />
                      </a>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default RegistrationLayout;
