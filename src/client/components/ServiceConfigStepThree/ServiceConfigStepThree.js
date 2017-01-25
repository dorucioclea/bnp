import React from 'react';
import { Button, FormControl } from 'react-bootstrap';

export default class ServiceConfigStepThree extends React.Component {
  static propTypes = {
    onNextTab: React.PropTypes.func,
    onPreviousTab: React.PropTypes.func
  };

  render() {
    return (
      <div>
        <h3>eInvoice Validation</h3>

        <div className="bs-callout bs-callout-info">
          <h4 id="callout-progress-csp">Type of Validation</h4>
          <p>
            You can change your type of validation here if neccessary, which you selected one step earlier.
            <br/>
            Please upload a test file for validation in the Drag'n'Drop section below.
          </p>
        </div>

        <form className="form-horizontal">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="col-sm-3 control-label">Validation Type</label>
                <div className="col-sm-9">
                  <FormControl componentClass="select">
                    <option value="insert-update">Svefaktura 1.0</option>
                    <option value="replace">Svefaktura BIS 5A</option>
                    <option value="replace">Svekatalog 2.0</option>
                    <option value="replace">Sveorder BIS 28A</option>
                    <option value="replace">Sveorder (ordersvar)</option>
                    <option value="replace">Sveleveransavisering BIS 30A</option>
                    <option value="replace">PEPPOL Message Envelope 1.0</option>
                    <option value="replace">SFTI Tekniska kuvert (SBDH)</option>
                    <option value="replace">SFTI ObjectEnvelope</option>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
        </form>

        <section className="oc-drag-and-drop">
          <div className="drag-and-drop-canvas text-center" >
            <h2>Drag a file here</h2>
            <h4>or <a href="#">browse</a> for a file to upload.</h4>
          </div>
        </section>

        <br/>

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
