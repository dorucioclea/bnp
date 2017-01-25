import React from "react"
import { Button, MenuItem, Dropdown, Glyphicon } from 'react-bootstrap/lib';
import browserHistory from 'react-router/lib/browserHistory';
import cookie from 'react-cookie';
import locales from './i18n/locales.js'
import ServerError from './../Errors/ServerError';
import jQuery from 'jquery';

export default class LoginPage extends React.Component {

  static contextTypes = {
    i18n: React.PropTypes.object,
    authenticationService: React.PropTypes.object
  };

  state = {
    authenticationFailed: false,
    username: "",
    password: "",
    language: cookie.load('LANGUAGE_COOKIE_KEY'),
    formErrors: {
      password: null
    }
  }

  i18n = this.context.i18n.register('LoginPage', locales)

  languageTitle = {
    de: this.i18n.getMessage('LoginPageLanguage.deutsch'),
    en: this.i18n.getMessage('LoginPageLanguage.english')
  }

  componentDidMount() {
    jQuery('.nav-toggle').click(function() {
			jQuery('.nav-toggle').toggleClass('active');
			jQuery('.sidebar').toggleClass('active');
		});
  }

  handleFieldChange = (e) => {
    let newFieldValue = {};
    newFieldValue[e.target.id] = e.target.value;
    this.setState(newFieldValue);
  }

  handleLanguageSelect = eventKey => this.setState({
    language: eventKey
  })

  handleLoginClick = () => {
    cookie.save('LANGUAGE_COOKIE_KEY', this.state.language, {
      path: window.simRootContextPath,
      maxAge: 31536000
    });
    this.context.authenticationService.login({
      username: this.state.username,
      password: this.state.password,
      language: this.state.language
    }).catch(err => {
      if (err.status === 503) {
        this.setState({
          serverErrorMessage: this.i18n.getMessage('CommonMessages.systemError')
        });
      } else {
        this.setState({
          authenticationFailed: true
        });
      }
    });
  }

  handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      this.handleLoginClick();
    }
  }

  handleSignupClick = () => {
    browserHistory.push(`${window.simContextPath}/registration`);
  }

  handleCloseErrorPage = () => {
    this.setState({
      serverErrorMessage: null
    });
  }

  render() {
    if (this.state && this.state.serverErrorMessage) {
      return (
        <ServerError message={this.state.serverErrorMessage} onCloseErrorPage={this.handleCloseErrorPage}/>
      );
    } else {
      let privacyNotesArray = this.i18n.getMessage('LoginPageContent.privacyNote').split('${separation}');
      let loginErrorMessage;
      if (this.state.authenticationFailed) {
        loginErrorMessage = <div className="label label-danger">{this.i18n.getMessage('LoginPageError.badLogin')}</div>;
      }
      return (
        <div style={{height: "100%"}}>
          <section className="content" style={{
            backgroundImage: "url('/img/service-config-welcome.jpg')",
            maxWidth: "100%",
            backgroundSize: "100%"
          }}>

            <nav className="navbar navbar-default" style={{
              height: "100px",
        			backgroundColor: "white",
        			padding: "2% 2% 0 0"
            }}>
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <img src="/img/OC-logo-BN-orange-gray.svg" style={{
                    position: "absolute",
                    width: "15%",
                    top: "8%"
                  }} />
                  <p style={{
                    display: "table",
                    position: "absolute",
                    top: "10%",
                    left: "38%",
                    fontSize: "200%",
                    color: "#67707C",
                    opacity: "0.75"
                  }}>Welcome to OpusCapita<br/> Business Network Portal</p>
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
                      <MenuItem eventKey="3" active>English</MenuItem>
                      <MenuItem divider />
                      <MenuItem eventKey="4">Separated link</MenuItem>
                    </Dropdown.Menu>
                  </Dropdown>
                </ul>
              </div>
            </nav>

            <div className="content-wrap" style={{
              padding: "0px !important",
              // marginBottom: "0px !important",
              // minHeight: "545px"
            }}>
              <div className="container" id="container">
                <div className="box" style={{
                  width: "87%",
          		    marginTop: "2%",
                  // marginLeft: "10%",
          		    padding: "3%",
          		    textAlign: "left",
          		    zIndex: 3,
          		    backgroundColor: "white"
                }} id="bluebox">
                  <div className="row">
                    <div className="col-md-8">
                      <h2>Login</h2>
                      <form className="form-horizontal">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="col-sm-4 control-label">E-Mail *</label>
                              <div className="col-sm-8">
                                <input
                                id="username"
                                className="form-control"
                                type="text"
                                value={this.state.username}
                                placeholder={this.i18n.getMessage('LoginPageLabel.username')}
                                onChange={this.handleFieldChange} name="username"
                                autoFocus={true}
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="col-sm-4 control-label">Password *</label>
                              <div className="col-sm-8">
                                <input
                                id="password"
                                className="form-control"
                                type="password"
                                placeholder={this.i18n.getMessage('LoginPageLabel.password')}
                                value={this.state.password} onChange={this.handleFieldChange} name="password"
                                />
                                {loginErrorMessage}
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                      <br/>
                      <div className="form-submit text-right">
                        <button className="btn btn-link">Forgot your password?</button>
                        <Button
                          bsStyle="default"
                          onClick={this.handleSignupClick}
                          style={{ 'marginRight': '5px' }}>
                          {this.i18n.getMessage('LoginPageButtonLabel.signup')}
                        </Button>
                        <Button
                          bsStyle="primary"
                          onClick={this.handleLoginClick}>
                          {this.i18n.getMessage('CommonButtonLabel.login')}
                        </Button>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <p style={{
                        margin: "25% 0 0 10%",
                        fontSize: "150%"
                      }}>Business Network</p>
                      <br/>
                      <p>
                        OpusCapita Business Network integrates buyers, suppliers and other business partners in an efficient way. You can automate sending and receiving all types of electronic business documents, including e-invoices globally, through this network.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="footer" style={{
            position: "absolute",
    		    bottom: 0,
    		    width: "100%",
    		    height: "10%",
    		    backgroundColor: "#ec6608"
          }}>
            <ul className="nav navbar-nav navbar-left">
              <li><img src="/img/oc-logo-white.svg" style={{
                width: "40%",
                marginTop: "10%"
              }} /></li>
            </ul>
            <ul className="nav navbar-nav navbar-right" style={{
              marginRight: "0.1%",
              marginTop: "1.5%"
            }}>
              <li style={{color: "white"}}>&copy; OpusCapita 2017</li>
            </ul>
          </footer>
        </div>
      );
    }
  }
}
