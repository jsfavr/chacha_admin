import React, { Component } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { get, DELETE } from '../../utils/service';
import * as CONSTANT from '../../utils/constant'
import queryString from 'query-string';

export class vendorDetails extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {

            vendor: [],

            details: [],
            address: [],
            bank: [],
            id: params.id

        }
    }
    componentDidMount() {
        document.title = 'Vendor Details : Admin Dashboard - Crowd';
        document.getElementById("global-loader").style.display = "block";
        setTimeout(() => {
            document.getElementById("global-loader").style.display = "none";
        }, 500)
        get("/userDetails/user/" + this.state.id)
            .then((response) => {
                console.log(response);
                this.setState({ vendor: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });

        get("/userDetails/vendor/")
            .then((response) => {
                // console.log(response)
                var data = response.data.filter(item => item.user_id == this.state.id)
                this.setState({

                    details: data[0]

                })
                //    console.log(this.state.details1)
                //    console.log(this.state.details1[0])
                // console.log(this.state.details)

            })
            .catch(function (error) {
                console.log(error);
            });

        get("/address/shipping/")
            .then((response) => {
                // console.log(response)
                var data = response.data.filter(item => item.user_id == this.state.id)
                if (data[0] == undefined) {
                    this.setState({

                        address: 0

                    })
                } else {
                    this.setState({

                        address: data[0]

                    })
                }

                // console.log(this.state.address)
                //    console.log(this.state.details1[0])
                // console.log(this.state.details)

            })
            .catch(function (error) {
                console.log(error);
            });


        get("/wallet/bank/")
            .then((response) => {
                // console.log(response)
                var data = response.data.filter(item => item.user_id == this.state.id)
                if (data[0] == undefined) {
                    this.setState({

                        bank: 0

                    })
                } else {
                    this.setState({

                        bank: data[0]

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
                <div className="page-header mt-0 shadow p-3">
                    <h3 className="mb-sm-0">Profile</h3>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <a href="#"><i className="fe fe-home"></i></a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Admin Dashboard</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-md-12">

                        <div className="card shadow">
                            <div className="card-body pb-0">
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">

                                        <div className="row border">
                                            <div className="col-md-12" style={{ fontSize: "16px", marginTop: "10px" }}>Customer ID : <b style={{ fontSize: "20px" }}>{this.state.vendor.username}</b></div>
                                            <div className="col-md-4">
                                                <h3 style={{ marginTop: "10px" }}>Personal Details : </h3>
                                                    Full Name : <b>{this.state.vendor.name}</b> <br />
                                                    Email ID : {this.state.vendor.email}<br />
                                                    Contact No : {this.state.vendor.phone} <br />
                                                    Approve Status :  {this.state.vendor.status == true ? <><span style={{ color: "green" }}><b>YES</b></span>
                                                </> : <span style={{ color: "red" }}><b>NO</b></span>}
                                                <br />
                                                    Email Verified Status :  {this.state.vendor.is_verified == true ? <><span style={{ color: "green" }}><b>YES</b></span>
                                                </> : <span style={{ color: "red" }}><b>NO</b></span>}
                                                <br />

                                                {/* <strong>POS :</strong> { this.state.details.POS==true? <div><span style={{color:"green"}}><b>YES</b></span> 
                                                        <br/>
                                                        POS User Email : 
                                                        </div> : <span style={{color:"red"}}><b>NO</b></span>} */}
                                            </div>
                                            <div className="col-md-4">
                                                <h3>Store Address : </h3>
                                                {this.state.address == 0 ? <>Store address not added</> : <>
                                                    Pincode : <b>{this.state.address.pincode}</b> <br />
                                                    Address : {this.state.address.address} <br />
                                                    Flat : {this.state.address.flat} <br />
                                                    Landmark : {this.state.address.landmark} <br />
                                                    Location : {this.state.address.location} <br />
                                                    City : {this.state.address.city} <br />
                                                    District : {this.state.address.district} <br />
                                                    State : {this.state.address.state} <br />
                                                    Phone No : {this.state.address.phone} <br />
                                                    Optional Phone : {this.state.address.optionalPhone} <br />


                                                </>
                                                }

                                            </div>
                                            <div className="col-md-4">
                                                <h3>Bank Details : </h3>
                                                {this.state.bank == 0 ? <>Bank not added</> : <>
                                                    Account Number : <b>{this.state.bank.AccountNumber}</b><br />
                                                Account Holder Name : {this.state.bank.accountHolderName}<br />
                                                Bank Name : {this.state.bank.bankName}<br />
                                                Branch Name : {this.state.bank.branchName}<br />
                                                IFSC Code : {this.state.bank.ifscCode}<br />
                                                UPI ID : {this.state.bank.upi}<br />
                                                </>
                                                }

                                            </div>




                                        </div>
                                        <div className="media-heading mt-3">
                                            <h3><strong>Documents</strong></h3>
                                        </div>
                                        <br />
                                        <div className="border" style={{ padding: "10px" }}>
                                            GSTIN NO : <strong>{this.state.details.gstNumber}</strong> <br />
                                        Companey Name : <strong>{this.state.details.companyName}</strong>
                                            <table style={{ width: "100%" }}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: "50%" }}>
                                                            <div className="col-md-6 p-0">
                                                                Aadhar No : {this.state.details.aadharNumber}<br />

                                                                <strong>Aaadhar Image:</strong><br />
                                                                <br />
                                                                <a href={this.state.details.aadharImage} target="_blank"><img src={this.state.details.aadharImage} width="400px" /></a>
                                                                <br />
                                                                <br />
                                                            </div>
                                                        </td>
                                                        <td style={{ width: "50%", paddingTop: "0px", marginTop: "-5px" }}>
                                                            <div className="col-md-6 p-0">
                                                                Pan Card No : {this.state.details.panNumber}<br />

                                                                <strong>Pan Image:</strong><br />
                                                                <br />
                                                                <a href={this.state.details.panImage} target="_blank"><img src={this.state.details.panImage} width="400px" /></a>

                                                                <br />
                                                            </div>
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: "50%" }}>
                                                            <div className="col-md-6 p-0">
                                                                <strong>Your Sign:</strong><br />
                                                                <br />
                                                                <a href={this.state.details.vendorSign} target="_blank"><img src={this.state.details.vendorSign} width="400px" /></a>
                                                                <br />
                                                                <br />
                                                            </div>
                                                        </td>
                                                        <td style={{ width: "50%" }}>
                                                            <div className="col-md-6 p-0">
                                                                <strong>Companey Logo:</strong><br />
                                                                <br />
                                                                <a href={this.state.details.companyLogo} target="_blank"><img src={this.state.details.companyLogo} width="400px" /></a>
                                                                <br />
                                                            </div>
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
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

export default vendorDetails
