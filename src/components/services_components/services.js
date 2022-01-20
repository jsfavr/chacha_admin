import React, { Component } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'; 
import {get,authpost,patch} from '../../utils/service';
import * as CONSTANT from '../../utils/constant'
import ToastServive from 'react-material-toast';
const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class services extends Component {
    constructor(props) {
        super(props)
        this.state = {
             service:[],
        }
    }
      componentDidMount() {

            document.title = 'Your Services : Admin Dashboard - Crowd';
            document.getElementById("global-loader").style.display = "block";
            setTimeout(()=>{
            document.getElementById("global-loader").style.display = "none";
            },500)
      
    
        authpost("/service/adminService/")
        .then((response) => {
           // console.log(response);
           if(response.status==200){
                this.setState({ service: response.data});
           }else{
                toast.error('Session Expired. Please Login.');
                window.location.href='/login'
           }
           
           // console.log(this.state.category);
        })
        .catch(function (error) {
            console.log(error);
        });
        // document.getElementsByTagName('table').dataTable();
    
      }
      handleStatus = (status,id)=>{
        const data={
            activeStatus:status
        }
        patch("/service/service/"+id,data)
        .then((response) => {
            authpost("/service/adminService/")
            .then((response) => {
               // console.log(response);
                this.setState({ service: response.data});
               // console.log(this.state.category);
            })
            .catch(function (error) {
                console.log(error);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
      }
    render() {
        return (
            <div>
            <div className="page-header mt-0 p-3">
                <h3 className="mb-sm-0">
                    Other Services
                    {/* <Link to="/addService" type="button" className="btn btn-primary mt-1 mb-1">
                        Add More Services
                    </Link> */}
                </h3>
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <a href="/">
                            <i className="fe fe-home"></i>
                        </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                    Vendor Dashboard
                    </li>
                </ol>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table id="example" className="table table-striped table-bordered w-100 text-nowrap">
                                    <thead>
                                        <tr>
                                            <th>Services Name</th>
                                            <th>Vendor Name</th>
                                            <th>Price(Rs)</th>
                                            <th>MRP(Rs)</th>
                                            <th>Active<br/>Status</th>
                                            <th>Admin<br/>Approval</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                    this.state.service.length>0?
                                        this.state.service.map((object, i) => (
                                            <tr key={i}>
                                                <td>{object.name}</td>
                                                <td><Link to={"/vendorDetails?id="+object.vendor_id}>{object.vendor_name}</Link></td>
                                                <td>{object.price}</td>
                                                <td>{object.mrp}</td>
                                                <td>
                                                    {
                                                        object.vendoractiveStatus?<b>YES</b>:<b>NO</b>
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        object.activeStatus?<button className="btn btn-icon btn-pill btn btn-success mt-1 mb-1 btn-sm" onClick={()=>this.handleStatus(0,object.id)}>Active</button>:<button className="btn btn-icon btn-pill btn btn-danger mt-1 mb-1 btn-sm"  onClick={()=>this.handleStatus(1,object.id)}>Non-active</button>
                                                    }
                                                </td>
                                                <td>
                                                    <Link to={"/viewService?id="+object.id} type="button" className="btn btn-icon btn-pill btn btn-info mt-1 mb-1 btn-sm">
                                                        View
                                                    </Link>
                                                    {/* <Link to={"/updateService?id="+object.id} type="button" className="btn btn-icon btn-pill btn btn-primary mt-1 mb-1 btn-sm">
                                                        Update
                                                    </Link> */}
                                                </td>
                                            </tr>
                                            ))
                                        :<tr ><td colSpan="6"><center>No Service Found </center></td></tr>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
