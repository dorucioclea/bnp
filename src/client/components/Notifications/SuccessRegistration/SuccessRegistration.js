import React from 'react';
import locales from './../../Registration/i18n/locales.js'

export default class SuccessRegistration extends React.Component {

  static contextTypes = {
    i18n: React.PropTypes.object
  }

  i18n = this.context.i18n.register('SuccessRegistration', locales)

  render() {
    return (
      <div>
        <h2>{this.i18n.getMessage('RegistrationHeader.successRegistration')}</h2>
        <h4>{this.i18n.getMessage('RegistrationConfirmation.checkEmail')}</h4>
      </div>
    )
  }
}
