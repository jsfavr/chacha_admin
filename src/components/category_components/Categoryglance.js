import React, { Component } from "react";

export default class Categoryglance extends Component {
    componentDidMount(){
        document.title = 'Category at a Glance : Admin Dashboard - Crowd';
        document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
    }
  render() {
    return (
      <>
      <div class="page-header mt-0 p-3">
          <h3 class="mb-sm-0">All Category Details</h3>
          <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                  <a href="#"><i class="fe fe-home"></i></a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Admin Dashboard</li>
          </ol>
      </div>
      <div class="row">
        <div class="col-md-12">
            <div class="card shadow">
                <div class="card-header">
                    <h2 class="mb-0">Category</h2>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                    <table id="example" className="table table-striped table-bordered w-100 text-nowrap">
                        <thead>
                            <tr>
                                <th>Category Name &nbsp;&nbsp;<a href="add_category" className="btn btn-icon btn-pill btn-info mt-1 mb-1" type="button" data-toggle="tooltip" data-placement="top" title="" data-original-title="Add Category">+ Cat</a></th>
                                <th>Sub Category Name <span style={{paddingLeft: "35%"}}>Sub SubCategory Name </span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    BEVERAGES<br />
                                    <h2 style={{float: "right"}}>
                                        <a href="add_sub_category?cat_id=23" className="btn btn-icon btn-pill btn-primary mt-1 mb-1 btn-sm" type="button" data-toggle="tooltip" data-placement="top" title="" data-original-title="Add Sub Category">+ Sub cat</a>

                                        &nbsp;&nbsp;
                                        <a data-toggle="tooltip" data-placement="top" title="" data-original-title="Update" href="update_category?cat_id=23" className="btn btn-icon btn-pill btn-btn mt-1 mb-1 btn-sm cat" type="button">
                                            <i className="fas fa-edit"></i>
                                        </a>
                                    </h2>
                                    <br />
                                    <br />
                                    <br />
                                </td>
                                <td colspan="2">
                                    <table className="table table-striped table-bordered w-100 text-nowrap">
                                        <tbody>
                                            <tr>
                                                <td style={{width: "460px"}}>
                                                    <table style={{border: "none"}}>
                                                        <tbody>
                                                            <tr>
                                                                <td style={{width: "460px", border: "none"}}>COFFEE</td>
                                                                <td style={{width: "150px", border: "none"}}>
                                                                    <a
                                                                        href="add_sub_sub_category?sub_sub_cat=19"
                                                                        className="btn btn-icon btn-pill btn-primary mt-1 mb-1 btn-sm"
                                                                        type="button"
                                                                        data-toggle="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Add Sub Sub Category"
                                                                    >
                                                                        +Sub Sub Cat
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{border: "none"}}></td>
                                                                <td style={{border: "none"}}>
                                                                    <a
                                                                        data-toggle="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Update"
                                                                        href="update_sub_category?sub_cat_id=19"
                                                                        className="btn btn-icon btn-pill btn-btn mt-1 mb-1 btn-sm subcat"
                                                                        type="button"
                                                                    >
                                                                        <i className="fas fa-edit"></i>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2" style={{border: "none"}}>
                                                                    <span style={{border: "none"}}>
                                                                        <center></center>
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table style={{border: "none"}} className="table table-striped table-bordered w-100 text-nowrap">
                                                        <tbody>
                                                            <tr>
                                                                <td style={{border: 0, width: "250px"}}>
                                                                    INSTANT COFFEE
                                                                    <h2 style={{float: "right"}}>
                                                                        <a
                                                                            data-toggle="tooltip"
                                                                            data-placement="top"
                                                                            title=""
                                                                            data-original-title="Delete"
                                                                            href="delete_sub_sub_category?sub_sub_cat_id=30"
                                                                            className="btn btn-icon btn-pill btn-btn mt-1 mb-1 btn-sm"
                                                                            type="button"
                                                                        >
                                                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                                                        </a>
                                                                        <a
                                                                            data-toggle="tooltip"
                                                                            data-placement="top"
                                                                            title=""
                                                                            data-original-title="Update"
                                                                            href="update_sub_sub_category?sub_sub_cat_id=30"
                                                                            className="btn btn-icon btn-pill btn-btn mt-1 mb-1 btn-sm subsubcat"
                                                                            type="button"
                                                                        >
                                                                            <i className="fas fa-edit"></i>
                                                                        </a>
                                                                    </h2>
                                                                    <br />
                                                                    <br />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{border: 0, width: "250px"}}>
                                                                    COFFEE &amp; PRE-MIX
                                                                    <h2 style={{float: "right"}}>
                                                                        <a
                                                                            data-toggle="tooltip"
                                                                            data-placement="top"
                                                                            title=""
                                                                            data-original-title="Delete"
                                                                            href="delete_sub_sub_category?sub_sub_cat_id=31"
                                                                            className="btn btn-icon btn-pill btn-btn mt-1 mb-1 btn-sm"
                                                                            type="button"
                                                                        >
                                                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                                                        </a>
                                                                        <a
                                                                            data-toggle="tooltip"
                                                                            data-placement="top"
                                                                            title=""
                                                                            data-original-title="Update"
                                                                            href="update_sub_sub_category?sub_sub_cat_id=31"
                                                                            className="btn btn-icon btn-pill btn-btn mt-1 mb-1 btn-sm subsubcat"
                                                                            type="button"
                                                                        >
                                                                            <i className="fas fa-edit"></i>
                                                                        </a>
                                                                    </h2>
                                                                    <br />
                                                                    <br />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                          </tbody>
                    </table>

                  </div>
                </div>
            </div>
        </div>
    </div>

   
      </>
    );
  }
}
