import React from 'react';
import { Button, FormControl, Radio } from 'react-bootstrap';

export default class ServiceConfigStepTwo extends React.Component {
  static propTypes = {
    ediAddress: React.PropTypes.string,
    communicationType: React.PropTypes.string,
    isGxs: React.PropTypes.bool,
    contactName: React.PropTypes.string,
    contactPhone: React.PropTypes.string,
    contactEmail: React.PropTypes.string,
    onNextTab: React.PropTypes.func,
    onPreviousTab: React.PropTypes.func
  };

  static defaultProps = {
    ediAddress: null,
    communicationType: null,
    isGxs: false,
    contactName: null,
    contactPhone: null,
    contactEmail: null
  };

  constructor(props) {
    super(props);

    this.state = {
      ediAddress: this.props.ediAddress,
      communicationType: this.props.communicationType,
      isGxs: this.props.isGxs,
      contactName: this.props.contactName,
      contactPhone: this.props.contactName,
      contactEmail: this.props.contactName,
    }
  }

  handleCommunicationChange = event => {
    this.setState({
      communicationType: event.target.value
    });
  };

  render() {
    return (
      <div>
        <h3>eInvoice Setup</h3>
        <div className="bs-callout bs-callout-info">
          <h4 id="callout-progress-csp">Configure eInvoice for the Business Network Portal</h4>
          <p>
            There are some information needed in order to enable your company within the Business Network
            Portal to start sending eInvoices. Fill in required information in order to setup and test your
            eInvoice connectivity.
          </p>
        </div><hr/>
        <h4>Format and EDI Address</h4>
        <form className="form-horizontal">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="col-sm-3 control-label">Message Type</label>
                <div className="col-sm-9">
                  <FormControl componentClass="select">
                    <option value="insert-update">SVEFAKTURA</option>
                    <option value="replace">replace</option>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="col-sm-3 control-label">EDI Address</label>
                <div className="col-sm-9">
                  <FormControl
                    type="text"
                    value={this.state.contactPhone}
                    placeholder="556677-1122"
                    onChange={e => this.setState({ ediAddress: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </form><hr/>
        <h4>Communication</h4>
        <div className="row">
          <div className="col-md-1">
            <label className="oc-radio">
              <Radio
                onChange={this.handleCommunicationChange}
                checked={this.state.communicationType === 'VAN'}
                value="VAN"
              />
            </label>
          </div>
          <div className="col-md-11">
            <form className="form-horizontal">
              <div className="row">
                <div className="form-group">
                  <label className="col-sm-1 control-label">VAN</label>
                  <div className="col-sm-3">
                    <FormControl componentClass="select">
                      <option value="Baseware">Baseware</option>
                      <option value="replace">replace</option>
                    </FormControl>
                  </div>
                  <div className="col-md-2">
                    <label className="oc-check">
                      <input type="checkbox" /> GXS TRADING GRID
                    </label>
                    <br/>
                    <label className="oc-check">
                      <input type="checkbox" /> VAN
                    </label>
                    <br/>
                    <label className="oc-check">
                      <input type="checkbox" /> Dinet
                    </label>
                  </div>
                  <div className="col-md-2">
                    <label className="oc-check">
                      <input type="checkbox" /> BT Infonet (VAN)
                    </label>
                    <br/>
                    <label className="oc-check">
                      <input type="checkbox" checked="" /> X400 Network (VAN)
                    </label>
                    <br/>
                    <label className="oc-check">
                      <input type="checkbox" /> GXS TRADING GRID
                    </label>
                  </div>
                  <div className="col-md-2">
                    <label className="oc-check">
                      <input type="checkbox" checked="" /> Evenex
                    </label>
                    <br/>
                    <label className="oc-check">
                      <input type="checkbox" /> Telema
                    </label>
                    <br/>
                    <label className="oc-check">
                      <input type="checkbox" checked="" /> X400 Network (VAN)
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-1">
            <label className="oc-radio">
              <Radio
                onChange={this.handleCommunicationChange}
                checked={this.state.communicationType === 'FTP'}
                value="FTP"
              />
            </label>
          </div>
          <div className="col-md-11">
            <form className="form-horizontal">
              <div className="row">
                <div className="form-group">
                  <label className="col-sm-1 control-label">FTP</label>
                </div>
              </div>
            </form>
          </div>
        </div>

        <br/>
        <hr/>
        <h4>Contact Person</h4>
        <form className="form-horizontal">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="col-sm-3 control-label">Name</label>
                <div className="col-sm-9">
                  <FormControl
                    type="text"
                    value={this.state.contactName}
                    placeholder="Name"
                    onChange={e => this.setState({ contactName: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Telephone</label>
                <div className="col-sm-9">
                  <FormControl
                    type="text"
                    value={this.state.contactPhone}
                    placeholder="+491732185516"
                    onChange={e => this.setState({ contactPhone: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="col-sm-3 control-label">E-Mail Address</label>
                <div className="col-sm-9">
                  <FormControl
                    type="text"
                    value={this.state.contactEmail}
                    placeholder="name@company.com"
                    onChange={e => this.setState({ contactEmail: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="form-submit text-right">
          <Button onClick={() => this.props.onPreviousTab()}>Previous</Button>
          <Button
            bsStyle="primary"
            disabled={false}
            onClick={() => this.props.onNextTab()}
          >
            Save &amp; Continue
          </Button>
        </div>
      </div>
    )
  }
}
