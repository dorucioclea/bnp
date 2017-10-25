import React from 'react';

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Create a Invoice from Form</h3>
        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Supplier</label>
            </div>
            <div className="col-md-6 input-group">
                amz001 - Amazon
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Reference Number</label>
            </div>
            <div className="col-md-6 input-group">
                <input type="text" className="form-control" />
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Supplier Addresss</label>
            </div>
            <div className="col-md-6 input-group">
                1 Main st, Any City, USA
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Booking Date</label>
            </div>
            <div className="col-md-6 input-group">
              <input type="text" className="form-control" />
              <span className="input-group-btn">
                <button type="button" className="btn btn-default" title="Schedule">
                  <span className="glyphicon glyphicon-calendar"></span>
                </button>
              </span>
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Supplier Contact</label>
            </div>
            <div className="col-md-6 input-group">

            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Scanned on</label>
            </div>
            <div className="col-md-6 input-group">
              <input type="text" className="form-control" />
              <span className="input-group-btn">
                <button type="button" className="btn btn-default" title="Schedule">
                  <span className="glyphicon glyphicon-calendar"></span>
                </button>
              </span>
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Customer</label>
            </div>
            <div className="col-md-6 input-group">
                jcat001 - Musterkunden AG
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Baseline Date</label>
            </div>
            <div className="col-md-6 input-group">
              <input type="text" className="form-control" />
              <span className="input-group-btn">
                <button type="button" className="btn btn-default" title="Schedule">
                  <span className="glyphicon glyphicon-calendar"></span>
                </button>
              </span>
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Customer Address</label>
            </div>
            <div className="col-md-6 input-group">
                Musterstrasse 64546 Musterstadt, DE
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Due Date</label>
            </div>
            <div className="col-md-6 input-group">
              <input type="text" className="form-control" />
              <span className="input-group-btn">
                <button type="button" className="btn btn-default" title="Schedule">
                  <span className="glyphicon glyphicon-calendar"></span>
                </button>
              </span>
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>IBAN</label>
            </div>
            <div className="col-md-6 input-group">

            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Payment Terms</label>
            </div>
            <div className="col-md-6 input-group">
              <select className="form-control">
                <option></option>
              </select>
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>BIC</label>
            </div>
            <div className="col-md-6 input-group">

            </div>
          </div> {/* 11 */}
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Method of Payment</label>
            </div>
            <div className="col-md-6 input-group">
              <select className="form-control">
                <option></option>
              </select>
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>VAT ID</label>
            </div>
            <div className="col-md-6 input-group">

            </div>
          </div> {/* 13 */}
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Terms of delivery</label>
            </div>
            <div className="col-md-6 input-group">
              <select className="form-control">
                <option></option>
              </select>
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Number of Original Invoice</label>
            </div>
            <div className="col-md-6 input-group">
                <input type="text" className="form-control" />
            </div>
          </div> {/* 15 */}
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Comment</label>
            </div>
            <div className="col-md-6 input-group">
                <textarea className="form-control"></textarea>
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Date of Issue</label>
            </div>
            <div className="col-md-6 input-group">
              <input type="text" className="form-control" />
              <span className="input-group-btn">
                <button type="button" className="btn btn-default" title="Schedule">
                  <span className="glyphicon glyphicon-calendar"></span>
                </button>
              </span>
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Period of Service</label>
            </div>
            <div className="col-md-6 input-group">
                <input type="text" className="form-control" />
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Intrastat</label>
            </div>
            <div className="col-md-6 input-group">
              <select className="form-control">
                <option>Import of goods</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Receiving Person</label>
            </div>
            <div className="col-md-6 input-group">
                <input type="text" className="form-control" />
            </div>
          </div>
        </div>

        <hr />

        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Total Gross Price</label>
            </div>
            <div className="col-md-6 input-group">
                <input type="text" className="form-control" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Discountable Value</label>
            </div>
            <div className="col-md-6 input-group">
                <input type="text" className="form-control" />
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Currency</label>
            </div>
            <div className="col-md-6 input-group">
              <select className="form-control">
                <option>EUR</option>
                <option>USD</option>
                <option>GBP</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Early Discount</label>
            </div>
            <div className="col-md-6 input-group">
                <input type="text" className="form-control" disabled={true} />
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Tax Country</label>
            </div>
            <div className="col-md-6 input-group">
              <select className="form-control">
                <option>US</option>
                <option>DE</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Early Discount Due</label>
            </div>
            <div className="col-md-6 input-group">
                <input type="text" className="form-control" disabled={true} />
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Tax Rate</label>
            </div>
            <div className="col-md-6 input-group">
              <select className="form-control">
                <option>Defined in terms</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Late Discount</label>
            </div>
            <div className="col-md-6 input-group">
                <input type="text" className="form-control" disabled={true} />
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Total Tax Amount</label>
            </div>
            <div className="col-md-6 input-group">
                <input type="text" className="form-control" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Late Discount Date</label>
            </div>
            <div className="col-md-6 input-group">
                <input type="text" className="form-control" disabled={true} />
            </div>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-md-6">
            <div className="col-md-6">
                <label>Total Net Price</label>
            </div>
            <div className="col-md-6 input-group">
                <input type="text" className="form-control" />
            </div>
          </div>
        </div>
        <div className="form-submit text-right">
          <input type="button" value="Reset" className="btn btn-link" onclick="resetForm(this.form);" />
          <input type="submit" name="_action_list" value="Save" className="btn btn-primary" />
        </div>
      </div>
    );
  }
}
