import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { get, withoutauthpatch } from '../../utils/service'
import queryString from 'query-string';
import ToastServive from 'react-material-toast';
import Moment from 'moment'
import './deliverySlipPrint.css'
import ReactToPrint from "react-to-print";
var Barcode = require('react-barcode');
var QRCode = require('qrcode.react');

require('dotenv').config()
const toast = ToastServive.new({
    place: 'topRight',
    duration: 2,
    maxCount: 8
});

export default class deliverySlip extends Component {
    constructor(props) {
        // console.log('dasdsas')
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            billingAddress: [],
            productDetail: [],
            shippingAddress: [],
            returnAddress: [],
            userDetails: [],
            bookingArray: [],
            get_id: params.booking_id
        }
    }
    componentDidMount() {
        console.log('dasdsas')
        document.title = 'Delivery Slip : Admin Dashboard - Hardwarechacha';
        document.getElementById("global-loader").style.display = "block";
        setTimeout(() => {
            document.getElementById("global-loader").style.display = "none";
        }, 500)
        console.log('dasdsas')
        get('/booking/InvoiceBookingDetails/' + this.state.get_id)
            .then(res => {
                this.setState({
                    billingAddress: res.data.billingAddress,
                    productDetail: res.data.productArray,
                    shippingAddress: res.data.shippingAddress,
                    returnAddress: res.data.returnAddress,
                    userDetails: res.data.userDetails,
                    bookingArray: res.data.bookingArray,
                })
            })
            .catch(err => {

            })
    }
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Delivery Slip Report</h3>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <a href="#"><i className="fe fe-home"></i></a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Admin Dashboard</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body" ref={el => (this.componentRef = el)}>
                                <div className="">
                                    <div className="" style={{ padding: "5px", margin: "5px" }}>
                                        <div className="row" style={{ borderBottom: "solid 1px" }}>
                                            <div className="col-xs-2"></div>
                                            <div className="" style={{ borderLeft: "solid 1px", borderRight: "solid 1px", width: "75%", }}>
                                                <div style={{ padding: "0px 10px" }}>Hardware Logistics</div>
                                                <div className="row" style={{ borderTop: "solid 1px", margin: 0, }}>
                                                    <div className="" style={{ borderRight: "solid 1px", fontSize: "11px", fontWeight: "800", width: "50%", padding: "5px 10px" }}>

                                                        {
                                                            this.state.bookingArray.paymentType == "cod" ?
                                                                <>COD : Rs. {parseInt(this.state.bookingArray.productSellingPrice) + parseInt(this.state.bookingArray.deliveryCharge) - parseInt(this.state.bookingArray.couponDiscount) - parseInt(this.state.bookingArray.walletAmount) - parseInt(this.state.bookingArray.walletPoint)}/-</>
                                                                : <>PAID : Rs. {parseInt(this.state.bookingArray.productSellingPrice) + parseInt(this.state.bookingArray.deliveryCharge) - parseInt(this.state.bookingArray.couponDiscount) - parseInt(this.state.bookingArray.walletAmount) - parseInt(this.state.bookingArray.walletPoint)}/-</>
                                                        }
                                                    </div>
                                                    <div style={{ width: "50%", fontSize: "11px", padding: "5px 10px" }}>
                                                        Order Date : {this.state.bookingArray.orderDate}
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ fontWeight: "800", fontSize: "15px", width: "25%", padding: "0px 10px", margin: "auto" }}>
                                                {Moment(this.state.bookingArray.invoiceDate).format("L")}
                                            </div>
                                        </div>
                                        <div className="row" style={{ borderBottom: "solid 1px" }}>
                                            <div className="" style={{ borderRight: "solid 1px", padding: "14px", width: "50%" }}>
                                                <center>
                                                    <Barcode value={this.state.bookingArray.invoiceNumber} id='divcontents' width='1' height='50' />
                                                    <br />
                                                    <br />
                                                </center>
                                            </div>
                                            <div className="" style={{ padding: "10px", width: "50%", fontSize: "14px" }}>
                                                <span style={{ fontSize: "16px" }}><b>Delivery Address : </b></span><br />
                                                <strong style={{ fontSize: "14px" }}>{this.state.shippingAddress.name}</strong>,
                                                {this.state.shippingAddress.phone},
                                                {String(this.state.shippingAddress.optionalPhone).length > 9 ? <>{this.state.shippingAddress.optionalPhone},</> : null}<br />
                                                {this.state.shippingAddress.address},
                                                {String(this.state.shippingAddress.flat).length > 0 && this.state.shippingAddress.flat != null ? <>{this.state.shippingAddress.flat},</> : null}
                                                {String(this.state.shippingAddress.landmark).length > 0 && this.state.shippingAddress.landmark != null ? <>{this.state.shippingAddress.landmark},</> : null}
                                                {String(this.state.shippingAddress.location).length > 0 && this.state.shippingAddress.location != null ? <>{this.state.shippingAddress.location},</> : null}
                                                {this.state.shippingAddress.city},
                                                {this.state.shippingAddress.district},
                                                {this.state.shippingAddress.state}-
                                                {this.state.shippingAddress.pincode}
                                            </div>
                                        </div>
                                        <div className="row" >
                                            <div className="" style={{ padding: "14px 14px 14px 20px", width: "50%", fontSize: "14px" }}>
                                                <span tyle={{ fontSize: "16px" }}><b>Return Address : </b></span><br />
                                                <strong style={{ fontSize: "14px" }}>{this.state.returnAddress.name}</strong>,
                                                {this.state.returnAddress.phone},
                                                {String(this.state.returnAddress.optionalPhone).length > 9 ? <>{this.state.returnAddress.optionalPhone},</> : null}<br />
                                                {this.state.returnAddress.address},
                                                {String(this.state.returnAddress.flat).length > 0 && this.state.returnAddress.flat != null ? <>{this.state.returnAddress.flat},</> : null}
                                                {String(this.state.returnAddress.landmark).length > 0 && this.state.returnAddress.landmark != null ? <>{this.state.returnAddress.landmark},</> : null}
                                                {String(this.state.returnAddress.location).length > 0 && this.state.returnAddress.location != null ? <>{this.state.returnAddress.location},</> : null}
                                                {this.state.returnAddress.city},
                                                {this.state.returnAddress.district},
                                                {this.state.returnAddress.state}-
                                                {this.state.returnAddress.pincode}
                                            </div>
                                            <div className="" style={{ padding: "15px", borderLeft: "solid 1px", width: "50%" }}>
                                                <center>
                                                    <QRCode
                                                        value={String(this.state.bookingArray.invoiceNumber)}
                                                        renderAs='svg'
                                                        includeMargin='true'
                                                    />
                                                    <br />
                                                    <span style={{ color: "black", fontWeight: 500 }}>{this.state.bookingArray.invoiceNumber} </span>
                                                    <br />


                                                </center>
                                            </div>
                                        </div>
                                        <div className="row" style={{ borderTop: "solid 1px", borderBottom: "solid 1px", fontSize: "14px" }}>
                                            <div style={{ width: "5%" }}></div>
                                            <div style={{ textAlign: "center", borderLeft: "solid 1px", borderTop: "none", width: "25%", padding: "5px 0px" }}>Seller Name</div>
                                            <div style={{ textAlign: "center", borderLeft: "solid 1px", borderTop: "none", width: "30%", padding: "5px 0px" }}>GSTIN</div>
                                            <div style={{ textAlign: "center", borderLeft: "solid 1px", borderTop: "none", width: "25%", padding: "5px 0px" }}>Order ID</div>
                                            <div style={{ textAlign: "center", borderLeft: "solid 1px", width: "15%" }}>Date</div>
                                        </div><div className="row" style={{ height: "200px", borderBottom: "solid 1px", fontSize: "14px" }}>
                                            <div align="center" style={{ width: "5%", padding: "5px 0px" }}>1</div>
                                            <div align="center" style={{ height: "200px", textAlign: "center", borderLeft: "solid 1px", borderTop: "none", width: "25%", padding: "5px 0px" }}>{this.state.bookingArray.vendorCompanyName}</div>
                                            <div align="center" style={{ height: "200px", textAlign: "center", borderLeft: "solid 1px", borderTop: "none", width: "30%", padding: "5px 0px" }}>{this.state.bookingArray.vebdorGst}</div>
                                            <div align="center" style={{ height: "200px", textAlign: "center", borderLeft: "solid 1px", borderTop: "none", width: "25%", padding: "5px 0px" }}>{this.state.bookingArray.orderID}</div>
                                            <div align="center" style={{ height: "200px", textAlign: "center", borderLeft: "solid 1px", width: "15%", padding: "5px 0px" }}>{this.state.bookingArray.orderDate}</div>

                                        </div>
                                        <div className="row">
                                            <div className="" style={{ border: "solid 1px", borderTop: "none", borderLeft: "none", borderRight: "none", width: "40%", padding: "5px 10px", fontSize: "14px" }}>
                                                <center>
                                                    Quality Products.<br />
                                                Delivered Fast
                                            </center>
                                            </div>
                                            <div className="" style={{ border: "solid 1px", borderTop: "none", borderRight: "none", width: "60%", padding: "5px 10px", fontSize: "14px" }}>
                                                The goods sold are<br />
                                                <b>Not For Resale</b>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="" style={{ borderBottom: "solid 1px", borderTop: "none", borderLeft: "none", width: "100%" }}>
                                                <div style={{ marginLeft: "10px", fontSize: "14px" }}>Order Through : HardwareChacha</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="" style={{ borderRight: "solid 1px", borderTop: "none", width: "30%" }}>
                                                <center></center>
                                            </div>
                                            <div className="" style={{ borderRight: "solid 1px", borderTop: "none", width: "30%" }}>
                                                <center>OTY : {this.state.bookingArray.totalQty} </center>
                                            </div>
                                            <div className="" style={{ borderRight: "solid 1px", borderTop: "none", borderLeft: "none", width: "20%" }}>
                                                <center> Pack : 1 </center>
                                            </div>
                                            <div className="" style={{ width: "20%" }}>
                                                <center> Invoice : 1</center>
                                            </div>
                                        </div>

                                    </div>


                                </div>

                            </div>

                        </div>
                        <center><ReactToPrint
                            trigger={() => <a href="javascript:void(0)" className="btn btn-primary" onClick={this.barcodePrint}>Print</a>}
                            content={() => this.componentRef}
                            documentTitle='Hardwarechacha Delivery Slip'
                        /></center><br /><br />
                    </div>

                    <div className="col-md-3">
                    </div>
                </div>

            </div>
        )
    }
}
