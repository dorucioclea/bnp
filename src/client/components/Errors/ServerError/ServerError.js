import React from 'react';
import locales from './i18n/locales.js'
import Button from 'react-bootstrap/lib/Button';

export default class ServerError extends React.Component {

  static propTypes = {
    message: React.PropTypes.string,
    onCloseErrorPage: React.PropTypes.func
  }

  static contextTypes = {
    i18n: React.PropTypes.object
  }

  i18n = this.context.i18n.register('ServerErrorPage', locales)

  render() {
    let backButton;
    if (this.props.onCloseErrorPage) {
      backButton = (
        <Button bsStyle="primary" onClick={this.props.onCloseErrorPage}>
          {this.i18n.getMessage('CommonButtonLabel.back')}
        </Button>
      );
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-md-offset-4" />
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="container">
                <h2>{this.props.message}</h2>
                {backButton}
              </div>
            </div>
          </div>
        </div>
        <footer>
          <div className="container copyright text-center">
            &copy; 2001 &mdash; {new Date().getFullYear()} &nbsp;&nbsp;
            <a href="http://www.opuscapita.com/" target="_blank">{this.i18n.getMessage('CommonMessages.jcatalog')}</a>
          </div>
        </footer>
      </div>
    )
  }
}
