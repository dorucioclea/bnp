import React from 'react';
import locales from './i18n/locales.js';
import { Col, Row, Image, Button } from 'react-bootstrap';
import connect from 'react-redux/lib/components/connect';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';
import browserHistory from 'react-router/lib/browserHistory';

class SellerDashboard extends React.Component {
  static propTypes = {
    currentUserData: React.PropTypes.object
  }

  static contextTypes = {
    i18n: React.PropTypes.object,
    simPublicUrl: React.PropTypes.string
  }

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

  componentWillReceiveProps(nextProps, nextContext){
    if(this.state.i18n && this.state.i18n.locale && nextContext.i18n.locale != this.state.i18n.locale){
      this.setState({ i18n: nextContext.i18n.register('SellerDashboard', locales) });
    }
  }

  handleClick = () => {
    browserHistory.push(`${window.simContextPath}/supplierInformation`);
  };

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
                  <h4>
                    {this.state.i18n.getMessage('SellerDashboard.profileStrength.content')}
                  </h4>
                  <Button bsStyle="warning" onClick={this.handleClick}>
                    {this.state.i18n.getMessage('SellerDashboard.profileStrength.editButton')}
                  </Button>
              </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="panel panel-success">
              <div className="panel-heading"><h4>Connections</h4></div>
              <div className="panel-body">
                <Row>
                  <Col xs={1}><Image src={`${window.simUrl}/img/mockup/plugged.png`} responsive={true}/></Col>
                  <Col xs={4}><h4>eInvoice</h4></Col>
                  <Col xs={1}><Image src={`${window.simUrl}/img/mockup/unplugged.png`} responsive={true}/></Col>
                  <Col xs={2}><h4>EDI</h4></Col>
                  <Col xs={2}><Button bsStyle="warning">Connect</Button></Col>
                </Row>
                <Row>
                  <Col xs={1}><Image src={`${window.simUrl}/img/mockup/plugged.png`} responsive={true}/></Col>
                  <Col xs={4}><h4>Orders</h4></Col>
                  <Col xs={1}><Image src={`${window.simUrl}/img/mockup/unplugged.png`} responsive={true}/></Col>
                  <Col xs={2}><h4>RFQ</h4></Col>
                  <Col xs={2}><Button bsStyle="warning">Connect</Button></Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <h4>
                      Save by connecting additional services offered by the Business Network.
                      This will allow you to benefit from synergies and give you a central management
                      console for all your documents
                    </h4>
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
