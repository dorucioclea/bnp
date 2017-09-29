import React from 'react';
import locales from './i18n/locales.js';
import request from 'superagent-bluebird-promise';
import connect from 'react-redux/lib/components/connect';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

class SellerDashboard extends React.Component {
  static propTypes = {
    currentUserData: React.PropTypes.object
  };

  static contextTypes = {
    i18n: React.PropTypes.object,
    simPublicUrl: React.PropTypes.string,
    router: React.PropTypes.object
  };

  state = { connectStatus: 'Loading...', accessRequestCount: 4 };

  componentWillMount() {
    let serviceRegistry = (service) => ({ url: `${this.context.simPublicUrl}/supplier` });
    const SupplierProfileStrength = serviceComponent({
      serviceRegistry,
      serviceName: 'supplier' ,
      moduleName: 'supplier-profile_strength',
      jsFileName: 'profile_strength-bundle'
    });

    this.externalComponents = { SupplierProfileStrength };
    this.setState({ i18n: this.context.i18n.register('SellerDashboard', locales) });
  }

  componentDidMount() {
    const einvoiceRequest = request.get(`${this.context.simPublicUrl}/einvoice-send/api/config/inchannels/${this.props.currentUserData.supplierid}`);

    /* Do not use cache in request if browser is IE */
    if (false || !!document.documentMode) einvoiceRequest.query({ cachebuster: Date.now().toString() });

    einvoiceRequest.set('Accept', 'application/json').then(response => {
      if (response.body.status === 'activated') {
        this.setState({ connectStatus: 'Connected' });
      } else {
        this.setState({ connectStatus: 'Connecting' });
      }
    }).catch(err => this.setState({ connectStatus: 'Not Connected' }));
  }

  componentWillReceiveProps(nextProps, nextContext){
    if(this.state.i18n && this.state.i18n.locale && nextContext.i18n.locale != this.state.i18n.locale){
      this.setState({ i18n: nextContext.i18n.register('SellerDashboard', locales) });
    }
  }

  handleProfileClick = () => {
    this.context.router.push('/supplierInformation');
  }

  handleConnectionClick() {
    window.location.replace('/einvoice-send');
  }

  connectButton() {
    if (this.state.connectStatus === 'Connected') return '';

    return (<button className="btn btn-warning" onClick={this.handleConnectionClick}>{this.state.i18n.getMessage('SellerDashboard.connections.connect')}</button>)
  }

  connectionStatus() {
    if (this.state.connectStatus === 'Not Connected') return this.state.i18n.getMessage('SellerDashboard.connections.notConnectedStatus');
    if (this.state.connectStatus === 'Connecting') return this.state.i18n.getMessage('SellerDashboard.connections.connectingStatus');
    if (this.state.connectStatus === 'Connected') return this.state.i18n.getMessage('SellerDashboard.connections.connectedStatus');
    return this.state.i18n.getMessage('SellerDashboard.connections.loading');
  }

  colorStyle() {
    if (this.state.connectStatus === 'Loading...') return {color: 'black'};

    if (this.state.connectStatus === 'Connected') return {color: 'green'};

    return {color: 'red'};
  }

  render() {
    const { SupplierProfileStrength } = this.externalComponents;

    return (
      <div>
        <br/>
        <div className="row">
          <div className="col-md-6">
            <div className="panel panel-success">
              <div className="panel-heading">
                <h4>{this.state.i18n.getMessage('SellerDashboard.profileStrength.heading')}</h4>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-xs-6">
                    <SupplierProfileStrength
                      key='profile_strength'
                      actionUrl={this.context.simPublicUrl}
                      supplierId={this.props.currentUserData.supplierid}
                    />
                  </div>
                  <div className="col-xs-6">
                    <p>{this.state.i18n.getMessage('SellerDashboard.profileStrength.content')}</p>
                    <button className="btn btn-warning" onClick={this.handleProfileClick}>
                      {this.state.i18n.getMessage('SellerDashboard.profileStrength.editButton')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="panel panel-success">
              <div className="panel-heading">
                <h4>{this.state.i18n.getMessage('SellerDashboard.connections.heading')}</h4>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-xs-4">
                    <span className="fa-stack fa-lg">
                      <i className="fa fa-circle fa-stack-2x" style={this.colorStyle()}></i>
                      <i className="fa fa-power-off fa-stack-1x fa-inverse"></i>
                    </span>
                  </div>
                  <div className="col-xs-4">
                    <h4>eInvoice</h4>
                    <i style={this.colorStyle()}>{this.connectionStatus()}</i>
                  </div>
                  <div className="col-xs-4">{this.connectButton()}</div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <br/>
                    <p>{this.state.i18n.getMessage('SellerDashboard.connections.content')}</p>
                    <br/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function injectState(store) {
  return {
    currentUserData: store.currentUserData
  };
}

export default connect(injectState)(SellerDashboard);
