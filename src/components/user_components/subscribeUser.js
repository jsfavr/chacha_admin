import React, { Component } from "react";
import {get,withoutauthpatch,withoutauthdelete,post} from '../../utils/service';
import ToastServive from 'react-material-toast';
import ReactPaginate from 'react-paginate';
import SearchField from "react-search-field";

const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class subscribeUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
         users_details:[],
         offset: 0,
         tableData: [],
         orgtableData: [],
         perPage: 50,
         currentPage: 0,
         searchitem:''
    }
}
componentDidMount(){
   this.getData()
   document.title = 'User : Admin Dashboard - Crowd';
   document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
}
getData(){
  get('/userDetails/alluser/')
  .then((res)=>{
    var tdata = res.data
    var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
      this.setState({
          users_details:res.data,
          pageCount: Math.ceil(tdata.length / this.state.perPage),
          orgtableData : tdata,
          tableData:slice
      })
  }).catch((err)=>{
      console.log(err)
  })
}
handleChange=e=>{
  const data={
      search:e
  }
  post('/userDetails/searchuser/',data)
  .then(res=>{
    var tdata = res.data
    var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
      this.setState({
          users_details:res.data,
          pageCount: Math.ceil(tdata.length / this.state.perPage),
          orgtableData : tdata,
          tableData:slice
      })
  }).catch(err=>{

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
  tableData:slice
  })

}
userstatusChange=(id,pra)=>{
  const data = {
    status:pra
    }
    withoutauthpatch("/userDetails/user/"+id,data)
    .then((response) => {
      
        toast.success('User Status Update Successfully');
        this.getData()
            
    })
    .catch(function (error) {
        console.log(error);
        toast.error('Sorry!! User Status Update Unsuccessful');
    });
}
userDetails =()=>{
    return this.state.tableData.map((obj,i)=>{
      return(
        <tr role="row" className="odd" key={i}>
          <td>{obj.name}</td>
          <td>{obj.email}</td>
          <td>{obj.phone}</td>
          <td>
            {obj.subscriptionType == true ?
            <span className="badge badge-primary">YES</span>
            :
            <span className="badge badge-danger">NO</span>
            }
           
          </td>
          <td><button className="btn btn-primary btn-sm">{obj.totalRefer} Refer</button></td>
          <td>
            {obj.status == true ?
            <a className="btn btn-icon btn-pill btn-success mt-1 mb-1 btn-sm text-white" onClick={()=>this.userstatusChange(obj.id,0)} >Unblock</a>
            :
            <a className="btn btn-icon btn-pill btn-danger  mt-1 mb-1 btn-sm text-white" onClick={()=>this.userstatusChange(obj.id,1)}>Block</a>
            }
           
          </td>
        </tr>
      );
    })
  }
  render() {
    return (
      <div>
        <div className="page-header mt-0  p-3">
          <h3 className="mb-sm-0">All User</h3>
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
                <h2 className="mb-0">All User</h2>
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
                        <th className="wd-15p">Name</th>
                        <th className="wd-20p">Email</th>
                        <th className="wd-15p">Phone</th>
                        <th className="wd-15p">Power<br/>Status</th>
                        <th className="wd-15p">Total <br/>Refer</th>
                        <th className="wd-10p">Block/<br/>Unblock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.userDetails()}
                    </tbody>
                  </table>
                  <span style={{float:'right'}}>
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
                          activeClassName={"active"}/>
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
