import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { get, withoutauthpatch, post } from '../../utils/service'
import queryString from 'query-string';
import ToastServive from 'react-material-toast';
import Moment from 'moment'

const toast = ToastServive.new({
    place: 'topRight',
    duration: 2,
    maxCount: 8
});
export default class Viewbooking extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            billingAddress: [],
            bookingDetails: [],
            deliveryBoy: [],
            productDetail: [],
            returnBoy: [],
            shippingAddress: [],
            userDetails: [],
            get_id: params.booking_id,
            order_status: 0,
            deliveryBoy_Name: [],
            deliverBoy_id: 0,
            deliveryBoyId: 0,
            returnBoyId: 0
        }
    }
    componentDidMount() {
        document.title = 'View Booking Details: Admin Dashboard - Hardwarechacha';
        document.getElementById("global-loader").style.display = "block";
        setTimeout(() => {
            document.getElementById("global-loader").style.display = "none";
        }, 500)
        get('/booking/bookingDetails/' + this.state.get_id)
            .then(res => {

                this.setState({
                    order_status: res.data[0].bookingDetails.orderStatus,
                    deliveryBoyId: res.data[0].bookingDetails.deliveryBoyId,
                    returnBoyId: res.data[0].bookingDetails.returnBoyId,
                    billingAddress: res.data[0].billingAddress,
                    bookingDetails: res.data[0].bookingDetails,
                    deliveryBoy: res.data[0].deliveryBoy,
                    productDetail: res.data[0].productDetail,
                    returnBoy: res.data[0].returnBoy,
                    shippingAddress: res.data[0].shippingAddress,
                    userDetails: res.data[0].userDetails,
                }, () => {

                    get('/address/gerDeliveryBoy/' + this.state.shippingAddress.pincode)
                        .then(res => {

                            this.setState({
                                deliveryBoy_Name: res.data
                            })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                console.log(this.state.deliveryBoyId)
                console.log(this.state.returnBoyId)

            })
            .catch(err => {

            })
    }
    statusChange = (status) => {
        let data
        let now = new Date()
        if (status == 4) {
            data = {
                orderStatus: status,
                deliveryDate: Moment(now).format('YYYY-MM-DD')
            }
            const ddata = {
                order_status: 4,
                user_id: this.state.deliveryBoyId
            }
            post('/wallet/getwithdraw/', ddata)
                .then(res => {
                    console.log(res)
                    toast.success('Delivery Boy Wallet Balance added successfully');
                }).catch(err => {
                    console.log(err)
                })
        }
        else if (status == 6) {
            data = {
                orderStatus: status,
                readyForReturnDate: Moment(now).format('YYYY-MM-DD')
            }
        } else if (status == 8) {
            data = {
                orderStatus: status,
                returnDate: Moment(now).format('YYYY-MM-DD')
            }
            const rdata = {
                order_status: 8,
                user_id: this.state.returnBoyId
            }
            post('/wallet/getwithdraw/', rdata)
                .then(res => {
                    console.log(res)
                    toast.success('Return Boy Wallet Balance added successfully');
                }).catch(err => {
                    console.log(err)
                })

        } else {
            data = {
                orderStatus: status,
            }
        }
        if (status == 3) {
            var sms = "Out for Delivery : Hi " + this.state.userDetails.name + ", Your order will bo delivered today. Our delivery boy Mr." + this.state.deliveryBoy.name + ", Contact number " + this.state.deliveryBoy.phone + " will deliver your order.";
            var subject = 'Out for Delivery';
        } else if (status == 4) {
            var sms = "Delivered : Thank you for ordering with Hardwarechacha, we are delighted to inform you that your order has been successfully delivered. Please check name quantity and expiry of your items and in case of any issue or item missing or wrong item please contact to us.";
            var subject = 'Order Delivered';
        } else if (status == 7) {
            var sms = "Out for Pickup : Hi " + this.state.userDetails.name + ",  Your return items pickup today. Our delivery boy Mr." + this.state.returnBoy.name + ", Contact number " + this.state.returnBoy.phone + " will receive your order.";
            var subject = 'Out for Pickup ';
        } else if (status == 8) {
            var sms = "Returned : Your return items received to admin. Return request is successfully completed and the booking amount is refunded to your Wallet.";
            var subject = 'Order Returned ';
        }






        withoutauthpatch('/booking/submit/' + this.state.get_id, data)
            .then(res => {
                this.setState({
                    order_status: status
                })
            }).catch(err => {

            })

        get('/booking/bookingDetails/' + this.state.get_id)
            .then(res => {
                this.setState({
                    deliveryBoy: res.data[0].deliveryBoy,
                    returnBoy: res.data[0].returnBoy,
                    deliveryBoyId: res.data[0].bookingDetails.deliveryBoyId,
                    returnBoyId: res.data[0].bookingDetails.returnBoyId,
                })
            })
            .catch(err => {
                console.log(err)
            })
        const data11 = {
            body: sms,
            to_email: this.state.userDetails.email,
            subject: subject
        }
        post('/auth/sendmail/', data11)
            .then(res => {

            }).catch(err => {

            })



        const data1 = {
            msg: sms,
            phone_no: this.state.userDetails.phone
        }
        post('/other/getsms/', data1)
            .then(res => {

            }).catch(err => {

            })






    }

    handleChange = (e) => {
        this.setState({
            deliverBoy_id: e.target.value
        })
    }
    handleSubmit = () => {
        const d_data = {
            deliveryBoyId: this.state.deliverBoy_id
        }
        withoutauthpatch('/booking/submit/' + this.state.get_id, d_data)
            .then(res => {
                this.setState({
                    deliveryBoyId: 1
                })
                toast.success('Delivery Boy added successfully');
                var active = document.querySelector(".show");
                active.classList.remove("show");
                document.querySelector(".show").style.display = 'none';
                window.location.reload()
            }).catch(err => {

            })
        get('/address/gerDeliveryBoy/' + this.state.shippingAddress.pincode)
            .then(res => {

                this.setState({
                    deliveryBoy_Name: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
        get('/booking/bookingDetails/' + this.state.get_id)
            .then(res => {
                this.setState({
                    deliveryBoy: res.data[0].deliveryBoy,
                    returnBoy: res.data[0].returnBoy,
                    deliveryBoyId: res.data[0].bookingDetails.deliveryBoyId,
                    returnBoyId: res.data[0].bookingDetails.returnBoyId,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    handleSubmit1 = () => {
        const d_data = {
            returnBoyId: this.state.deliverBoy_id
        }
        withoutauthpatch('/booking/submit/' + this.state.get_id, d_data)
            .then(res => {
                this.setState({
                    returnBoyId: 1
                })
                toast.success('Return Boy added successfully');
                var active = document.querySelector(".show");
                active.classList.remove("show");
                document.querySelector(".show").style.display = 'none';
                window.location.reload()
            }).catch(err => {

            })
        get('/booking/bookingDetails/' + this.state.get_id)
            .then(res => {
                this.setState({
                    deliveryBoy: res.data[0].deliveryBoy,
                    returnBoy: res.data[0].returnBoy,
                    deliveryBoyId: res.data[0].bookingDetails.deliveryBoyId,
                    returnBoyId: res.data[0].bookingDetails.returnBoyId,
                })
            })
            .catch(err => {
                console.log(err)
            })
        get('/address/gerDeliveryBoy/' + this.state.shippingAddress.pincode)
            .then(res => {

                this.setState({
                    deliveryBoy_Name: res.data
                })
            })
            .catch(err => {
                console.log(err)
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
                                        <h3 className="logo mb-0">#Order ID-{this.state.bookingDetails.OrderID}</h3>
                                    </div>
                                    <div className="float-right">
                                        <h3 className="mb-0">Date: {this.state.bookingDetails.orderDate}</h3>
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
                                                    {this.state.billingAddress.flat}<br />
                                                    {this.state.billingAddress.location}<br />
                                                    {this.state.billingAddress.address}<br />
                                                    {this.state.billingAddress.city},
                                                {this.state.billingAddress.district},
                                                {this.state.billingAddress.state}<br />
                                                    {this.state.billingAddress.pincode}

                                                </address>
                                            </div>
                                            <div className="float-right text-right">
                                                <h4><strong>Shipping Address: </strong></h4>
                                                <address>
                                                    <strong>{this.state.shippingAddress.name}</strong><br />
                                                Phone: {this.state.shippingAddress.phone}<br />
                                                    {this.state.shippingAddress.flat}<br />
                                                    {this.state.shippingAddress.landmark}<br />
                                                    {this.state.shippingAddress.location}<br />
                                                    {this.state.shippingAddress.address}<br />
                                                    {this.state.shippingAddress.city}, {this.state.shippingAddress.district}, {this.state.shippingAddress.state}<br />

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
                                                            <th>
                                                                Product<br />
                                                            Order ID
                                                        </th>
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

                                                            <th>Action</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{this.state.bookingDetails.OrderID}</td>
                                                            <td>{this.state.productDetail.productCode}</td>
                                                            <td><a href={"/productDetails?id=" + this.state.productDetail.productID}>{this.state.productDetail.productName}</a><br />
                                                                <b>Size</b> : {this.state.productDetail.size}, <b>Color</b> : {this.state.productDetail.color}
                                                            </td>

                                                            {/* <td>{this.state.productDetail.size}</td>
                                                            <td>{this.state.productDetail.color}</td> */}
                                                            <td>&#8377;{Math.round(this.state.bookingDetails.productSellingPrice)}</td>

                                                            <td>{this.state.bookingDetails.qty}</td>

                                                            <td className="text-right">{(Math.round(this.state.bookingDetails.productSellingPrice)) * parseInt(this.state.bookingDetails.qty)}</td>

                                                            <td className="text-center">
                                                                <Link to={"invoice?booking_id=" + this.state.get_id} className="btn btn-primary btn-sm">Invoice</Link>
                                                                <Link to={"deliverySlip?booking_id=" + this.state.get_id} className="btn btn-info btn-sm">Delivery Slip</Link>
                                                            </td>

                                                            <td className="text-center">
                                                                {this.state.order_status == 1 ?
                                                                    <>
                                                                        <span className="badge badge-primary">Order Under Process</span><br />
                                                                        <a onClick={() => this.statusChange(2)} style={{ cursor: 'pointer' }} className="btn btn-info btn-sm text-white">Order In Transit</a>
                                                                    </> :
                                                                    this.state.order_status == 2 ?
                                                                        <>
                                                                            <span className="badge badge-primary">Order In Transit</span><br />
                                                                            {this.state.deliveryBoyId == 0 ?
                                                                                <button type="button" class="btn  btn-sm btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                                                                                    Select Delivery Boy
                                                            </button>
                                                                                :
                                                                                <>
                                                                                    <a onClick={() => this.statusChange(3)} style={{ cursor: 'pointer' }} className="btn btn-success btn-sm text-white">Out for Delivery</a><br /><br />
                                                                                    <b>Delivery Boy Details :</b><br />
                                                                                    <span className="">{this.state.deliveryBoy.name}<br />
                                                                                        {this.state.deliveryBoy.phone}
                                                                                    </span>
                                                                                </>
                                                                            }
                                                                        </> :
                                                                        this.state.order_status == 3 ?
                                                                            <>
                                                                                <span className="badge badge-primary">Out for Delivery</span><br />

                                                                                <a onClick={() => this.statusChange(4)} style={{ cursor: 'pointer' }} className="btn btn-success btn-sm text-white">Delivered</a><br /><br />
                                                                                <b>Delivery Boy Details :</b><br />
                                                                                <span className="">{this.state.deliveryBoy.name}<br />
                                                                                    {this.state.deliveryBoy.phone}
                                                                                </span>
                                                                            </> :
                                                                            this.state.order_status == 4 ?
                                                                                <>
                                                                                    <span className="badge badge-primary">Delivered</span><br />
                                                                                    <b>Delivery Boy Details :</b><br />
                                                                                    <span className="">{this.state.deliveryBoy.name}<br />
                                                                                        {this.state.deliveryBoy.phone}
                                                                                    </span>
                                                                                    {/* <a onClick={()=>this.statusChange(5)} style={{cursor:'pointer'}} className="btn btn-success btn-sm text-white">Return Under Process</a> */}
                                                                                </> :
                                                                                this.state.order_status == 5 ?
                                                                                    <>
                                                                                        <span className="badge badge-primary">Return Under Process</span><br />
                                                                                        {this.state.returnBoyId == 0 ?
                                                                                            <button type="button" class="btn  btn-sm btn-primary" data-toggle="modal" data-target="#exampleModalCenter1">
                                                                                                Select Return Boy
                                                            </button>
                                                                                            :
                                                                                            <>
                                                                                                <a onClick={() => this.statusChange(6)} style={{ cursor: 'pointer' }} className="btn btn-success btn-sm text-white">Ready for Return</a><br /><br />
                                                                                                <b>Return Boy Details :</b><br />
                                                                                                <span className="">{this.state.returnBoy.name}<br />
                                                                                                    {this.state.returnBoy.phone}
                                                                                                </span>
                                                                                            </>

                                                                                        }

                                                                                    </> :
                                                                                    this.state.order_status == 6 ?
                                                                                        <>
                                                                                            <span className="badge badge-primary">Ready for Return</span><br />
                                                                                            <a onClick={() => this.statusChange(7)} style={{ cursor: 'pointer' }} className="btn btn-success btn-sm text-white">Out for Pickup</a><br /><br />
                                                                                            <b>Return Boy Details :</b><br />
                                                                                            <span className="">{this.state.returnBoy.name}<br />
                                                                                                {this.state.returnBoy.phone}
                                                                                            </span>
                                                                                        </> :
                                                                                        this.state.order_status == 7 ?
                                                                                            <>
                                                                                                <span className="badge badge-primary">Out for Pickup</span><br />
                                                                                                <a onClick={() => this.statusChange(8)} style={{ cursor: 'pointer' }} className="btn btn-success btn-sm text-white">Return</a>
                                                                                                <br />
                                                                                                <b>Return Boy Details :</b><br />
                                                                                                <span className="">{this.state.returnBoy.name}<br />
                                                                                                    {this.state.returnBoy.phone}
                                                                                                </span>
                                                                                            </> :
                                                                                            this.state.order_status == 8 ?
                                                                                                <>
                                                                                                    <span className="badge badge-danger">Returned</span><br />
                                                                                                    <b>Return Boy Details :</b><br />
                                                                                                    <span className="">{this.state.returnBoy.name}<br />
                                                                                                        {this.state.returnBoy.phone}
                                                                                                    </span>
                                                                                                    {/* <a onClick={()=>this.statusChange(9)} style={{cursor:'pointer'}} className="btn btn-danger btn-sm text-white">Cancel</a> */}
                                                                                                </> :
                                                                                                this.state.order_status == 9 ?
                                                                                                    <>
                                                                                                        <span className="badge badge-danger">Canceled</span><br />
                                                                                                        {/* <a onClick={()=>this.statusChange(1)} style={{cursor:'pointer'}} className="btn btn-success btn-sm text-white">Order Under Process</a> */}
                                                                                                    </> :
                                                                                                    null
                                                                }


                                                                <br />
                                                            </td>
                                                        </tr>


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLongTitle">Deliver Boy</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">

                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label>Delivery Boy List:</label>
                                                                <select className="form-control" defaultValue={0} name="deliverboy" onChange={this.handleChange} required>
                                                                    <option disabled value="0">--Select Delivery Boy-- </option>
                                                                    {this.state.deliveryBoy_Name.map((object, i) => (
                                                                        <>
                                                                            <option value={object.id}>{object.name}</option>

                                                                        </>
                                                                    ))}

                                                                </select>
                                                                <span className="text-danger"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="button" onClick={this.handleSubmit} className="btn btn-primary">Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal fade" id="exampleModalCenter1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLongTitle">Deliver Boy</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">

                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label>Delivery Boy List:</label>
                                                                <select className="form-control" name="deliverboy" onChange={this.handleChange} required>
                                                                    <option disabled selected defaultValue="0">--Select Delivery Boy-- </option>
                                                                    {this.state.deliveryBoy_Name.map((object, i) => (
                                                                        <>
                                                                            <option value={object.id}>{object.name}</option>

                                                                        </>
                                                                    ))}

                                                                </select>
                                                                <span className="text-danger"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="button" onClick={this.handleSubmit1} className="btn btn-primary">Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-4 col-12 offset-xl-8">
                                            <p className="text-right mt-3 font-weight-600">Sub-total: ₹{(parseInt(this.state.bookingDetails.productSellingPrice)) * parseInt(this.state.bookingDetails.qty)}</p>
                                            <p className="text-right mt-3 font-weight-600">Coupon Discount: ₹{parseInt(this.state.bookingDetails.couponDiscount)}</p>
                                            <p className="text-right mt-3 font-weight-600">Delivery Charge: ₹{parseInt(this.state.bookingDetails.deliveryCharge)}</p>

                                            <hr />
                                            <h4 className="text-right text-xl">Grand Total : ₹{(parseInt(this.state.bookingDetails.productSellingPrice) + parseInt(this.state.bookingDetails.productGST)) * parseInt(this.state.bookingDetails.qty) + parseInt(this.state.bookingDetails.deliveryCharge) - parseInt(this.state.bookingDetails.couponDiscount) - parseInt(this.state.bookingDetails.walletAmount) - parseInt(this.state.bookingDetails.walletPoint)}</h4>
                                            {/* 
                                            {obj.bookingDetails.paymentType != 'wallet' ?
                                                obj.bookingDetails.paymentType
                                                : null
                                            } */}

                                            {
                                                this.state.bookingDetails.paymentType == "wallet" ?
                                                    // <h5 className="text-right text-xl" style={{ marginBottom: 0 }}><span className="badge badge-default">{ this.state.bookingDetails.paymentType}</span></h5>
                                                    null
                                                    :
                                                    <>
                                                        <h5 className="text-right text-xl" style={{ marginBottom: 0 }}><span className="badge badge-default">{this.state.bookingDetails.paymentType}</span></h5>
                                                        <h5 className="text-right"><span className="badge badge-danger" style={{ fontSize: "12px" }}>Transaction ID - {this.state.bookingDetails.razorpayPaymentId}</span></h5>
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

            </div>
        )
    }
}
