import React from 'react';
import jQuery from 'jquery';

export default class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.pdf = false;
  }

  handleTogglePDF = () => {
    if (this.pdf) {
      jQuery('#pdf').animate({ height: '0px' }, 1000);
    } else {
      jQuery('#pdf').animate({ height: '829px' }, 1000);
    }
    this.pdf = !this.pdf;
  }

  render() {
    /* eslint-disable max-len */
    return (
      <div>
        <h3>Create by uploading PDF</h3>
        <div className="form-horizontal">
          <div className="row">
            <div className="col-md-6">
              <input type="hidden" name="supplierId" value="hard001" id="supplierId" />
              <input type="text" name="filename" style={{ display: "none" }} value="Angebotsunterlagen_30032016_1336.PDF" />
              <div className="form-group">
                <label className="col-sm-5">Supplier</label>
                <div className="col-sm-7">
                  hard001 - Hardware AG/Dortmund
                </div>
              </div>
              <div className="form-group ">
                <label className="col-sm-5 control-label" for="extInvoiceReceiptId">
                  Ext. Invoice No
                  <span className="error"> *</span>
                </label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" id="extInvoiceReceiptId" name="extInvoiceReceiptId" value="" onchange="markChanged();" />
                </div>
              </div>
              <div className="form-group hidden">
                <label className="col-sm-5 control-label" for="invoiceReceiptId">
                  Invoice Receipt ID
                  <span className="error"> *</span>
                </label>
                <div className="col-sm-7">
                  <input readonly="readonly" className="form-control" type="text" name="invoiceReceiptId" id="invoiceReceiptId" value="1461831791314" />
                </div>
              </div>
              <div className="form-group ">
                <label className="col-sm-5 control-label" for="accountingRecordId">
                  Accounting Record ID
                </label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" id="accountingRecordId" name="accountingRecordId" value="" />
                </div>
              </div>
              <div className="form-group ">
                <label className="col-sm-5 control-label" for="receivingPerson">
                  Receiving Person
                </label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" id="receivingPerson" name="receivingPerson" value="" />
                </div>
              </div>
              <div className="form-group ">
                <label className="col-sm-5 control-label" for="commentText">
                  Comment
                </label>
                <div className="col-sm-7">
                  <textarea className="form-control" rows="2" cols="30" id="commentText" name="comment" onchange="markChanged();" style={{ resize: "vertical" }}></textarea>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group ">
                <label for="invoiceDate" className="col-sm-5 control-label">
                  Invoice Date
                  <span className="error"> *</span>
                </label>
                <div className="col-sm-7">
                  <div className="input-group date ">
                    <input type="text" name="invoiceDate" value="04/28/2016" onchange="markChanged();" id="invoiceDate" className="form-control" />
                    <span className="input-group-addon">
                      <span className="glyphicon glyphicon-calendar"></span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group ">
                <label for="bookingDate" className="col-sm-5 control-label">
                  Booking Date
                  <span className="error"> *</span>
                </label>
                <div className="col-sm-7">
                  <div className="input-group date ">
                    <input type="text" name="bookingDate" value="04/28/2016" onchange="markChanged();" id="bookingDate" className="form-control" />
                    <span className="input-group-addon">
                      <span className="glyphicon glyphicon-calendar"></span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group ">
                <label for="invoiceDate" className="col-sm-5 control-label">
                  Due Date
                </label>
                <div className="col-sm-7">
                  <div className="input-group date ">
                    <input type="text" name="dueDate" value="" id="dueDate" className="form-control" />
                    <span className="input-group-addon">
                      <span className="glyphicon glyphicon-calendar"></span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group ">
                <label for="scannedOn" className="col-sm-5 control-label">
                  Scanned on
                </label>
                <div className="col-sm-7">
                  <div className="input-group date ">
                    <input type="text" name="scannedOn" value="" id="scannedOn" className="form-control" />
                    <span className="input-group-addon">
                      <span className="glyphicon glyphicon-calendar"></span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group ">
                <label for="invoiceDate" className="col-sm-5 control-label">
                  Received on
                </label>
                <div className="col-sm-7">
                  <div className="input-group date ">
                    <input type="text" name="receivedOn" value="" id="receivedOn" className="form-control" />
                    <span className="input-group-addon">
                      <span className="glyphicon glyphicon-calendar"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-6">
              <div className="form-group ">
                <label for="totalNetPrice" className="col-sm-5 control-label control-label">
                  Total (Net)
                  <span className="error"> *</span>
                </label>
                <div className="col-sm-7">
                  <input type="text" id="totalNetPrice" maxlength="12" name="totalNetPrice" className="form-control text-right" value="0.00" onchange="markChanged();" />
                </div>
              </div>
              <div className="form-group ">
                <label for="totalNetPrice" className="col-sm-5 control-label control-label">
                  Currency
                  <span className="error"> *</span>
                </label>
                <div className="col-sm-7">
                  <select id="netCurrency" onchange="markChanged(); checkNetCurrency();" name="currency" className="form-control">
                    <option value="AUD">AUD</option>
                    <option value="CHF">CHF</option>
                    <option value="CRD">CRD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                    <option value="NZD">NZD</option>
                    <option value="PKT">PKT</option>
                    <option value="Pkt">Pkt</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-5 control-label" for="taxRate">
                  Tax Rate
                </label>
                <div className="col-sm-7">
                  <select id="taxRate" className="form-control" onchange="priceChanged = true;" name="taxRate">
                    <option value="" selected="selected">Defined in items</option>
                    <optgroup label="Header Based Tax">
                      <option value="1">
                        19% - 19.00%
                      </option>
                      <option value="2">
                        7% - 7.00%
                      </option>
                      <option value="3">
                        0% - 0.00%
                      </option>
                      <option value="4">
                        Sales Tax - 11.00%
                      </option>
                      <option value="6">
                        GST - 10.00%
                      </option>
                    </optgroup>
                  </select>
                </div>
              </div>
              <div className="form-group ">
                <label className="col-sm-5 control-label" for="totalTaxAmount">Total Tax Amount</label>
                <div className="col-sm-7">
                  <input type="text" id="totalTaxAmount" maxlength="12" className="form-control text-right" name="totalTaxAmount" value="0.00" readonly="true" onchange="markChanged();" />
                </div>
              </div>
              <div className="form-group ">
                <label className="col-sm-5 control-label" for="totalGrossPrice">
                  Total Gross Price
                  <span className="error"> *</span>
                </label>
                <div className="col-sm-7">
                  <input type="text" id="totalGrossPrice" maxlength="12" name="totalGrossPrice" value="0.00" className="form-control text-right" onchange="markChanged();" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="col-sm-5 control-label" for="termsOfPayment">
                  Terms of Payment
                  <span className="error"> *</span>
                </label>
                <div className="col-sm-7">
                  <select id="termsOfPayment" name="termsOfPayment" className="form-control" onchange="markChanged(); checkSelection();">
                  <option value="T1" selected="true">
                    10 days - 3 %, 30 days net
                  </option>
                  <option value="T2">
                    7 days - 2 %, 20 days net
                  </option>
                  <option value="delivery">
                    delivery
                  </option>
                  <option value="t0">
                    30 days - 5 %, 60 days net
                  </option>
                </select>
              </div>
            </div>
            <div className="form-group ">
              <label className="col-sm-5 control-label" for="methodOfPayment">
                Method of Payment
                <span className="error"> *</span>
              </label>
              <div className="col-sm-7">
                <select id="methodOfPayment" className="form-control" name="methodOfPayment" value="invoice" onchange="markChanged();">
                  <option value="">
                  </option><option value="S">
                    Check
                  </option>
                  <option value="check">
                    check
                  </option>
                  <option value="cheque">
                    cheque
                  </option>
                  <option value="invoice" selected="selected">
                    invoice
                  </option>
                  <option value="pcart">
                    Pcard
                  </option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-5 control-label" for="termsOfDelivery">Terms of Delivery</label>
              <div className="col-sm-7">
                <select id="termsOfDelivery" name="termsOfDelivery" className="form-control" onchange="markChanged(); checkSelection();">
                <option value="null" selected="selected">
                </option><option value="CIP">
                  Carriage and Insurance Paid to
                </option>
                <option value="CPT">
                  Carriage Paid To
                </option>
                <option value="DAF">
                  Delivered At Frontier
                </option>
                <option value="DDP">
                  Delivered Duty Paid
                </option>
                <option value="DDU">
                  Delivered Duty Unpaid
                </option>
                <option value="EXW">
                  Ex Works
                </option>
                <option value="FCA">
                  Free Carrier
                </option>
                <option value="delivery">
                  Orders which are posted on weekdays before 12:00 clock, are sent out the same day. There is currently no delivery on Sundays and public holidays.
                </option>
              </select>
            </div>
          </div>
          <div className="form-group ">
            <label className="col-sm-5 control-label" for="periodOfService">Period of Service</label>
            <div className="col-sm-7">
              <input name="periodOfService" id="periodOfService" className="form-control" value="" onchange="markChanged();" />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <div className="form-group ">
            <label className="col-sm-5 control-label" for="discountableValue">
              Discountable Value
            </label>
            <div className="col-sm-7">
              <input type="text" className="form-control text-right" id="discountableValue" name="discountableValue" value="0.00" />
            </div>
          </div>
          <div className="form-group ">
            <label className="col-sm-5 control-label" for="earlyDiscount">
              Early Discount
            </label>
            <div className="col-sm-7">
              <input type="text" className="form-control text-right" id="earlyDiscount" name="earlyDiscount" value="0.00" />
            </div>
          </div>
          <div className="form-group ">
            <label for="dueDateEarlyDiscount" className="col-sm-5 control-label">
              Early Discount Due
            </label>
            <div className="col-sm-7">
              <div className="input-group date ">
                <input type="text" name="dueDateEarlyDiscount" value="" id="dueDateEarlyDiscount" className="form-control" />
                <span className="input-group-addon">
                  <span className="glyphicon glyphicon-calendar"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group ">
            <label className="col-sm-5 control-label" for="lateDiscount">
              Late Discount
            </label>
            <div className="col-sm-7">
              <input type="text" className="form-control text-right" id="lateDiscount" name="lateDiscount" value="0.00" />
            </div>
          </div>
          <div className="form-group ">
            <label for="dueDateLateDiscount" className="col-sm-5 control-label">
              Late Discount Due
            </label>
            <div className="col-sm-7">
              <div className="input-group date ">
                <input type="text" name="dueDateLateDiscount" value="" id="dueDateLateDiscount" className="form-control" />
                <span className="input-group-addon">
                  <span className="glyphicon glyphicon-calendar"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="container" id="pdf" style={{ height: '0px' }}>
          <hr />
          <object data="/pdf/demo-invoice.pdf" type="application/pdf" width="100%" height="100%" internalinstanceid="5">
            <a href="/pdf/demo-invoice.pdf">click here to download the PDF file.</a>
          </object>
        </div>
        <div className="vsplitbar" unselectable="on">
          <a href="#" accesskey="" tabindex="0" title="vsplitbar" onClick={e => e.preventDefault()}></a>
        </div>
      </div>
      <div className="form-submit text-right">
        <button className="btn btn-default hideViewer" onClick={this.handleTogglePDF}>Toggle PDF</button>
        <input type="submit" name="_action_update" value="Save" className="btn btn-primary" />
      </div>
      </div>
      </div>
    );
  }
}
