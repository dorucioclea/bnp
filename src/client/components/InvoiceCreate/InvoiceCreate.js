import React from 'react';
import POSearch from './POSearch';
import ImportPDF from './PDF/Import';
import CreateForm from './CreateForm';

class InvoiceCreate extends React.Component {
  constructor(props) {
    super(props);
    this.child = null;
    this.selection = 'manual';
  }

  componentWillMount() {
    this.decideChild(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.decideChild(nextProps);
    }
    this.props = nextProps;
  }

  onSelectType = (type) => {
    if (type === 'manual') {
      this.props.router.push('/invoice/create');
    } else if (type === 'usePO') {
      this.props.router.push('/invoice/create/po');
    } else if (type === 'pdf') {
      this.props.router.push('/invoice/create/pdf');
    }
  }

  decideChild = (props) => {
    if (props.location.pathname.indexOf('po') > -1 && props.params.OPId) {
      this.selection = 'usePO';
    } else if (props.location.pathname.indexOf('po') > -1) {
      this.child = <POSearch />;
      this.selection = 'usePO';
    } else if (props.location.pathname.indexOf('pdf') > -1) {
      this.child = <ImportPDF {...props} />;
      this.selection = 'pdf';
    } else {
      this.child = <CreateForm />;
      this.selection = 'manual';
    }
  }

  render() {
    return (
      <div>
        <section className="header">
          <h1>
            Create Invoice
          </h1>
        </section>
        <div className="bs-callout bs-callout-info">
          <h4 id="callout-progress-csp">Start Invoice Creation</h4>
          <p>
            Start Invoice Creation by selection how you would like to create invoices.
          </p>
        </div>
        <hr/>
        <form className="form-horizontal">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="col-sm-4 control-label">Create Invoices by</label>
                <div className="col-sm-8">
                  <label className="oc-radio">
                    <input type="radio" name="creationType" checked={this.selection === 'manual'}
                      onClick={this.onSelectType.bind(this, 'manual')}/>
                    filling in invoices manually
                  </label>
                  <br />
                  <label className="oc-radio">
                    <input type="radio" name="creationType" checked={this.selection === 'usePO'}
                      onClick={this.onSelectType.bind(this, 'usePO')} />converting an existing PO
                  </label>
                  <br />
                  <label className="oc-radio">
                    <input type="radio" name="creationType" checked={this.selection === 'pdf'}
                      onClick={this.onSelectType.bind(this, 'pdf')} />uploading a PDF file
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
        <hr/>
        {this.child}
      </div>
    );
  }
}


InvoiceCreate.propTypes = {
  router: React.PropTypes.object
}

export default InvoiceCreate;
