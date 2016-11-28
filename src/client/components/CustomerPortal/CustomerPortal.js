import React from 'react';
import connect from 'react-redux/lib/components/connect';
import locales from './i18n/locales.js'

class CustomerPortal extends React.Component {

  static propTypes = {
    currentUserInfo: React.PropTypes.object
  }

  static contextTypes = {
    i18n: React.PropTypes.object,
    authenticationService: React.PropTypes.object
  }

  state = {}

  i18n = this.context.i18n.register('CustomerPortal', locales)

  render() {
    return (
      <div className="col-sm-12">
        <h1 className="col-sm-12">{this.i18n.getMessage('CustomerPortalHeader.supplierApplication')}</h1>
      </div>
    )
  }
}

function injectState(store) {
  return {
    currentUserInfo: store.currentUserInfo
  };
}

export default connect(injectState)(CustomerPortal);
