import React, { Component } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { get, DELETE, patch, post } from '../../utils/service';
import * as CONSTANT from '../../utils/constant'
import ToastServive from 'react-material-toast';
import ReactPaginate from 'react-paginate';
import SearchField from "react-search-field";
const toast = ToastServive.new({
  place: 'topRight',
  duration: 2,
  maxCount: 8
});

export default class Viewvendor extends Component {
  constructor(props) {
    super(props)
    this.state = {

      vendor: [],
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 50,
      currentPage: 0,
      searchitem: ''

    }
  }
  componentDidMount() {
    this.getData()
    document.title = 'Vendor List : Admin Dashboard - Crowd';
    document.getElementById("global-loader").style.display = "block";
    setTimeout(() => {
      document.getElementById("global-loader").style.display = "none";
    }, 500)
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.loadMoreData()
    });

  }
  loadMoreData() {
    const data = this.state.orgtableData;

    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData: slice
    })
  }
  getData() {
    get("/userDetails/allvendoruser/")
      .then((response) => {
        var tdata = response.data.sort((a, b) => (b > a ? 1 : -1))
        var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
          vendor: response.data.sort((a, b) => (b > a ? 1 : -1)),
          pageCount: Math.ceil(tdata.length / this.state.perPage),
          orgtableData: tdata,
          tableData: slice
        });
        // console.log(this.state.category);
      })
      .catch(function (error) {
        console.log(error);
      });
    // document.getElementsByTagName('table').dataTable();

  }
  profileUpdateStatusChange = (id, pro) => {
    const data = {
      ProfileUpdatePermission: pro
    }

    patch("/userDetails/vendor/" + id, data)
      .then((response) => {
        if (response.status == 200) {





          toast.success('Status Update Successfully');
          this.getData()

        } else {
          //    window.location.href = '/login'
        }

      })
      .catch(function (error) {
        console.log(error);
        toast.error('Sorry!!Status Update Unsuccessful');
      });
  }
  vendorApproveStatusChange = (id, user_id, pro1, pro, number) => {
    console.log(number)
    if (pro == 0) {
      var sms = "Approval Canceled : Sorry!! your vendor approval is canceled. For more details contact to the admin. Any query visit https://crowdindia.co.in/contact.html";
      var template_id = ''
    } else {
      var sms = "Profile Approved : Congratulation, we checked your profile and approve your vendor request. Now you are part of Crowd Family.";
      var template_id = ''
    }
    const data = {
      vendorApproveStatus: pro1
    }
    const data1 = {
      status: pro1,
      is_verified: 1,
    }
    patch("/userDetails/user/" + user_id, data1)
      .then((response) => {
        console.log(response);

      })
      .catch(function (error) {
        console.log(error);

      });
    patch("/userDetails/vendor/" + id, data)
      .then((response) => {
        if (response.status == 200) {
          toast.success('Status Update Successfully');
          const data1 = {
            msg: sms,
            phone_no: number,
            template_id: template_id
          }
          post('/other/getsms/', data1)
            .then(res => {

            }).catch(err => {

            })

          get("/userDetails/allvendoruser/")
            .then((response) => {
              this.setState({ vendor: response.data.sort((a, b) => (b > a ? 1 : -1)) });
              // console.log(this.state.category);
            })
            .catch(function (error) {
              console.log(error);
            });

          this.getData()

        } else {
          window.location.href = '/login'
        }

      })
      .catch(function (error) {
        console.log(error);
        toast.error('Sorry!!Status Update Unsuccessful');
      });
  }
  handleChange = e => {
    const data = {
      search: e
    }
    post('/userDetails/search/', data)
      .then(response => {
        var tdata = response.data.sort((a, b) => (b > a ? 1 : -1))
        var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
          vendor: response.data.sort((a, b) => (b > a ? 1 : -1)),
          pageCount: Math.ceil(tdata.length / this.state.perPage),
          orgtableData: tdata,
          tableData: slice
        });
      }).catch(err => {

      })

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
                <div
                  style={{
                    float: "right",
                    marginBottom: "13px",
                    marginTop: "-15px"
                  }}
                >
                  <SearchField
                    placeholder="Search..."
                    onChange={this.handleChange}
                    searchText={this.state.searchitem}
                    classNames="test-class"
                  />
                </div>

              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="example"
                    className="table table-striped table-bordered w-100 text-nowrap"
                  >
                    <thead>
                      <tr>
                        <th className="wd-15p">Customer ID</th>
                        <th className="wd-15p">Vendor Name</th>
                        <th className="wd-15p">Contact No</th>
                        <th className="wd-20p">Email</th>
                        <th className="wd-15p">Edit permission</th>
                        <th className="wd-25p">Approval</th>
                        <th className="wd-25p">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {

                        this.state.tableData.map((object, i) => (
                          <tr key={i}>
                            <td><b style={{ fontSize: "16px" }}>{JSON.parse(object.user)[0].fields.username}</b></td>
                            <td>{JSON.parse(object.user)[0].fields.name}</td>
                            <td>{JSON.parse(object.user)[0].fields.phone}</td>
                            <td>{JSON.parse(object.user)[0].fields.email}</td>
                            <td>{JSON.parse(object.vendor)[0].fields.ProfileUpdatePermission == true ?
                              <a

                                className="btn btn-success btn-pill mt-1 mb-1 text-white btn-sm"
                                onClick={() => this.profileUpdateStatusChange(JSON.parse(object.vendor)[0].pk, 0)}
                              >
                                Yes
                          </a> :
                              <a

                                className="btn btn-danger mt-1 mb-1 text-white  btn-sm"
                                onClick={() => this.profileUpdateStatusChange(JSON.parse(object.vendor)[0].pk, 1)}
                              >
                                No
                          </a>}
                            </td>
                            <td>{JSON.parse(object.user)[0].fields.status == true ? <a

                              className="btn btn-success btn-pill mt-1 mb-1 text-white  btn-sm"
                              onClick={() => this.vendorApproveStatusChange(JSON.parse(object.vendor)[0].pk, JSON.parse(object.user)[0].pk, 0, 1, JSON.parse(object.user)[0].fields.phone)}
                            >
                              Yes
                          </a> :
                              <a

                                className="btn btn-danger mt-1 mb-1 text-white  btn-sm"
                                onClick={() => this.vendorApproveStatusChange(JSON.parse(object.vendor)[0].pk, JSON.parse(object.user)[0].pk, 1, 0, JSON.parse(object.user)[0].fields.phone)}
                              >
                                No
                          </a>}</td>

                            <td>
                              <Link to={"/vendorDetails?id=" + JSON.parse(object.vendor)[0].fields.user_id} className="btn btn-info mt-1 mb-1  btn-sm">
                                View Details
                          </Link>
                            </td>
                          </tr>
                        ))
                      }



                    </tbody>
                  </table>
                  <span style={{ float: 'right' }}>
                    <ReactPaginate
                      previousLabel={"prev"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
