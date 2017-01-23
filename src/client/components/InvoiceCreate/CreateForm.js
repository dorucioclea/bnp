import React from 'react';

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Create a Invoice from Form</h3>
        <form className="form-horizontal">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label className="col-sm-4">
                  Invoice Number *
                </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="col-sm-4">
                  Customer *
                </label>

                <div className="col-sm-8">
                  <select name="importFormat" id="importFormat" className="form-control">
                    <option value="insert-update"></option>
                    <option value="replace">User</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="col-sm-4">
                  Customer Address
                </label>

                <div className="col-sm-8">
                  <select name="importFormat" id="importFormat" className="form-control">
                    <option value="insert-update"></option>
                    <option value="replace">User</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="col-sm-4">
                  IBAN *
                </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4">
                  BIC *
                </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4">
                  VAT ID *
                </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4">
                  Date of Issue *
                </label>
                <div className="col-sm-8">
                  <div className="input-group">
                    <input type="text" name="" className="form-control" id="" />
                    <span className="input-group-btn">
                      <button type="button" className="btn btn-default" title="Schedule">
                        <span className="glyphicon glyphicon-calendar"></span>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4">
                  Due Date *
                </label>
                <div className="col-sm-8">
                  <div className="input-group">
                    <input type="text" name="" className="form-control" id="" />
                    <span className="input-group-btn">
                      <button type="button" className="btn btn-default" title="Schedule">
                        <span className="glyphicon glyphicon-calendar"></span>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4">
                  Payment Terms *
                </label>

                <div className="col-sm-8">
                  <select name="importFormat" id="importFormat" className="form-control">
                    <option value="insert-update"></option>
                    <option value="replace">User</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4">
                  Total Gross *
                </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4">
                  Total Net *
                </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4">
                  Total Vat *
                </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
            </div>
          </div>
          <div className="form-submit text-right">
            <input type="submit" name="_action_list" value="Next" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
