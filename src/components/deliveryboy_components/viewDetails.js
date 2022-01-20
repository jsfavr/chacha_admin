import React, { Component } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'; 
import {get,DELETE} from '../../utils/service';
import * as CONSTANT from '../../utils/constant'
import queryString from 'query-string';

export default class viewDetails extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
           
             vendor:[],
            
             details:[],
             address:[],
             bank:[],
             id:params.id
          
        }
      }
      componentDidMount() {
        document.title = 'Delivery Boy Details : Admin Dashboard - Crowd';
        document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
        get("/userDetails/user/"+this.state.id)
        .then((response) => {
         //   console.log(response);
            this.setState({ vendor: response.data });
        })
        .catch(function (error) {
            console.log(error);
        });

        get("/wallet/bank/")
        .then((response) => {
           // console.log(response)
           var data = response.data.filter(item => item.user_id == this.state.id)
           if(data[0]==undefined){
            this.setState({
                 
                bank:0
                
               })
           }else{
            this.setState({
                 
                bank:data[0]
                
               })
           }
         
                //console.log(this.state.bank)
            //    console.log(this.state.details1[0])
              // console.log(this.state.details)

        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                
                <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Delivery Boy Details</h3>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <a href="#"><i className="fe fe-home"></i></a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Admin Dashboard</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body">
                               <h3>Personal Details : </h3>
                                                    Full Name : <b>{this.state.vendor.name}</b> <br/>
                                                    Email ID : {this.state.vendor.email}<br/>
                                                    Contact No : {this.state.vendor.phone} <br/>
                                                    Approve Status :  { this.state.vendor.status==true? <><span style={{color:"green"}}><b>YES</b></span> 
                                                        </> : <span style={{color:"red"}}><b>NO</b></span>}
                                                        <br/>
                                                    Email Verified Status :  { this.state.vendor.is_verified==true? <><span style={{color:"green"}}><b>YES</b></span> 
                                                        </> : <span style={{color:"red"}}><b>NO</b></span>}
                                                       <br/>

                                                  
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body">
                            <h3>Bank Details : </h3>
                                            { this.state.bank==0? <>Bank not added</> : <>
                                                Account Number : <b>{this.state.bank.AccountNumber}</b><br/>
                                                Account Holder Name : {this.state.bank.accountHolderName}<br/>
                                                Bank Name : {this.state.bank.bankName}<br/>
                                                Branch Name : {this.state.bank.branchName}<br/>
                                                IFSC Code : {this.state.bank.ifscCode}<br/>
                                                UPI ID : {this.state.bank.upi}<br/>
                                                    </>
                                                    }
                                                  
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="card shadow">
                            <div className="card-body row">
                            <div className="col-md-4">
                                <center>        <Link to={"deliveryDetails?delivery_boy_id="+this.state.id} className="btn btn-icon  btn-primary mt-1 mb-1" style={{color: "white"}}>
                    <span className="btn-inner--text">Delivery Report</span>
                </Link></center>
                            </div>
                            <div className="col-md-4">
                                <center><Link to={"returnDetails?delivery_boy_id="+this.state.id} className="btn btn-icon  btn-warning mt-1 mb-1" style={{color: "white"}}>
                    <span className="btn-inner--text">Return Report</span>
                </Link></center>
                            </div>
                            <div className="col-md-4">
                                <center>   <Link to={"/deliveryPincode?id="+this.state.id} className="btn btn-secondary mt-1 mb-1 ">Delivery Pincodes</Link></center>
                            </div>                             
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            </div>
        )
    }
}
