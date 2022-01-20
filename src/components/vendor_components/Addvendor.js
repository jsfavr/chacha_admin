import React, { Component } from "react";

export default class Addvendor extends Component {
  componentDidMount(){
    document.title = 'Add Vendor : Admin Dashboard - Crowd';
    document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
}
  render() {
    return (
      <div>
        <div className="page-header mt-0 p-3">
          <h3 className="mb-sm-0">Add Vendor</h3>
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="/">
                <i className="fe fe-home"></i>
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Vendor
            </li>
          </ol>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card shadow">
              <div className="card-header">
                <h2 className="mb-0">Add Vendor</h2>
              </div>
              <form
                method="POST"
                className="appointment-form"
                id=""
                action="add_group_code"
                role="form"
                name="frm"
              >
                <div className="card-body">
                  <div className="row" id="view">
                    <input
                      type="hidden"
                      name="_token"
                      id="_token"
                      value="<?php echo csrf_token(); ?>"
                    />
                    <div className="col-md-6">
                      <label>Vendor Name</label>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="cat_name"
                          placeholder="Enter Group Name"
                          value=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label>Vendor Email</label>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="cat_name"
                          placeholder="Enter Group Name"
                          value=""
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label>Vendor Phone</label>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="cat_name"
                          placeholder="Enter Group Name"
                          value=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label>Vendor Address</label>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="cat_name"
                          placeholder="Enter Group Name"
                          value=""
                        />
                      </div>
                    </div>
                  </div>
                  <input
                    type="submit"
                    name="submit"
                    value="Add Vendor"
                    className="btn btn-primary mt-1 mb-1"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
