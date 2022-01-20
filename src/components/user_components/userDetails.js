import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { get, post } from '../../utils/service';
import queryString from 'query-string';
import Moment from 'moment-js';
import { MdContentCopy } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import copy from 'copy-to-clipboard'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
export default class userDetails extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            id: params.id,
            userArr: [],
            walletArr: [],
            pointArr: [],
            referArr: [],
            bookingArr: [],
            referrerDetails: [],
            modalStatus: false,
            newReferCode: '',
            referError: "",
            walletType: true,
            subscribeModal: false,
            subscribeOrderID: '',
            subscribeTransID: '',
            pointModal: false,
            extraPoint: 0,
            pointRemarks: '',
            extraPointType: 'CREDIT',
            manualType: ''

        }
    }
    componentDidMount() {
        document.title = 'User Details : Admin Dashboard - Crowd';
        get('/userDetails/UserDetailsAdmin/' + this.state.id)
            .then((res) => {
                this.setState({
                    userArr: res.data.userArr,
                    walletArr: res.data.walletArr.filter(item => item.walletType == 'MONEY'),
                    pointArr: res.data.walletArr.filter(item => item.walletType == 'REWARDS'),
                    referArr: res.data.referArr,
                    bookingArr: res.data.bookingArr,
                    referrerDetails: res.data.referrerArr
                })
            }).catch((err) => {
                console.log(err)
            })
    }
    getHistory = () => {
        return this.state.bookingArr.map((obj, i) => {
            return (
                <tr key={i}>
                    <td>{obj.orderId[0].date}</td>
                    <td>
                        {obj.orderId.map((obj1, j) => {
                            return (
                                <>
                                    <Link to={"/Viewbooking?booking_id=" + obj1.booking_id}>{obj1.OrderID}</Link>, </>
                            );

                        })}
                    </td>
                    <td>&#8377;{obj.bookingPayment.grandTotal}</td>


                </tr>
            )
        })
    }
    handleCopy = (referCode) => {
        copy(referCode);
        toast.dark('Referral Code successfully copied!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }
    onCloseModal = () => {
        this.setState({
            modalStatus: false,
            subscribeModal: false,
            pointModal: false,
            manualType:''
        })
    }
    onOpenModal = () => {
        this.setState({
            newReferCode: this.state.userArr.referrerCode,
            referError: '',
            modalStatus: true
        })
    }
    handleReferrer = () => {
        if (this.state.userArr.subscriptionStatus == true) {
            // this.onCloseModal()
            toast.error('User already subscribe power.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            const data = {
                id: this.state.userArr.id,
                refer_code: this.state.newReferCode
            }
            post('/auth/updateReffer/', data)
                .then((res1) => {
                    if (res1.status == 200) {
                        if (res1.data.msg == 1) {
                            get('/userDetails/UserDetailsAdmin/' + this.state.id)
                                .then((res) => {
                                    this.setState({
                                        userArr: res.data.userArr,
                                        walletArr: res.data.walletArr.filter(item => item.walletType == 'MONEY'),
                                        pointArr: res.data.walletArr.filter(item => item.walletType == 'REWARDS'),
                                        referArr: res.data.referArr,
                                        bookingArr: res.data.bookingArr,
                                        referrerDetails: res.data.referrerArr
                                    })
                                }).catch((err) => {
                                    console.log(err)
                                })
                            this.onCloseModal()
                            toast.dark('Referrer Details Update Successfully', {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        } else if (res1.data.msg == 2) {
                            toast.error('Please enter a valid refer code.', {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        } else if (res1.data.msg == 3) {
                            toast.error('Refer code must be a power user.', {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });

                        } else if (res1.data.msg == 4) {
                            toast.error('Refer code must be a user.', {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        } else {
                            toast.error('Cannot enter user own refer code.', {
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
                        toast.error('Somethings Wrong! Please try again later.', {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                }).catch((err) => {
                    console.log(err)
                })
        }

    }
    handlePowerModalOpen = () => {
        this.setState({
            subscribeModal: true
        })
    }
    handlePowerSubmit = () => {
        console.log(1)
        if (String(this.state.subscribeOrderID).length > 0) {
            if (String(this.state.subscribeTransID).length > 0) {
                const data = {
                    user_id: this.state.userArr.id,
                    orderID: this.state.subscribeOrderID,
                    transID: this.state.subscribeTransID,

                }
                post('/userDetails/subscribeFromAdmin/', data)
                    .then((res1) => {
                        this.onCloseModal()
                        get('/userDetails/UserDetailsAdmin/' + this.state.id)
                            .then((res) => {
                                this.setState({
                                    userArr: res.data.userArr,
                                    walletArr: res.data.walletArr.filter(item => item.walletType == 'MONEY'),
                                    pointArr: res.data.walletArr.filter(item => item.walletType == 'REWARDS'),
                                    referArr: res.data.referArr,
                                    bookingArr: res.data.bookingArr,
                                    referrerDetails: res.data.referrerArr
                                })
                            }).catch((err) => {
                                console.log(err)
                            })
                    }).catch((err) => {
                        console.log(err)
                    })
            } else {
                toast.error('Please Enter Transaction ID.', {
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
            toast.error('Please Enter Order ID.', {
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
    handlePointModal = (type) => {
        this.setState({
            pointModal: true,
            extraPoint: '',
            pointRemarks: '',
            extraPointType: 'CREDIT',
            manualType: type
        })
        console.log(type)
    }
    handlePointSubmit = () => {
        if (String(this.state.extraPoint).length > 0) {
            if (String(this.state.pointRemarks).length > 0) {
                if (this.state.extraPoint != 0) {
                    const data = {
                        'type': this.state.extraPointType,
                        'point': this.state.extraPoint,
                        'remarks': this.state.pointRemarks,
                        'user_id': this.state.userArr.id,
                        'walletType':this.state.manualType
                    }
                    post('/wallet/adminPointTransction/', data)
                        .then((data) => {
                            console.log(data)
                            if (data.data.status) {
                                get('/userDetails/UserDetailsAdmin/' + this.state.id)
                                    .then((res) => {
                                        this.setState({
                                            userArr: res.data.userArr,
                                            walletArr: res.data.walletArr.filter(item => item.walletType == 'MONEY'),
                                            pointArr: res.data.walletArr.filter(item => item.walletType == 'REWARDS'),
                                            referArr: res.data.referArr,
                                            bookingArr: res.data.bookingArr,
                                            referrerDetails: res.data.referrerArr
                                        })
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                                this.onCloseModal()
                                toast.dark(data.data.msg, {
                                    position: "bottom-center",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            } else {
                                toast.error(data.data.msg, {
                                    position: "bottom-center",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                } else {
                    toast.error('Point value must be greater than 0.', {
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
                toast.error('Please Enter Remarks.', {
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
            toast.error('Please Enter Point.', {
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
    render() {
        return (
            <div>
                <div class="page-header mt-0 shadow p-3">
                    <h3 class="mb-sm-0">User Details</h3>
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <a href="#"><i class="fe fe-home"></i></a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Admin Dashboard</li>
                    </ol>
                </div>
                <div class="row">
                    <div class="col-xl-4">
                        <div class="card shadow">
                            <div class="card-header">
                                <h2 class="mb-0">Personal Details</h2>
                            </div>
                            <div class="card-body" style={{ paddingTop: "5px" }}>
                                <div style={{ fontSize: "16px" }}>Customer ID : <b style={{ fontSize: "20px" }}>{this.state.userArr.CustomersID}</b></div>
                                <span>Name : {this.state.userArr.name}</span><br />
                                <span>Email ID : {this.state.userArr.email}</span><br />
                                <span>Phone Number : {this.state.userArr.phone}</span><br />
                                <span>Referral Code : <b>{this.state.userArr.referCode}<MdContentCopy style={{ cursor: "pointer" }} onClick={() => this.handleCopy(this.state.userArr.referCode)} /></b></span><br />
                                <span>Total Refer : {this.state.referArr.length} Refer</span><br />
                                <span>Power Status : <b>
                                    {
                                        this.state.userArr.subscriptionStatus ?
                                            <span>Power <span style={{ fontSize: "12px" }}>from {Moment(this.state.userArr.created_at).format()}</span></span>
                                            : <><span>No Power</span>&nbsp;<button className="btn btn-sm btn-primary" onClick={this.handlePowerModalOpen}>Subscribe Power</button></>
                                    }</b>


                                </span><br />
                                <span>Power Price : {this.state.userArr.price}/-</span><br />
                                <span>Power Order ID : {this.state.userArr.orderID}</span><br />
                                <span>Power Transaction ID : {this.state.userArr.transID}</span><br />
                            </div>
                        </div>

                        <div class="card shadow">
                            <div class="card-header">
                                <h2 class="mb-0">Booking History</h2>
                            </div>
                            <div className="card-body scrollDiv" style={{ paddingTop: "10px", maxHeight: "560px", overflowY: "auto", overflowX: "hidden" }}>
                                {
                                    this.state.bookingArr.length == 0 ?
                                        <><center>Not Booking Found</center></>
                                        :
                                        <table style={{ width: "100%" }} cellPadding="10px">
                                            {
                                                this.state.bookingArr.map((obj, i) =>
                                                    <tr style={{ borderBottom: "1px solid rgba(0,0,0,.1)", marginTop: "5px", marginBottom: "5px" }}>
                                                        <td>
                                                            <span style={{ fontSize: "12px", color: "#6c757d", fontWeight: "600" }}>{obj.orderId[0] ? Moment(obj.orderId[0].date).format() : null}</span><br />
                                                            <span style={{ fontSize: "15px", color: "#4b4b5a", fontWeight: "700" }}>{obj.orderId.map((obj1, j) => {
                                                                return (
                                                                    <>
                                                                        <Link to={"/Viewbooking?booking_id=" + obj1.booking_id}>{obj1.OrderID}</Link>, </>
                                                                );

                                                            })}</span>



                                                        </td>
                                                        <td style={{ textAlign: "end" }}>
                                                            <span style={{ fontSize: "20px", textAlign: "right" }}>
                                                                <span style={{ color: "green", fontWeight: "700" }}>&#8377;{obj.bookingPayment.grandTotal}</span>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </table>
                                }
                            </div>

                        </div>
                    </div>
                    <div class="col-xl-4">
                        <div class="card shadow">
                            <div class="card-header">
                                <h2 class="mb-0">Referrer Details</h2>
                            </div>
                            <div class="card-body" style={{ paddingTop: "10px" }}>

                                {
                                    String(this.state.userArr.referrerCode).length > 5 ?
                                        <><span style={{ fontSize: "18px" }}>Referrer Code : {this.state.userArr.referrerCode}</span><button className="btn btn-primary btn-sm" style={{ float: "right" }} onClick={this.onOpenModal}>Edit Code</button><hr style={{ margin: "5px" }} />
                                            {
                                                this.state.referrerDetails.id != 0 ?
                                                    <span>
                                                        <a href={"/userDetails?id=" + this.state.referrerDetails.id + "&name=" + this.state.referrerDetails.name} style={{ fontSize: "15px", fontWeight: "700" }}>{this.state.referrerDetails.name}</a><br />
                                                        <span style={{ fontSize: "12px", color: "#6c757d", fontWeight: "600" }}>Email ID : {this.state.referrerDetails.email}</span><br />
                                                        <span style={{ fontSize: "12px", color: "#6c757d", fontWeight: "600" }}>Phone Number : +91 {this.state.referrerDetails.phone}</span>
                                                    </span>


                                                    :
                                                    <><center style={{ paddingTop: "10px" }}>User enter wrong referrer code</center></>

                                            }</>
                                        :
                                        <><center style={{ paddingTop: "10px" }}>No Referrer Details Found
                            <br /><button className="btn btn-primary btn-sm" onClick={this.onOpenModal}>Add Code</button></center>


                                        </>

                                }



                            </div>
                        </div>
                        <div class="card shadow">
                            <div class="card-header">
                                <h2 class="mb-0">Refer List</h2>
                            </div>
                            <div class="card-body scrollDiv" style={{ paddingTop: "10px", maxHeight: "687px", overflowY: "auto", overflowX: "hidden" }}>
                                {
                                    this.state.referArr.length == 0 ?
                                        <><center>Not Refer Found</center></>
                                        :
                                        <table style={{ width: "100%" }} cellPadding="10px">
                                            {
                                                this.state.referArr.map((obj, i) =>
                                                    <tr style={{ borderBottom: "1px solid rgba(0,0,0,.1)", marginTop: "5px", marginBottom: "5px" }}>
                                                        <td style={{ lineHeight: "19px" }}>

                                                            <a href={"/userDetails?id=" + obj.user_id + "&name=" + obj.user_name} style={{ fontSize: "15px", color: "#4b4b5a", fontWeight: "700" }}>{obj.user_name}</a><br />
                                                            <span style={{ fontSize: "12px", color: "#6c757d", fontWeight: "600" }}>{obj.user_email}</span><br />
                                                            <span style={{ fontSize: "12px", color: "#6c757d", fontWeight: "600" }}>{Moment(obj.register_date).format()}</span>

                                                        </td>
                                                        <td style={{ textAlign: "end", lineHeight: "20px" }}>
                                                            <span style={{ fontSize: "14px", textAlign: "right" }}>
                                                                {
                                                                    obj.subscription_status ?
                                                                        <>
                                                                            <span style={{ color: "green", fontWeight: "700" }}>Power</span>
                                                                            <br />
                                                                            <span style={{ fontSize: "12px", color: "#6c757d", fontWeight: "600", textAlign: "right" }}>Total Refer : {obj.totalRefer} Refer</span><br />
                                                                            <span style={{ fontSize: "12px", color: "#6c757d", fontWeight: "600", textAlign: "right" }}>Power Date : {Moment(obj.Power_date).format()}</span>
                                                                        </>
                                                                        :
                                                                        <span style={{ color: "red", fontWeight: "700" }}>No Power</span>
                                                                }
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </table>
                                }
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4">
                        <div class="card socailicons google-plus1 shadow" style={{ flexDirection: "row" }}>
                            <div style={{ padding: " 1.875rem 1.875rem 0 1.875rem" }}>
                                <small class="social-title">Crowd Money</small>
                                <h3 class="text-xxl text-white  mb-0" style={{ marginTop: 0 }}>{this.state.userArr.walletBalance}</h3>
                                <center style={{ fontSize: "11px" }} className="kjhgf" onClick={() => this.handlePointModal('money')}>Credit & Debit Money</center>

                            </div>
                            <div class="card-body col-md-6 mb-0" style={{ textAlign: "right", borderLeft: "solid 1px #e93208", padding: 0 }}>
                                <div style={{ padding: " 1.875rem 1.875rem 0 1.875rem" }}><small class="social-title">Crowd Point</small>
                                    <h3 class="text-xxl text-white  mb-0" style={{ marginTop: 0 }}>{this.state.userArr.walletPoint}</h3></div>
                                <center style={{ fontSize: "11px" }} className="kjhgf" onClick={() => this.handlePointModal('point')}>Credit & Debit Point</center>
                            </div>
                        </div>
                        <div class="card shadow">
                            <div class="card-header col-md-12 row" >
                                {
                                    this.state.walletType ?
                                        <>
                                            <div className="col-md-6" style={{ borderBottom: "solid", textAlign: "center" }} ><span><b>Money Transactions</b></span> </div>
                                            <div className="col-md-6" onClick={() => this.setState({ walletType: false })} style={{ cursor: "pointer", textAlign: "center" }}> <span style={{ float: "right" }}>Point Transactions</span></div>
                                        </> :
                                        <>
                                            <div className="col-md-6" onClick={() => this.setState({ walletType: true })} style={{ cursor: "pointer", textAlign: "center" }}> <span>Money Transactions</span></div>
                                            <div className="col-md-6" style={{ borderBottom: "solid", textAlign: "center" }} ><span style={{ float: "right" }}><b>Point Transactions</b></span> </div>

                                        </>

                                }


                            </div>

                            <div class="card-body" style={{ paddingTop: "10px" }}>
                                {this.state.walletType ?
                                    <div>
                                        {
                                            this.state.walletArr.length == 0 ?
                                                <><center>Not Transaction Found</center></>
                                                :
                                                <table style={{ width: "100%" }} cellPadding="10px">
                                                    {
                                                        this.state.walletArr.map((obj, i) =>
                                                            <tr style={{ borderBottom: "1px solid rgba(0,0,0,.1)", marginTop: "5px", marginBottom: "5px" }}>
                                                                <td>
                                                                    <span style={{ fontSize: "15px", color: "#4b4b5a", fontWeight: "700" }}>{obj.remarks}</span><br />

                                                                    <span style={{ fontSize: "12px", color: "#6c757d", fontWeight: "600" }}>{Moment(obj.updated_at).format('f')}</span>

                                                                </td>
                                                                <td style={{ textAlign: "end" }}>
                                                                    <span style={{ fontSize: "20px", textAlign: "right" }}>
                                                                        {
                                                                            obj.transactionType == 'CREDIT' ?
                                                                                <span style={{ color: "green", fontWeight: "700" }}>+{obj.transactionAmount}</span>
                                                                                :
                                                                                <span style={{ color: "red", fontWeight: "700" }}>-{obj.transactionAmount}</span>
                                                                        }
                                                                    </span><br />
                                                                    <span style={{ fontSize: "12px", color: "#6c757d", fontWeight: "600", textAlign: "right" }}>Closing Point : {obj.afterTransactionAmount}</span>

                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </table>
                                        }
                                    </div>
                                    :
                                    <div>
                                        {
                                            this.state.pointArr.length == 0 ?
                                                <><center>Not Transaction Found</center></>
                                                :
                                                <table style={{ width: "100%" }} cellPadding="10px">
                                                    {
                                                        this.state.pointArr.map((obj, i) =>
                                                            <tr style={{ borderBottom: "1px solid rgba(0,0,0,.1)", marginTop: "5px", marginBottom: "5px" }}>
                                                                <td>
                                                                    <span style={{ fontSize: "15px", color: "#4b4b5a", fontWeight: "700" }}>{obj.remarks}</span><br />

                                                                    <span style={{ fontSize: "12px", color: "#6c757d", fontWeight: "600" }}>{Moment(obj.updated_at).format('f')}</span>

                                                                </td>
                                                                <td style={{ textAlign: "end" }}>
                                                                    <span style={{ fontSize: "20px", textAlign: "right" }}>
                                                                        {
                                                                            obj.transactionType == 'CREDIT' ?
                                                                                <span style={{ color: "green", fontWeight: "700" }}>+{obj.transactionAmount}</span>
                                                                                :
                                                                                <span style={{ color: "red", fontWeight: "700" }}>-{obj.transactionAmount}</span>
                                                                        }
                                                                    </span><br />
                                                                    <span style={{ fontSize: "12px", color: "#6c757d", fontWeight: "600", textAlign: "right" }}>Closing Point : {obj.afterTransactionAmount}</span>

                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </table>
                                        }
                                    </div>

                                }

                            </div>
                        </div>
                    </div>


                </div>
                <Modal open={this.state.modalStatus} onClose={this.onCloseModal} center>
                    <div style={{ width: "250px" }}>
                        <h2>Enter Referrer Code</h2>
                        <hr style={{ margin: "10px" }} />
                        <input type="text" name="newReferCode" className="form-control newReferCode" value={this.state.newReferCode} onChange={this.handleChange} placeholder='Enter Referrer Code' style={{ borderColor: "black" }} /><br />
                        <span style={{ fontSize: "12px", color: "red" }}>{this.referError}</span>
                        <button className="btn btn-primary btn-sm" onClick={this.handleReferrer} style={{ float: "right" }}>Save</button>
                    </div>
                </Modal>
                <Modal open={this.state.subscribeModal} onClose={this.onCloseModal} center>
                    <div style={{ width: "350px" }}>
                        <h2>Subscribe Power Manually</h2>
                        <hr style={{ margin: "10px" }} />
                        <input type="text" name="subscribeOrderID" className="form-control" value={this.state.subscribeOrderID} onChange={this.handleChange} placeholder='Enter Order ID' style={{ borderColor: "black" }} /><br />
                        <input type="text" name="subscribeTransID" className="form-control" value={this.state.subscribeTransID} onChange={this.handleChange} placeholder='Enter Transaction ID' style={{ borderColor: "black" }} /><br />
                        <span style={{ fontSize: "12px", color: "red" }}>{this.referError}</span>
                        <button className="btn btn-primary btn-sm" onClick={this.handlePowerSubmit} style={{ float: "right" }}>Save</button>
                    </div>
                </Modal>
                <Modal open={this.state.pointModal} onClose={this.onCloseModal} center>
                    <div style={{ width: "350px" }}>
                        {
                            this.state.manualType == 'money' ?
                                <h2>Crowd Money Credit & Debit</h2>
                                :
                                <h2>Crowd Point Credit & Debit</h2>


                        }
                        <hr style={{ margin: "10px" }} />
                        <div className="row" style={{ padding: "0 1rem 0.6rem 1rem" }}>
                            <select className="form-control" name="extraPointType" onChange={this.handleChange} style={{ width: "100px", marginRight: "10px" }}>
                                <option value="CREDIT">Credit</option>
                                <option value="DEBIT">Debit</option>

                            </select>

                            <input type="text" name="extraPoint" className="form-control" value={this.state.extraPoint} onChange={this.handleChange} placeholder='Enter Transaction Point' style={{ borderColor: "black" }} style={{ width: "235px" }} /><br />
                        </div>
                        <input type="text" name="pointRemarks" className="form-control" value={this.state.pointRemarks} onChange={this.handleChange} placeholder='Enter Remarks' style={{ borderColor: "black" }} /><br />
                        <span style={{ fontSize: "12px", color: "red" }}>{this.referError}</span>
                        <button className="btn btn-primary btn-sm" onClick={this.handlePointSubmit} style={{ float: "right" }}>Save</button>
                    </div>
                </Modal>
                <ToastContainer />
            </div>

        )
    }
}
