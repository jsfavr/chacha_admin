import React, { Component } from "react";

export default class Viewrefund extends Component {
  componentDidMount(){
    document.title = 'Vendor Refund Details : Admin Dashboard - Crowd';
    document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
 }
  render() {
    return (
      <div>
        <div className="page-header mt-0  p-3">
          <h3 className="mb-sm-0">Refund Request</h3>
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="#">
                <i className="fe fe-home"></i>
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Refund Request
            </li>
          </ol>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card shadow">
              <div className="card-header">
                <h2 className="mb-0">Refund Request</h2>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="example"
                    className="table table-striped table-bordered w-100 text-nowrap"
                  >
                    <thead>
                      <tr>
                        <th className="wd-15p">First name</th>
                        <th className="wd-15p">Last name</th>
                        <th className="wd-20p">Email</th>
                        <th className="wd-15p">Phone</th>
                        <th className="wd-10p">Address</th>
                        <th className="wd-10p">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Bella</td>
                        <td>Chloe</td>
                        <td>A@gmail.com</td>
                        <td>7456985698</td>
                        <td>Haldia</td>
                        <td>250</td>
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
