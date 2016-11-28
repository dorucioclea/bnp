import React from "react"
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import browserHistory from 'react-router/lib/browserHistory';
import cookie from 'react-cookie';
import locales from './i18n/locales.js'
import ServerError from './../Errors/ServerError';

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

  handleFieldChange = (e) => {
    let newFieldValue = {};
    newFieldValue[e.target.id] = e.target.value;
    this.setState(newFieldValue);
  }

  handleLanguageSelect = (e, value) => {
    this.setState({
      language: value
    });
  }

  handleLoginClick = () => {
    cookie.save('LANGUAGE_COOKIE_KEY', this.state.language, {
      path: window.simRootContextPath
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
        <div onKeyPress={this.handleEnterPress}>
          <div className="container loginPage">
            <div className="row">
              <div className="col-md-4 col-md-offset-4">
                <a href="#" className="logoImage">
                  <img src={`${window.simContextPath}/oc-logo-rgb.svg`}/>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-md-offset-4">
                <form method="post" action="/loginAction">
                  <div className="form-group">
                    <label htmlFor="username"> {this.i18n.getMessage('LoginPageLabel.username')} </label>
                    <div className="input-group">
                    <span className="input-group-addon">
                      <span className="glyphicon glyphicon-user"/>
                    </span>
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
                  <div className={`form-group ${this.state.authenticationFailed ? 'has-error' : ''}`}>
                    <label htmlFor="password"> {this.i18n.getMessage('LoginPageLabel.password')} </label>
                    <div className="input-group">
                    <span className="input-group-addon">
                      <span className="glyphicon glyphicon-lock"/>
                    </span>
                      <input
                        id="password"
                        className="form-control"
                        type="password"
                        placeholder={this.i18n.getMessage('LoginPageLabel.password')}
                        value={this.state.password} onChange={this.handleFieldChange} name="password"
                      />
                    </div>
                    {loginErrorMessage}
                  </div>
                  <p>
                    <a href="#">{this.i18n.getMessage('LoginPageLabel.forgotPassword')}?</a>
                  </p>
                  <div className="form-group">
                    <input id="language" type="hidden" value={this.state.language} name="languageParam"/>
                    <div className="btn-group">
                      <Dropdown id="lang" onSelect={this.handleLanguageSelect}>
                        <Dropdown.Toggle>
                          {this.i18n.getMessage('LoginPageLabel.language')}:
                          <b>{this.languageTitle[this.state.language]}</b>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <MenuItem eventKey="de" active={this.state.language === 'de'}>
                            {this.i18n.getMessage('LoginPageLanguage.deutsch')}
                          </MenuItem>
                          <MenuItem eventKey="en" active={this.state.language === 'en'}>
                            {this.i18n.getMessage('LoginPageLanguage.english')}
                          </MenuItem>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="form-group">
                    <div>
                      <div className="text-right">
                        <button
                          className="btn btn-default btn-lg"
                          type="button"
                          onClick={this.handleSignupClick}
                          style={{ 'marginRight': '5px' }}
                        >
                          {this.i18n.getMessage('LoginPageButtonLabel.signup')}
                        </button>
                        <button className="btn btn-primary btn-lg" type="button" onClick={this.handleLoginClick}>
                          {this.i18n.getMessage('CommonButtonLabel.login')}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-4">
                <div className="bs-callout bs-callout-info">
                  <h4>
                    {this.i18n.getMessage('LoginPageLabel.privacyNote')}:
                  </h4>
                  <p>
                    {privacyNotesArray[0]}
                    <a target="_blank" href="mailto:info@jcatalog.com">
                      {this.i18n.getMessage('LoginPageLabel.infoEmail')}
                    </a>
                    {privacyNotesArray[1]}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <footer>
            <div className="container copyright text-center">
              &copy; {this.i18n.getMessage('LoginPageLabel.jcatalogActivityTime')}&nbsp;
              <a href="http://www.opuscapita.com/" target="_blank">{this.i18n.getMessage('LoginPageLabel.jcatalog')}</a>
            </div>
          </footer>
        </div>
      )
    }
  }
}
