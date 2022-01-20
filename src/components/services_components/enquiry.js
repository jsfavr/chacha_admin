import React, { Component } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'; 
import {get,authpost,patch,authget} from '../../utils/service';
import * as CONSTANT from '../../utils/constant'
import ToastServive from 'react-material-toast';

const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class enquiry extends Component {
    constructor(props) {
        super(props)
        this.state = {
             enquiry:[],
        }
    }
      componentDidMount() {

            document.title = 'Your Enquiry : Admin Dashboard - Crowd';
            document.getElementById("global-loader").style.display = "block";
            setTimeout(()=>{
            document.getElementById("global-loader").style.display = "none";
            },500)
      
    
        authget("/service/adminEnquiry/")
        .then((response) => {
           console.log(response.status);
           if(response.status==200){
            this.setState({ enquiry: response.data});
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
            vendoractiveStatus:status
        }
        patch("/service/enquiry/"+id,data)
        .then((response) => {
            authget("/service/adminEnquiry/")
            .then((response) => {
               // console.log(response);
                if(response.status==200){
                    this.setState({ enquiry: response.data});
               }else{
                    toast.error('Session Expired. Please Login.');
                    window.location.href='/login'
                   
               }
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
      handleEnqueryComplete = (id)=>{
          console.log(id)
        const data={
            'status':true
        }
        patch("/service/enquiry/" + id, data)
        .then((response) => {
            toast.success('Status Chhange Successfully');
            authget("/service/adminEnquiry/")
                .then((response) => {
                    // console.log(response);
                    this.setState({ enquiry: response.data });
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
                   Your Enquiry
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
                                            <th>User name</th>
                                            <th>User Email</th>
                                            <th>User Phone</th>
                                            <th>Message</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                    this.state.enquiry.length>0?
                                        this.state.enquiry.map((object, i) => (
                                            <tr key={i}>
                                                <td><Link to={"/viewService?id="+object.id}>{object.name}</Link></td>
                                                <td><Link to={"/vendorDetails?id="+object.vendor_id}>{object.vendor_name}</Link></td>
                                                <td>{object.user_name}</td>
                                                <td>{object.user_email}</td>
                                                <td>
                                                {object.user_phone}
                                                </td>
                                                <td style={{whiteSpace: "break-spaces"}}>
                                                {object.message}
                                                </td>
                                                <td>
                                                                {
                                                                    object.status ?
                                                                        <span className="badge badge-primary">
                                                                            Complete</span>
                                                                        : <span onClick={()=>this.handleEnqueryComplete(object.id)} className="btn btn-icon btn-pill btn btn-info mt-1 mb-1 btn-sm" >
                                                                            Pending</span>
                                                                }

                                                            </td>
                                            </tr>
                                            ))
                                        :<tr ><td colSpan="7"><center>No Enquiry Found </center></td></tr>
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
