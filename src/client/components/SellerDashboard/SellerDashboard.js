import React from 'react';
import { Table, Col, Row, Image, Button } from 'react-bootstrap';
import connect from 'react-redux/lib/components/connect';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

class SellerDashboard extends React.Component {
  static propTypes = {
    currentUserData: React.PropTypes.object
  }

  static contextTypes = {
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
  }

  render() {
    const { SupplierProfileStrength } = this.externalComponents;

    return (
      <div>
        <br/>
        <Row>
          <Col md={6}>
            <div className="panel panel-success">
              <div className="panel-heading"><h4>Company profile strength</h4></div>
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
                    Continue to fill your profile in order to benefit from better visibility in the network
                    and get more business opportunities.
                  </h4>
                  <Button bsStyle="warning">Add financial data</Button>&nbsp;
                  <Button bsStyle="warning">Add users</Button>&nbsp;
                  <Button bsStyle="warning">Add certificates</Button>
              </div>
              </div>
            </div>
            <div className="panel panel-success">
              <div className="panel-heading"><h4>Orders</h4></div>
              <div className="panel-body">
                <Table responsive={true}>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Created</th>
                      <th>Description</th>
                      <th>Items</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>PO 170013313</td>
                      <td>01.01.2017</td>
                      <td>Smasung Notebook</td>
                      <td>1</td>
                      <td>724,00 EUR</td>
                    </tr>
                    <tr>
                      <td>PO 170013313</td>
                      <td>01.01.2017</td>
                      <td>Smasung Notebook</td>
                      <td>1</td>
                      <td>724,00 EUR</td>
                    </tr>
                    <tr>
                      <td>PO 170013313</td>
                      <td>01.01.2017</td>
                      <td>Smasung Notebook</td>
                      <td>1</td>
                      <td>724,00 EUR</td>
                    </tr>
                    <tr>
                      <td>PO 170013313</td>
                      <td>01.01.2017</td>
                      <td>Smasung Notebook</td>
                      <td>1</td>
                      <td>724,00 EUR</td>
                    </tr>
                    <tr>
                      <td>PO 170013313</td>
                      <td>01.01.2017</td>
                      <td>Smasung Notebook</td>
                      <td>1</td>
                      <td>724,00 EUR</td>
                    </tr>
                  </tbody>
                </Table>
                <a className="pull-right" href="#" style={{ color: "#FAA94F" }}><h4>More</h4></a>
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
            <div className="panel panel-success">
              <div className="panel-heading"><h4>Invoices</h4></div>
              <div className="panel-body">
                <Table responsive={true}>
                  <thead>
                  <tr>
                    <th>Payer</th>
                    <th>Supplier</th>
                    <th>Due date</th>
                    <th>Gross amount</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Company X</td>
                    <td>Company XYZ</td>
                    <td>01.05.2017</td>
                    <td>123,00 EUR</td>
                    <td>Approved</td>
                  </tr>
                  <tr>
                    <td>Company X</td>
                    <td>Company XYZ</td>
                    <td>01.05.2017</td>
                    <td>123,00 EUR</td>
                    <td>Approved</td>
                  </tr>
                  <tr>
                    <td>Company X</td>
                    <td>Company XYZ</td>
                    <td>01.05.2017</td>
                    <td>123,00 EUR</td>
                    <td>Approved</td>
                  </tr>
                  <tr>
                    <td>Company X</td>
                    <td>Company XYZ</td>
                    <td>01.05.2017</td>
                    <td>123,00 EUR</td>
                    <td>Approved</td>
                  </tr>
                  <tr>
                    <td>Company X</td>
                    <td>Company XYZ</td>
                    <td>01.05.2017</td>
                    <td>123,00 EUR</td>
                    <td>Approved</td>
                  </tr>
                  </tbody>
                </Table>
                <a className="pull-right" href="#" style={{ color: "#FAA94F" }}><h4>More</h4></a>
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
