import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { get, withoutauthpatch, post } from '../../utils/service'
import queryString from 'query-string';
import Moment from 'moment'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ToastContainer, toast } from 'react-toastify';

export default class BookingDetails extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            billingAddress: [],
            productDetail: [],
            shippingAddress: [],
            userDetails: [],
            bookingArray: [],
            get_id: params.booking_id,
            BookingStatus: params.status,
            OrderID: '',
            modalStatus: false,
            reasonModalStatus: false,
            status: 0,
            name: '',
            phone: '',
            reasonType: "",
            reasonArr: []
        }
    }
    componentDidMount() {
        document.title = 'View Booking Details: Admin Dashboard - Hardwarechacha';
        document.getElementById("global-loader").style.display = "block";
        setTimeout(() => {
            document.getElementById("global-loader").style.display = "none";
        }, 500)
        this.getData()
        console.log('dffd')
    }
    getData = () => {
        console.log('getData')
        console.log(this.state.BookingStatus)
        get('/booking/newBookingDetails/' + this.state.get_id + '/' + this.state.BookingStatus)
            .then(res => {
                this.setState({
                    billingAddress: res.data.billingAddress,
                    productDetail: res.data.productArray,
                    shippingAddress: res.data.shippingAddress,
                    userDetails: res.data.userDetails,
                    bookingArray: res.data.bookingArray,

                })
            })
            .catch(err => {

            })
    }
    statusChange = (status, name, phone) => {
        const data = {
            status: status,
            name: name,
            phone: phone
        }
        post('/booking/statusChange/' + this.state.get_id, data)
            .then(res => {
                toast.dark(res.data.status, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                if (status == 3) {
                    var queryParams = new URLSearchParams(window.location.search);
                    queryParams.set("status", 2);
                    this.props.history.push("/Viewbooking?" + queryParams.toString());
                    this.setState({
                        BookingStatus: 2
                    }, () => {
                        this.getData()
                    })
                } else if (status == 7) {
                    var queryParams = new URLSearchParams(window.location.search);
                    queryParams.set("status", 5);
                    this.props.history.push("/Viewbooking?" + queryParams.toString());
                    this.setState({
                        BookingStatus: 5
                    }, () => {
                        this.getData()
                    })
                } else {
                    this.getData()
                }
            })
            .catch(err => {

            })


    }
    onCloseModal = () => {
        // var queryParams = new URLSearchParams(window.location.search);
        // queryParams.set("status", 2);
        // console.log("/Viewbooking?" + queryParams.toString())
        // // this.props.history.replaceState(null, null, "?" + queryParams.toString());
        // // this.props.history.replaceState(null, null, "?" + queryParams.toString())
        // //  this.props.history.replaceState("?" + queryParams.toString())
        this.setState({
            modalStatus: false,
            status: 0
        })
    }
    onCloseReasonModal = () => {
        this.setState({
            reasonModalStatus: false,
            reasonType: '',
            reasonArr: []
        })
    }
    openModel = (status) => {
        console.log(this.state.bookingArray.invoiceNumber)
        if (status == 2) {
            if (String(this.state.bookingArray.invoiceNumber).length > 2 && this.state.bookingArray.invoiceNumber != null) {
                this.setState({
                    status: status,
                    modalStatus: true
                })
            } else {
                toast.error('Please Generate Invoice First.', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            this.setState({
                status: status,
                modalStatus: true
            })
        }

    }
    handleModalSave = () => {
        console.log('save')
        if (String(this.state.name).length > 0) {
            if (String(this.state.phone).length > 0) {
                if (String(this.state.phone).length == 10) {
                    //replace status url



                    this.statusChange(this.state.status, this.state.name, this.state.phone)
                    this.setState({
                        status: 0,
                        name: "",
                        phone: '',
                        modalStatus: false
                    })
                } else {
                    toast.error('Please Enter Valid Contact Number', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } else {
                toast.error('Please Enter Contact Number', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            toast.error('Please Enter Name', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }
    handleInvoiceClick = (status) => {
        const data = {
            'status': status
        }
        post('/booking/invoiceGenerate/' + this.state.get_id, data)
            .then(res => {
                toast.dark(res.data.status, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.getData()
            })
            .catch(err => {

            })
    }
    reasonModal = (type, reasonArr) => {
        console.log(reasonArr)
        this.setState({
            reasonModalStatus: true,
            reasonArr: reasonArr,
            reasonType: type
        })
    }
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Booking Details</h3>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <a href="#"><i className="fe fe-home"></i></a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Booking Details</li>
                    </ol>
                </div>
                <div className="row invoice">
                    <div className="col-md-12">
                        <div className="card-box card shadow">
                            <div className="card-body border-bottom">
                                <div className="clearfix">
                                    <div className="float-left">
                                        <h3 className="logo mb-0">#Order ID-{this.state.bookingArray.orderID}</h3>
                                    </div>
                                    <div className="float-right">
                                        <h3 className="mb-0">Date: {this.state.bookingArray.orderDate}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="mb-0">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="float-left">
                                                <h4><strong>Customer Details: </strong></h4>
                                                <address>
                                                    {/* <div style={{ fontSize: "16px" }}>Customer ID : <b style={{ fontSize: "20px" }}>{this.state.userDetails.customerID}</b></div> */}

                                                    <strong>{this.state.userDetails.name}</strong><br />
                                                    {this.state.userDetails.email}<br />
                                                Phone: {this.state.userDetails.phone}<br />
                                                    {this.state.billingAddress.flat},
                                                                {String(this.state.billingAddress.location).length > 2 && this.state.billingAddress.location != null ? <>{this.state.billingAddress.location},</> : null}
                                                    <br />
                                                    {this.state.billingAddress.address},
                                                        {this.state.billingAddress.city},<br />
                                                    {this.state.billingAddress.district},
                                                        {this.state.billingAddress.state}-
                                                        {this.state.billingAddress.pincode}

                                                </address>
                                            </div>
                                            <div className="float-right text-right">
                                                <h4><strong>Shipping Address: </strong></h4>
                                                <address>
                                                    <strong style={{ fontSize: "14px" }}>{this.state.shippingAddress.name}</strong>,
<br />
                                                       Phone: {this.state.shippingAddress.phone},

                                                        {String(this.state.shippingAddress.optionalPhone).length > 9 ? <>{this.state.shippingAddress.optionalPhone},</> : null}
                                                    <br />
                                                    {this.state.shippingAddress.address},
                                                        {String(this.state.shippingAddress.flat).length > 2 && this.state.shippingAddress.flat != null ? <>{this.state.shippingAddress.flat},</> : null}
                                                    {String(this.state.shippingAddress.landmark).length > 2 && this.state.shippingAddress.landmark != null ? <>{this.state.shippingAddress.landmark},</> : null}
                                                    <br />
                                                    {String(this.state.shippingAddress.location).length > 2 && this.state.shippingAddress.location != null ? <>{this.state.shippingAddress.location},</> : null}

                                                    {this.state.shippingAddress.city},
                                                        {this.state.shippingAddress.district}, <br />
                                                    {this.state.shippingAddress.state}-
                                                        {this.state.shippingAddress.pincode}
                                                </address>
                                            </div>
                                        </div>

                                    </div>


                                    <div className="row mt-4">
                                        <div className="col-md-12">
                                            <div className="table-responsive">
                                                <table className="table table-bordered m-t-30 text-nowrap">
                                                    <thead>
                                                        <tr>
                                                            {/* <th>
                                                                Product<br />
                                                            Order ID
                                                        </th> */}
                                                            <th>
                                                                Product <br />
                                                            Code
                                                        </th>
                                                            <th>
                                                                Product <br />
                                                            Details
                                                        </th>
                                                            {/* <th>
                                                                Product <br />
                                                            Size
                                                        </th>
                                                            <th>
                                                                Product <br />
                                                            Color
                                                        </th> */}
                                                            <th>Price</th>
                                                            <th>Quantity</th>

                                                            <th className="text-right">Amount(RS)</th>

                                                            {/* <th>Action</th> */}
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.productDetail.map((obj, i) =>
                                                                <tr>
                                                                    {/* <td>{obj.bookingDetails.OrderID}</td> */}
                                                                    <td>{obj.productCode}</td>
                                                                    <td><a href={"/productDetails?id=" + obj.productID}>{obj.productName}</a><br />
                                                                        <b>Size</b> : {obj.size}, <b>Color</b> : {obj.color}
                                                                    </td>

                                                                    {/* <td>{obj.productDetail.size}</td>
                                                            <td>{obj.productDetail.color}</td> */}
                                                                    <td>&#8377;{Math.round(obj.productSellingPrice)}</td>

                                                                    <td>{obj.qty}</td>

                                                                    <td className="text-right">&#8377;{(Math.round(obj.productSellingPrice)) * parseInt(obj.qty)}</td>


                                                                    <td className="text-center">
                                                                        {
                                                                            obj.orderStatus == 1 ?
                                                                                <><span className="badge badge-primary">Order Under Process</span><br /></> :
                                                                                obj.orderStatus == 2 ?
                                                                                    <><span className="badge badge-primary">Order In Transit</span><br /></> :
                                                                                    obj.orderStatus == 3 ?
                                                                                        <><span className="badge badge-primary">Out for Delivery</span><br /></> :
                                                                                        obj.orderStatus == 4 ?
                                                                                            <><span className="badge badge-primary">Delivered</span><br /></> :
                                                                                            obj.orderStatus == 5 ?
                                                                                                <><span className="badge badge-primary">Return Under Process</span><br />
                                                                                                    <button className="btn btn-info btn-sm text-white" onClick={() => this.reasonModal('Return', obj.returnReason)}>View Reason</button>
                                                                                                </> :
                                                                                                obj.orderStatus == 6 ?
                                                                                                    <><span className="badge badge-primary">Ready for Return</span><br />
                                                                                                        <button className="btn btn-info btn-sm text-white" onClick={() => this.reasonModal('Return', obj.returnReason)}>View Reason</button>
                                                                                                    </> :
                                                                                                    obj.orderStatus == 7 ?
                                                                                                        <><span className="badge badge-primary">Out for Pickup</span><br />
                                                                                                            <button className="btn btn-info btn-sm text-white" onClick={() => this.reasonModal('Return', obj.returnReason)}>View Reason</button>
                                                                                                        </> :
                                                                                                        obj.orderStatus == 8 ?
                                                                                                            <><span className="badge badge-danger">Returned</span><br />
                                                                                                                <button className="btn btn-info btn-sm text-white" onClick={() => this.reasonModal('Return', obj.returnReason)}>View Reason</button>
                                                                                                            </> :
                                                                                                            obj.orderStatus == 9 ?
                                                                                                                <><span className="badge badge-danger">Canceled</span><br />
                                                                                                                    <button className="btn btn-info btn-sm text-white" onClick={() => this.reasonModal('Cancel', obj.cancelReason)}>View Reason</button>
                                                                                                                </> :

                                                                                                                null
                                                                        }


                                                                        <br />
                                                                    </td>
                                                                </tr>


                                                            )
                                                        }


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-xl-8 col-8">
                                            <table style={{ borderCollapse: "collapse", border: "solid 1px", margin: "150px 50px 0", padding: "20px" }}>
                                                <tr>
                                                    <td style={{ textAlign: "center", border: "solid 1px", padding: "20px 25px" }}>
                                                        {
                                                            this.state.bookingArray.orderStatus == 1 ?
                                                                <><span className="badge badge-primary">Order Under Process</span><br />
                                                                    <a onClick={() => this.statusChange(1, '', 0)} style={{ cursor: 'pointer' }} className="btn btn-info btn-sm text-white">Order In Transit</a>
                                                                </> :
                                                                this.state.bookingArray.orderStatus == 2 ?
                                                                    <><span className="badge badge-primary">Order In Transit</span><br />
                                                                        <a onClick={() => this.openModel(2)} style={{ cursor: 'pointer' }} className="btn btn-info btn-sm text-white">Out for Delivery</a>
                                                                    </> :
                                                                    this.state.bookingArray.orderStatus == 3 ?
                                                                        <><span className="badge badge-primary">Out for Delivery</span><br />
                                                                            <a onClick={() => this.statusChange(3, '', 0)} style={{ cursor: 'pointer' }} className="btn btn-info btn-sm text-white">Delivered</a>
                                                                        </> :
                                                                        this.state.bookingArray.orderStatus == 4 ?
                                                                            <><span className="badge badge-primary">Delivered</span><br />
                                                                                {/* <a onClick={() => this.statusChange(2)} style={{ cursor: 'pointer' }} className="btn btn-info btn-sm text-white">Order In Transit</a> */}
                                                                            </> :
                                                                            this.state.bookingArray.orderStatus == 5 ?
                                                                                <><span className="badge badge-primary">Return Under Process</span><br />
                                                                                    <a onClick={() => this.statusChange(5, '', 0)} style={{ cursor: 'pointer' }} className="btn btn-info btn-sm text-white">Ready for Return</a>
                                                                                </> :
                                                                                this.state.bookingArray.orderStatus == 6 ?
                                                                                    <><span className="badge badge-primary">Ready for Return</span><br />
                                                                                        <a onClick={() => this.openModel(6)} style={{ cursor: 'pointer' }} className="btn btn-info btn-sm text-white">Out for Pickup</a>
                                                                                    </> :
                                                                                    this.state.bookingArray.orderStatus == 7 ?
                                                                                        <><span className="badge badge-primary">Out for Pickup</span><br />
                                                                                            <a onClick={() => this.statusChange(7, '', 0)} style={{ cursor: 'pointer' }} className="btn btn-info btn-sm text-white">Returned</a>
                                                                                        </> :
                                                                                        this.state.bookingArray.orderStatus == 8 ?
                                                                                            <><span className="badge badge-danger">Returned</span><br />
                                                                                                {/* <a onClick={() => this.statusChange(2)} style={{ cursor: 'pointer' }} className="btn btn-info btn-sm text-white">Order In Transit</a> */}
                                                                                            </> :
                                                                                            this.state.bookingArray.orderStatus == 9 ?
                                                                                                <><span className="badge badge-danger">Canceled</span><br />
                                                                                                    {/* <a onClick={() => this.statusChange(2)} style={{ cursor: 'pointer' }} className="btn btn-info btn-sm text-white">Order In Transit</a> */}
                                                                                                </> :
                                                                                                null
                                                        }
                                                    </td>
                                                    {
                                                        this.state.bookingArray.orderStatus != 1 && this.state.bookingArray.orderStatus != 9 ?
                                                            <td style={{ textAlign: "center", border: "solid 1px", padding: "20px 25px" }}>
                                                                {this.state.bookingArray.invoiceNumber == null ?
                                                                    <>
                                                                        <a style={{ cursor: 'pointer' }} onClick={() => this.handleInvoiceClick(this.state.bookingArray.orderStatus)} className="btn btn-primary btn-sm text-white">Generate Invoice & Delivery Slip</a>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <span style={{ fontSize: "13px" }}>Invoice Number : <b>{this.state.bookingArray.invoiceNumber}</b></span><br />
                                                                        <Link to={"invoice?booking_id=" + this.state.bookingArray.invoiceNumber} style={{ cursor: 'pointer' }} className="btn btn-primary btn-sm text-white">Invoice</Link>
                                                                        <Link to={"deliverySlip?booking_id=" + this.state.bookingArray.invoiceNumber} style={{ cursor: 'pointer' }} className="btn btn-primary btn-sm text-white">Delivery Slip</Link>
                                                                    </>

                                                                }
                                                            </td>
                                                            : null
                                                    }

                                                </tr>
                                                {
                                                    this.state.bookingArray.orderStatus == 3 || this.state.bookingArray.orderStatus == 4 || this.state.bookingArray.orderStatus == 5 || this.state.bookingArray.orderStatus == 6 || this.state.bookingArray.orderStatus == 7 || this.state.bookingArray.orderStatus == 8 ?
                                                        <tr>
                                                            <td colSpan="2" style={{ padding: "10px 15px", border: "solid 1px" }}>
                                                                <b style={{ fontSize: "15px" }}>Delivery Details</b><br />
                                                                <span style={{ fontSize: "13px" }}>Delivery Boy Name : {this.state.bookingArray.deliveryBoyName}</span><br />
                                                                <span style={{ fontSize: "13px" }}>Delivery Boy Phone No. : {this.state.bookingArray.deliveryBoyPhone}</span><br />
                                                                {
                                                                    this.state.bookingArray.orderStatus > 3 ?
                                                                        <span style={{ fontSize: "13px" }}>Delivery Date : {this.state.bookingArray.orderDate}</span>
                                                                        : null
                                                                }

                                                            </td>
                                                        </tr>
                                                        : null
                                                }

                                                <tr>
                                                    {
                                                        this.state.bookingArray.orderStatus == 7 || this.state.bookingArray.orderStatus == 8 ?

                                                            <td colSpan="2" style={{ padding: "10px 15px" }}>
                                                                <b style={{ fontSize: "15px" }}>Return Details</b><br />
                                                                <span style={{ fontSize: "13px" }}>Return Boy Name : {this.state.bookingArray.returnBoyName}</span><br />
                                                                <span style={{ fontSize: "13px" }}>Return Boy Phone No. : {this.state.bookingArray.returnBoyPhone}</span><br />
                                                                {
                                                                    this.state.bookingArray.orderStatus == 8 ?
                                                                        <span style={{ fontSize: "13px" }}>Return Date : {this.state.bookingArray.returnDate}</span>
                                                                        : null
                                                                }

                                                            </td>
                                                            : null
                                                    }
                                                </tr>

                                            </table>
                                        </div>
                                        <div className="col-xl-4 col-4">
                                            <p className="text-right mt-3 font-weight-600">Sub-total: ₹{parseInt(this.state.bookingArray.productSellingPrice)}</p>
                                            <p className="text-right mt-3 font-weight-600">Coupon Discount: ₹{parseInt(this.state.bookingArray.couponDiscount)}</p>
                                            
                                            <p className="text-right mt-3 font-weight-600">Delivery Charge: ₹{parseInt(this.state.bookingArray.deliveryCharge)}</p>

                                            <hr />
                                            <h4 className="text-right text-xl">Grand Total : ₹{parseInt(this.state.bookingArray.productSellingPrice) + parseInt(this.state.bookingArray.deliveryCharge) - parseInt(this.state.bookingArray.couponDiscount) - parseInt(this.state.bookingArray.walletAmount) - parseInt(this.state.bookingArray.walletPoint)}</h4>
                                            {/* 
                                            {obj.bookingArray.paymentType != 'wallet' ?
                                                obj.bookingArray.paymentType
                                                : null
                                            } */}

                                            {
                                                this.state.bookingArray.paymentType == "wallet" ?
                                                    // <h5 className="text-right text-xl" style={{ marginBottom: 0 }}><span className="badge badge-default">{ this.state.bookingArray.paymentType}</span></h5>
                                                    null
                                                    :
                                                    <>
                                                        <h5 className="text-right text-xl" style={{ marginBottom: 0 }}><span className="badge badge-default">{this.state.bookingArray.paymentType}</span></h5>
                                                        <h5 className="text-right"><span className="badge badge-danger" style={{ fontSize: "12px" }}>Transaction ID - {this.state.bookingArray.razorpayPaymentId}</span></h5>
                                                    </>
                                            }

                                        </div>
                                    </div>
                                    <hr />


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal open={this.state.modalStatus} onClose={this.onCloseModal} center>
                    <div style={{ width: "40vw" }}>
                        {
                            this.state.status == 2 ?
                                <h2>Delivery Details</h2>
                                : <h2>Return Details</h2>
                        }
                        <hr style={{ margin: "10px" }} />
                        <div className="row">
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Name</label>
                                    <input type="text" class="form-control" name="name" value={this.state.name} placeholder="Enter Name" onChange={this.handleChange} style={{ border: "1px solid rgb(0 0 0 / 34%) !important" }} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Contact Number</label>
                                    <input type="number" class="form-control" name="phone" value={this.state.phone} placeholder="Enter Contact Number" onChange={this.handleChange} style={{ border: "1px solid rgb(0 0 0 / 34%) !important" }} />
                                </div>
                            </div>
                        </div>
                        <center><button className="btn btn-primary" onClick={this.handleModalSave}>Save</button></center>
                    </div>
                </Modal>

                <Modal open={this.state.reasonModalStatus} onClose={this.onCloseReasonModal} center>
                    <div style={{ width: "25vw" }}>
                        {
                            this.state.reasonType == 'Cancel' ?
                                <h2>Cancel Reason</h2>
                                : <h2>Return Reason</h2>
                        }
                        <hr style={{ margin: "10px" }} />
                        <div className="row" style={{ padding: "10px" }}>
                            <h4>Reason Option <br /><span style={{ fontWeight: "100" }}>{this.state.reasonArr.reason}</span><br /><br />
                                <h4>Optional Message </h4>
                                <span>{this.state.reasonArr.msg}</span>

                            </h4><br />
                            {/* <span>{this.state.reasonArr.reason}</span><br /><br /> */}
                        </div>
                        {/* <center><button className="btn btn-primary" onClick={this.handleModalSave}>Save</button></center> */}
                    </div>
                </Modal>
                <ToastContainer />
            </div>
        )
    }
}
