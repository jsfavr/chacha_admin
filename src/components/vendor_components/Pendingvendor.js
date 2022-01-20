import React, { Component } from "react";

export default class Pendingvendor extends Component {
  componentDidMount(){
    document.title = 'Pending Return : Admin Dashboard - Crowd';
    document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
}
  render() {
    return (
      <div>
        <div className="page-header mt-0  p-3">
          <h3 className="mb-sm-0">View Vendor</h3>
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="#">
                <i className="fe fe-home"></i>
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              View Vendor
            </li>
          </ol>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card shadow">
              <div className="card-header">
                <h2 className="mb-0">View Vendor</h2>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="example"
                    className="table table-striped table-bordered w-100 text-nowrap"
                  >
                    <thead>
                      <tr>
                        <th className="wd-15p">Vendor Name</th>
                        <th className="wd-15p">Contact No</th>
                        <th className="wd-20p">Email</th>

                        <th className="wd-25p">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Bella</td>
                        <td>8768544771</td>
                        <td>example@gmail.com</td>

                        <td>
                          <button
                            type="button"
                            className="btn btn-warning btn-square mt-1 mb-1"
                          >
                            Give Approval
                          </button>
                          &nbsp;
                          <button
                            type="button"
                            className="btn btn-primary btn-square mt-1 mb-1"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
