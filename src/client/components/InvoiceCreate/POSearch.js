import React from 'react';

export default class POSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Search Purchase Order to Create a Invoice</h3>
        <form action="/eproc/proc/invoiceTasklist/index" method="post" name="search" id="search">
          <div className="form-horizontal">

            <div className="row">
              <div className="col-md-6">

                <div className="form-group">
                  <label className="col-sm-4 control-label" for="supplierId">
                    Supplier
                  </label>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <input type="text" className="form-control" name="supplierId" value=""
                        readonly="readonly" id="supplierId"
                      />
                      <span className="input-group-btn reference-search">
                        <a id="" href="" className="btn btn-default" title="">
                          <span className="glyphicon glyphicon-search"></span>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-4 control-label" for="supplierId">
                    Purchase Order ID
                  </label>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <input type="text" className="form-control" name="supplierId" value=""
                        readonly="readonly" id="supplierId"
                      />
                      <span className="input-group-btn reference-search">
                        <a id="" href="" className="btn btn-default" title="">
                          <span className="glyphicon glyphicon-search"></span>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-4 control-label" for="dueDateFrom">PO created on</label>
                  <div className="col-sm-8">
                    <div className="input-daterange input-group">
                      <input type="text" name="dueDateFrom" value="03/20/2016" className="form-control"
                        placeholder="from" id="dueDateFrom"
                      />
                      <span className="input-group-addon">
                        &ndash;
                      </span>
                      <input type="text" name="dueDateTo" value="04/20/2016" className="form-control"
                        placeholder="to" id="dueDateTo"
                      />
                    </div>
                  </div>
                </div>

              </div>
              <div className="col-md-6">

                <div className="form-group">
                  <label className="col-sm-4 control-label" for="approvalStatus">Status</label>
                  <div className="col-sm-8">
                    <select className="form-control" name="approvalStatus" id="approvalStatus">
                      <option value="all">All</option>
                      <option value="open">Open</option>
                      <option value="inItemApproval">Item Approval</option>
                      <option value="inItemDispute">Item Dispute</option>
                      <option value="inValueApproval">Value Approval</option>
                      <option value="inValueDispute">Value Dispute</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="locked">Locked</option>
                      <option value="authorized">Authorized</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-4 control-label" for="loginName">
                    PO created by
                  </label>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <input type="text" maxlength="50" className="form-control" id="loginName"
                        name="assignee" value=""
                      />
                      <span className="input-group-btn reference-search">
                        <a id="" href="" className="btn btn-default" title="">
                          <span className="glyphicon glyphicon-search"></span>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="form-submit text-right">
            <input type="button" value="Reset" className="btn btn-link" onclick="resetForm(this.form);" />
            <input type="submit" name="_action_list" value="Search" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
