import React, { Component } from "react";
import {Link} from 'react-router-dom'
import {get,withoutauthpatch,withoutauthdelete} from '../../utils/service';
import ToastServive from 'react-material-toast';
import ReactPaginate from 'react-paginate';

const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class Inventory extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           details:[],
           offset: 0,
           tableData: [],
           orgtableData: [],
           perPage: 50,
           currentPage: 0
        }
      }
      componentDidMount(){
        document.title = 'Inventory Report : Admin Dashboard - Crowd';
        document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
        get("/product/viewallProduct/")
        .then((res)=>{
          //console.log(res)
          if(res.status == 200){
            var tdata = res.data
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                details:res.data,
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData : tdata,
                tableData:slice
            })
          }else{
           // window.Location.href='/login'
          }
          
        }).catch((err)=>{
    
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
      Details =()=>{
        return this.state.tableData.map((obj,i)=>{
          return(
            <tr>
            <td>{JSON.parse(obj.details)[0].fields.productCode}</td>
            <td> {JSON.parse(obj.details)[0].fields.productName}</td>
            <td> Size : {JSON.parse(obj.details)[0].fields.size}<br/>Color : <span style={{color:JSON.parse(obj.details)[0].fields.color}}>{JSON.parse(obj.details)[0].fields.color}</span></td>
            <td> {JSON.parse(obj.details)[0].fields.totalStock}</td>
            <td> {JSON.parse(obj.details)[0].fields.totalStock-JSON.parse(obj.details)[0].fields.availableStock}</td>
            <td> <b style={{fontSize:"20px"}}>{JSON.parse(obj.details)[0].fields.availableStock} </b></td>
            <td>
                <Link to={"inventoryDetails?id="+JSON.parse(obj.details)[0].pk} className="btn btn-icon btn-sm btn-primary mt-1 mb-1" style={{color: "white"}}>
                    <span className="btn-inner--icon"><i className="fe fe-eye"></i></span>
                    <span className="btn-inner--text">More Details</span>
                </Link>
                {/* <Link to="addStock?product_id=15" className="btn btn-icon btn-sm btn-info mt-1 mb-1" style={{color: "white"}}>
                    <span className="btn-inner--icon"><i className="fe fe-plus"></i></span>
                    <span className="btn-inner--text">Add Stoke</span>
                </Link> */}
            </td>
         </tr>
          
          );
        })
      }
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Inventory Report</h3>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <a href="#"><i className="fe fe-home"></i></a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Vendor Dashboard</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow">
                            <div className="card-header">
                                <h2 className="mb-0">Inventory Report</h2>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table id="example" className="table table-striped table-bordered w-100 text-nowrap">
                                        <thead>
                                            <tr role="row">
                                                <th>
                                                    Product<br />
                                                    Code
                                                </th>
                                                <th>
                                                    Product<br />
                                                    Name
                                                </th>
                                                <th>
                                                    Product<br />
                                                    Size / Color
                                                </th>
                                                <th>Total-Stock</th>
                                                <th>Out-Stock</th>
                                                <th>Available Stock</th>
                                                <th>
                                                    View<br />
                                                    More Details
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.Details()}
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
        )
    }
}
