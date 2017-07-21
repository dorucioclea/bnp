import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { SidebarMenu } from 'ocbesbn-react-components';
import browserHistory from 'react-router/lib/browserHistory';
import ajax from 'superagent-bluebird-promise';
import connect from 'react-redux/lib/components/connect';
import WelcomeCloseButton from './WelcomeCloseButton';
import locales from './i18n/locales';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showWelcomePage: true
    }

    ajax.get('/user/users/current/profile')
      .set('Content-Type', 'application/json')
      .then(res => JSON.parse(res.text))
      .then(res => this.setState({ showWelcomePage : res.showWelcomePage }));
  }

  static contextTypes = {
    i18n: React.PropTypes.object
  }

  getCustomerId = () => {
    return window.currentUserData && window.currentUserData.customerid;
  }

  handleShowWelcomePage = (event) => {
      return ajax.put('/user/users/current/profile')
        .set('Content-Type', 'application/json')
        .send({ showWelcomePage : !this.state.showWelcomePage })
        .then(() => this.setState({ showWelcomePage : !this.state.showWelcomePage }));
  }

  componentWillMount() {
    this.i18n = this.context.i18n.register('Welcome', locales);
  }

  componentWillReceiveProps(nextProps, nextContext){
    if(this.i18n && this.i18n.locale && nextContext.i18n.locale != this.i18n.locale){
      this.i18n = nextContext.i18n.register('Welcome', locales);
    }
  }

  render() {
    return (
      <div style={{ minHeight: '100vh' }}>
        <SidebarMenu activeMainMenuName="Company" activeSubMenuName="ServiceConfig" isBuyer={!!this.getCustomerId()} />
        <section
          className="content"
          style={{
            overflow: 'visible'
          }}
        >
          <div
            className="content-wrap"
            style={{
              background: `url(${window.simContextPath}/static/jcatalog/img/service-config-welcome.jpg) top center`,
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
                <WelcomeCloseButton/>
                <div className="row" style={{ maxWidth: '100%' }}>
                  <div className="col-md-6" style={{ margin: '10% 0 0 8%' }}>
                    <h1>{this.i18n.getMessage('strings.title')}</h1>
                    <p style={{ fontSize: '25px', marginTop: '5%' }}>
                     {this.i18n.getMessage('strings.mainMessage')}
                    </p>
                    <br/>
                    <p style={{ fontSize: '25px' }}>
                      {this.i18n.getMessage('strings.secondMessage')}
                    </p>
                    <br/>
                    <div className="form-submit text-right" style={{ marginTop: '25%', zIndex: '3' }}>
                      <label className="oc-check">
                        <input type="checkbox" value="1" checked={ this.state.showWelcomePage === false } onChange={ this.handleShowWelcomePage } />
                          {this.i18n.getMessage('strings.doNotShow')}
                      </label>
                      &nbsp;&nbsp;
                      <a
                        href="/einvoice-send"
                        onClick={e => {
                          browserHistory.push('/einvoice-send');
                        }}
                      >
                        <Button bsStyle="primary" bsSize="lg">Start</Button>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-4 col-md-offset-1" style={{ margin: '10% 8% 0 -15%' }}>
                    <img
                      src={`${window.simContextPath}/static/jcatalog/img/cog-lighter.svg`}
                      style={{
                        position: 'fixed',
                        zIndex: '2',
                        top: '2%',
                        left: '60%',
                        width: '50%',
                        opacity: '0.6'
                      }}
                    />
                    <img src={`${window.simContextPath}/static/jcatalog/img/cog.svg`} style={{ width: '250%' }} />
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

function injectState(store) {
  return {
    currentUserData: store.currentUserData
  };
}

export default connect(injectState)(Welcome);
