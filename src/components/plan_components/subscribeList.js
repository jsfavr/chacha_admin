import React, { Component } from "react";
import { get, withoutauthpatch, withoutauthdelete, post } from '../../utils/service';
import ToastServive from 'react-material-toast';
import ReactPaginate from 'react-paginate';
import SearchField from "react-search-field";
import Moment from 'moment-js';
import { Link } from 'react-router-dom'
const toast = ToastServive.new({
  place: 'topRight',
  duration: 2,
  maxCount: 8
});
export default class subscribeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subscribeList: [],
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
    document.title = 'Power Purchase : Admin Dashboard - Crowd';
    document.getElementById("global-loader").style.display = "block";
    setTimeout(() => {
      document.getElementById("global-loader").style.display = "none";
    }, 500)
  }
  getData() {
    get('/userDetails/PurchaseList/')
      .then((res) => {
        var tdata = res.data
        var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
          subscribeList: res.data,
          pageCount: Math.ceil(tdata.length / this.state.perPage),
          orgtableData: tdata,
          tableData: slice
        })
      }).catch((err) => {
        console.log(err)
      })
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
  userDetails = () => {
    return this.state.tableData.map((obj, i) => {
      return (
        <tr role="row" className="odd" key={i}>
          <td>{Moment(obj.date).format()}</td>
          <td><Link to={'/userDetails?id=' + obj.user_id + '&name=' + obj.user_name}>{obj.user_name}</Link></td>
          <td>{obj.user_email}</td>
          <td>{obj.user_phone}</td>
          <td>&#8377;{obj.price}</td>
          <td>{obj.transID}</td>
          <td>{obj.OrderID}</td>
        </tr>
      );
    })
  }
  render() {
    return (
      <div>
        <div className="page-header mt-0  p-3">
          <h3 className="mb-sm-0">Power Purchase List</h3>
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="#">
                <i className="fe fe-home"></i>
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Admin Dashboard
            </li>
          </ol>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card shadow">
              <div className="card-header">
                <h2 className="mb-0">Power Purchase List</h2>
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
                        <th className="wd-15p">Date</th>
                        <th className="wd-15p">Name</th>
                        <th className="wd-20p">Email</th>
                        <th className="wd-15p">Phone</th>
                        <th className="wd-15p">Power<br />Price</th>
                        <th className="wd-15p">Purchase<br />Transaction ID</th>
                        <th className="wd-15p">Purchase<br />Order ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.userDetails()}
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
