import React from 'react';
import locales from './i18n/locales.js';
import request from 'superagent-bluebird-promise';
import { Col, Row, Image, Button } from 'react-bootstrap';
import connect from 'react-redux/lib/components/connect';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';
import browserHistory from 'react-router/lib/browserHistory';

class SellerDashboard extends React.Component {
  static propTypes = {
    currentUserData: React.PropTypes.object
  };

  static contextTypes = {
    i18n: React.PropTypes.object,
    simPublicUrl: React.PropTypes.string
  };

  state = { connectStatus: 'Loading...' };

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
    const einvoicePromise = request.
      get(`${this.context.simPublicUrl}/einvoice-send/api/config/inchannel/${this.props.currentUserData.supplierid}`).
      set('Accept', 'application/json').
      promise();

    einvoicePromise.then(response => {
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

  handleProfileClick() {
    browserHistory.push(`${window.simContextPath}/supplierInformation`);
  }

  handleConnectionClick() {
    window.location.replace(`${window.simPublicUrl}/einvoice-send`)
  }

  connectButton() {
    if (this.state.connectStatus === 'Connected') return '';

    return (<Button bsStyle="warning" onClick={this.handleConnectionClick}>{this.state.i18n.getMessage('SellerDashboard.connections.connect')}</Button>)
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
        <Row>
          <Col md={6}>
            <div className="panel panel-success">
              <div className="panel-heading">
                <h4>{this.state.i18n.getMessage('SellerDashboard.profileStrength.heading')}</h4>
              </div>
              <div className="panel-body">
                <Col xs={6}>
                  <SupplierProfileStrength
                    key='profile_strength'
                    actionUrl={this.context.simPublicUrl}
                    supplierId={this.props.currentUserData.supplierid}
                  />
                </Col>
                <div className="col-xs-6">
                  <p>{this.state.i18n.getMessage('SellerDashboard.profileStrength.content')}</p>
                  <Button bsStyle="warning" onClick={this.handleProfileClick}>
                    {this.state.i18n.getMessage('SellerDashboard.profileStrength.editButton')}
                  </Button>
              </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="panel panel-success">
              <div className="panel-heading">
                <h4>{this.state.i18n.getMessage('SellerDashboard.connections.heading')}</h4>
              </div>
              <div className="panel-body">
                <Row>
                  <Col xs={4}>
                    <span className="fa-stack fa-lg">
                      <i className="fa fa-circle fa-stack-2x" style={this.colorStyle()}></i>
                      <i className="fa fa-power-off fa-stack-1x fa-inverse"></i>
                    </span>
                  </Col>
                  <Col xs={4}>
                    <h4>eInvoice</h4>
                    <i style={this.colorStyle()}>{this.connectionStatus()}</i>
                  </Col>
                  <Col xs={4}>{this.connectButton()}</Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <p>{this.state.i18n.getMessage('SellerDashboard.connections.content')}</p>
                    <br/>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
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
