import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { checkAuth } from '../../utils/auth';
import { post } from '../../utils/service'
import SimpleReactValidator from 'simple-react-validator';

import Logo from './chacha.png'
import LogoDark from '../layout_components/header_components/suhem_light.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
export default class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            phone: '',
            otp: '',
            sendOTP: '',
            otpSendStatus: false,
            otpMsg: '',
            otpMsgColor: '',
            otpLoading: false,
            resendOtpLoading: false,
            loginLoading: false,
            phoneEdit: false,
            login: 0,
            id: 0


        }
        this.validator = new SimpleReactValidator();
    }
    UNSAFE_componentWillMount() {
        if (checkAuth.isAuthenticated)
            window.Location.href = '/'
    }
    handleSubmit = e => {
        e.preventDefault();
        const data = {
            phone: this.state.phone,
        }
        if (this.state.sendOTP == this.state.otp) {


            if (this.validator.allValid()) {
                this.setState({
                    otpMsg: '',
                })
                post('/auth/adminotplogin/', data)
                    .then((data) => {
                        // console.log(data);

                        this.setState({
                            is_loading: false
                        })
                        checkAuth.authenticate();
                        var token = JSON.parse(data.data.tokens.replace(/'/g, '"'));

                        localStorage.setItem('hcbAdminToken', token.access);
                        localStorage.setItem('hcbAdminRefreshToken', token.refresh);
                        localStorage.setItem('hcbAdminEmail', data.data.email);
                        // console.log( localStorage.getItem('hcbAdminToken'))

                        window.location.href = '/'

                        // toast.error(data.details);



                    }).catch(function (error) {
                        if (error.response) {

                            toast.error(error.response.data.detail);

                        }
                    })
            } else {
                this.validator.showMessages();
                this.forceUpdate();
            }
        } else {
            this.setState({
                otpMsgColor: 'red',
                otpMsg: 'OTP dose not match.',
            })
        }
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }


    sendOtp = (e) => {
        // console.log('otp')
        this.setState({
            otpLoading: true,
            resendOtpLoading: this
        })
        e.preventDefault();
        if (this.validator.fieldValid('phone')) {
            const data = {
                phone: this.state.phone,
                role: 2,
            }
            post('/auth/checkphoneadmin/', data)
                .then((data) => {
                    // console.log(data)
                    if (data.data.msg == 'Phone found') {
                        this.setState({
                            //sendOTP: Math.floor(100000 + Math.random() * 900000),
                            sendOTP: 123456,
                            otpMsg: '',
                            otpMsgColor: 'green'
                        }, () => {
                            const data = {
                                phone_no: this.state.phone,
                                // phone_no: '6294008510',
                                // msg: 'Please use this OTP ' + this.state.sendOTP + ' for complete the login process in Crowd admin. Do not share it with anyone.',
                                msg: 'Please use this OTP ' + this.state.sendOTP + ' for complete the Registration process on Hardwarechacha. Never share this OTP with anyone.',
                                template_id: '1207161779626782255'

                            }

                            post('/other/getsms/', data)
                                .then((data) => {
                                    // console.log('otpSend : ' + this.state.sendOTP);
                                    this.setState({
                                        phoneEdit: true,
                                        otpSendStatus: true,
                                        otpLoading: false,
                                        resendOtpLoading: false,
                                        otpMsg: 'OTP Send Successfully in your phone number',
                                    })
                                }).catch(function (error) {

                                    console.log(error);
                                });

                        })
                    } else {
                        this.setState({
                            otpMsg: 'Invalid Phone Number',
                            otpMsgColor: 'red',
                            otpLoading: false,
                            resendOtpLoading: false,
                            otpSendStatus: false
                        })
                    }

                }).catch(function (error) {
                    console.log(error);

                })

        } else {
            this.setState({
                otpLoading: false,
                resendOtpLoading: false
            })
            this.validator.showMessages();
            this.forceUpdate();
        }


    }
    editPhone = () => {
        this.setState({
            phoneEdit: false,
            resendOtpLoading: false,
            otpSendStatus: false,
            otpMsg: '',
            sendOTP: ''
        })
    }
    handleLogout = () => {
        const data = {
            user_id: this.state.id,

        }
        if (this.state.sendOTP == this.state.otp) {
            post('/auth/LoggoutAllDeviceForgate/', data)
                .then((data) => {
                    //  console.log('otpSend : '+this.state.sendOTP);
                    this.setState({
                        login: 3,
                        id: 0,
                        otpMsg: ''
                    })
                }).catch(function (error) {

                    console.log(error);
                });
        } else {
            this.setState({
                otpMsgColor: 'red',
                otpMsg: 'OTP dose not match.',
            })
        }
    }

    componentDidMount() {
        document.title = 'Sign In : Admin Dashboard - Hardwarechacha';
    }

    render() {
        return (
            <div className="page">
                <div className="page-main">
                    <div className="limiter">
                        <div className="container-login100" >
                            <div className="wrap-login100 p-5" style={{backgroundColor:'#5f5fd7'}}>
                                <form className="login100-form validate-form" style={{ padding: 0 }}>
                                    <div className="logo-img text-center pb-3">
                                        <img src={Logo} style={{ width: "50%" }} />
                                    </div>
                                    <span className="login100-form-title">
                                        Administrator Login
                                </span>


                                    {
                                        this.state.otpSendStatus == true ?
                                            <span style={{ fontSize: "10px", float: "right", marginRight: "19px", cursor: "pointer", color: "blue" }} onClick={this.editPhone}>Edit Phone Number</span> : null
                                    }
                                    <div className="form-group mt-4">


                                        <div className="wrap-input100 ">


                                            <input className="input100" type="number" readOnly={this.state.phoneEdit} name="phone" id="phone" onChange={this.handleChange} value={this.state.phone} placeholder="Enter Phone Number" style={{ marginTop: 0 }} />
                                            <span className="focus-input100"></span>
                                            <span className="symbol-input100">
                                                <i className="fa fa-lock" aria-hidden="true"></i>
                                            </span>


                                        </div>
                                        <span style={{ fontSize: "12px" }}> {this.validator.message('phone', this.state.phone, 'required|integer|min:10', { className: 'text-danger' })}</span>
                                    </div>




                                    {
                                        this.state.otpSendStatus == true ?
                                            <>
                                                <span style={{ fontSize: "10px", float: "right", marginRight: "19px", cursor: "pointer", color: "blue" }} onClick={this.sendOtp}>Resend OTP</span>

                                                <div className="form-group mt-4">


                                                    <div className="wrap-input100">



                                                        <input className="input100" name="otp" id="otp" type="number" onChange={this.handleChange} value={this.state.otp} placeholder="Enter OTP" />
                                                        <span className="focus-input100"></span>
                                                        <span className="symbol-input100">
                                                            <i className="fa fa-lock" aria-hidden="true"></i>
                                                        </span>



                                                    </div>
                                                    <span style={{ fontSize: "12px" }}> {this.validator.message('otp', this.state.otp, 'required|integer|min:6', { className: 'text-danger' })}</span>
                                                </div>
                                                <div className="form-group mb-0 text-center">
                                                    <button className="login100-form-btn btn-primary" type="button" disabled={this.state.loginLoading} onClick={this.handleSubmit}>{this.state.loginLoading ? 'Loading...' : 'Login'}</button>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="form-group mb-0 text-center">
                                                    <button className="login100-form-btn btn-primary" type="button" disabled={this.state.otpLoading} onClick={this.sendOtp}>{this.state.otpLoading ? 'Loading...' : 'Send OTP'}</button>
                                                </div>
                                                {/* <div className="form-group mb-0 text-center">
                                                            <button className="btn btn-primary btn-block" type="button" disabled={this.state.loginLoading} onClick={this.handleSubmit}>{this.state.loginLoading ? 'Loading...' : 'Login'}</button>
                                                        </div> */}
                                            </>
                                    }
                                    <div className="form-group mb-0 text-center">
                                        <span style={{ color: this.state.otpMsgColor, fontSize: "12px" }}>{this.state.otpMsg}</span>
                                    </div>

                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
