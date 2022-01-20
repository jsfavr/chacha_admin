import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { get, patch } from '../../utils/service';
export default class settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            percentage: 0,
            minimumOrderValue: 0,
            id: 0,
            minimumOrderId: 0,
            settings: [],
            settingID: 0,
            paymentOptionArr: []
        }
    }
    componentDidMount() {
        this.getData()
    }
    getData = () => {
        get('/userDetails/reword/')
            .then((res) => {
                // console.log(res)
                this.setState({
                    id: res.data[0].id,
                    percentage: res.data[0].percentage,
                })
            }).catch((err) => {
                console.log(err)
            })
        get('/userDetails/minimumOrderValue/')
            .then((res) => {
                // console.log(res)
                this.setState({
                    minimumOrderId: res.data[0].id,
                    minimumOrderValue: res.data[0].value,
                })
            }).catch((err) => {
                console.log(err)
            })
        get('/other/setting/')
            .then((res) => {
                // console.log(res)
                this.setState({
                    settings: res.data[0],
                    settingID: res.data[0].id
                })
            }).catch((err) => {
                console.log(err)
            })
        get('/other/paymentOption/')
            .then((res) => {
                // console.log(res)
                this.setState({
                    paymentOptionArr: res.data,
                })
            }).catch((err) => {
                console.log(err)
            })
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
    handleOrderValueClick = e => {
        console.log(this.state.minimumOrderValue)
        if (this.state.minimumOrderValue < 0) {
            toast.error('Minimum order value must be above or equal 0.', {
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
                value: this.state.minimumOrderValue,
                activeStatus: 1
            }
            patch('/userDetails/minimumOrderValue/' + this.state.minimumOrderId, data)
                .then((res) => {
                    this.getData();
                    toast.dark('Minimum order value Update Successful.', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }).catch((err) => {
                    console.log(err)
                })
        }
    }
    handleClick = e => {
        console.log(this.state.percentage)
        if (this.state.percentage < 0) {
            toast.error('Redeem Percentage must be above or equal 0.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            if (this.state.percentage > 100) {
                toast.error('Redeem Percentage must be below or equal 100.', {
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
                    percentage: this.state.percentage,
                    activeStatus: 1
                }
                patch('/userDetails/reword/' + this.state.id, data)
                    .then((res) => {
                        this.getData();
                        toast.dark('Redeem Percentage Update Successful.', {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }).catch((err) => {
                        console.log(err)
                    })
            }

        }
    }
    settingChange = (settingName, status) => {
        var data = []
        if (settingName == 'vendorRegistration') {
            data = {
                vendorRegistration: status
            }
        } else if (settingName == 'underMantanance') {
            data = {
                underMantanance: status
            }
        } else if (settingName == 'livePaymentGateway') {
            data = {
                livePaymentGateway: status
            }
        } else if (settingName == 'debug') {
            data = {
                debug: status
            }
        } else if (settingName == 'coupon') {
            data = {
                coupon: status
            }
        } else if (settingName == 'acceptOrder') {
            data = {
                acceptOrder: status
            }
        }
        patch('/other/setting/' + this.state.settingID, data)
            .then((res) => {
                console.log(res)
                this.getData()
            }).catch((err) => {
                console.log(err)
            })
    }
    paymentChange = (id, status) => {
        const data = {
            status: status
        }
        patch('/other/paymentOption/' + id, data)
            .then((res) => {
                console.log(res)
                this.getData()
                if(status==0){
                    window.location.reload()
                }
            }).catch((err) => {
                console.log(err)
            })
    }
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Others Settings</h3>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <a href="#"><i className="fe fe-home"></i></a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Admin Dashboard</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div class="card  shadow">
                            <div class="card-header bg-transparent">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h6 class="text-uppercase text-light ls-1 mb-1">Crowd Rewords Point</h6>
                                        <h2 class="mb-0">Redeem Percentage</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body finance-chart row">
                                <div class="col-md-9">
                                    <input type="number" className="form-control" name="percentage" placeholder="Please enter redeem percentage" value={this.state.percentage} onChange={this.handleChange} />
                                </div>
                                <div class="col-md-43">
                                    <input type="button" className="btn btn-primary" value="Save" onClick={this.handleClick} />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div class="card  shadow">
                            <div class="card-header bg-transparent">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h6 class="text-uppercase text-light ls-1 mb-1">User Minimum</h6>
                                        <h2 class="mb-0">Purchase Value</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body finance-chart row">
                                <div class="col-md-9">
                                    <input type="number" className="form-control" name="minimumOrderValue" placeholder="Please enter minimum purchase value" value={this.state.minimumOrderValue} onChange={this.handleChange} />
                                </div>
                                <div class="col-md-43">
                                    <input type="button" className="btn btn-primary" value="Save" onClick={this.handleOrderValueClick} />
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <div className="col-md-4">
                        <div class="card  shadow">
                            <div class="card-header bg-transparent">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h6 class="text-uppercase text-light ls-1 mb-1">Android</h6>
                                        <h2 class="mb-0">App Version</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body finance-chart row">
                                <div class="col-md-9">
                                    <input type="number" className="form-control" name="minimumOrderValue" placeholder="Please enter minimum purchase value" value={this.state.minimumOrderValue} onChange={this.handleChange} />
                                </div>
                                <div class="col-md-43">
                                    <input type="button" className="btn btn-primary" value="Save" onClick={this.handleOrderValueClick} />
                                </div>

                            </div>
                        </div>
                    </div> */}

                </div>
                <hr style={{ margin: 0, marginBottom: "25px" }} />
                <div className="row">
                    <div className="col-md-3">
                        <div class="card  shadow">
                            <div class="card-header bg-transparent">
                                <div class="row align-items-center">
                                    <div class="" style={{ width: "70%", paddingLeft: "20px" }}>
                                        <h6 class="text-uppercase text-light ls-1 mb-1">Vendor</h6>
                                        <h2 class="mb-0">Registration</h2>
                                    </div>
                                    <div>
                                        <label class="custom-switch">
                                            {
                                                this.state.settings.vendorRegistration ?
                                                    <input type="checkbox" name="option" value="2" class="custom-switch-input" checked onChange={() => this.settingChange('vendorRegistration', 0)} />
                                                    :
                                                    <input type="checkbox" name="option" value="2" class="custom-switch-input" onChange={() => this.settingChange('vendorRegistration', 1)} />
                                            }
                                            <span class="custom-switch-indicator custom-switch-indicator-square custom-switch-indicator-lg"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-3">
                        <div class="card  shadow">
                            <div class="card-header bg-transparent">
                                <div class="row align-items-center">
                                    <div class="" style={{ width: "70%", paddingLeft: "20px" }}>
                                        <h6 class="text-uppercase text-light ls-1 mb-1">Accept</h6>
                                        <h2 class="mb-0">Product Order</h2>
                                    </div>
                                    <div>
                                        <label class="custom-switch">
                                            {
                                                this.state.settings.acceptOrder ?
                                                    <input type="checkbox" name="option" value="2" class="custom-switch-input" checked onChange={() => this.settingChange('acceptOrder', 0)} />
                                                    :
                                                    <input type="checkbox" name="option" value="2" class="custom-switch-input" onChange={() => this.settingChange('acceptOrder', 1)} />
                                            }
                                            <span class="custom-switch-indicator custom-switch-indicator-square custom-switch-indicator-lg"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-3">
                        <div class="card  shadow">
                            <div class="card-header bg-transparent">
                                <div class="row align-items-center">
                                    <div class="" style={{ width: "70%", paddingLeft: "20px" }}>
                                        <h6 class="text-uppercase text-light ls-1 mb-1">Under</h6>
                                        <h2 class="mb-0">Maintenance</h2>
                                    </div>
                                    <div>
                                        <label class="custom-switch">
                                            {
                                                this.state.settings.underMantanance ?
                                                    <input type="checkbox" name="option" value="2" class="custom-switch-input" checked onChange={() => this.settingChange('underMantanance', 0)} />
                                                    :
                                                    <input type="checkbox" name="option" value="2" class="custom-switch-input" onChange={() => this.settingChange('underMantanance', 1)} />
                                            }
                                            <span class="custom-switch-indicator custom-switch-indicator-square custom-switch-indicator-lg"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>



                    <div className="col-md-3">
                        <div class="card  shadow">
                            <div class="card-header bg-transparent">
                                <div class="row align-items-center">
                                    <div class="" style={{ width: "70%", paddingLeft: "20px" }}>
                                        <h6 class="text-uppercase text-light ls-1 mb-1">Offer</h6>
                                        <h2 class="mb-0">Coupon Code</h2>
                                    </div>
                                    <div>
                                        <label class="custom-switch">
                                            {
                                                this.state.settings.coupon ?
                                                    <input type="checkbox" name="option" value="2" class="custom-switch-input" checked onChange={() => this.settingChange('coupon', 0)} />
                                                    :
                                                    <input type="checkbox" name="option" value="2" class="custom-switch-input" onChange={() => this.settingChange('coupon', 1)} />
                                            }
                                            <span class="custom-switch-indicator custom-switch-indicator-square custom-switch-indicator-lg"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* <div className="col-md-3">
                        <div class="card  shadow">
                            <div class="card-header bg-transparent">
                                <div class="row align-items-center">
                                    <div class="" style={{ width: "70%", paddingLeft: "20px" }}>
                                        <h6 class="text-uppercase text-light ls-1 mb-1">Under</h6>
                                        <h2 class="mb-0">Development</h2>
                                    </div>
                                    <div>
                                        <label class="custom-switch">
                                            {
                                                this.state.settings.debug ?
                                                    <input type="checkbox" name="option" value="2" class="custom-switch-input" checked onChange={() => this.settingChange('debug', 0)} />
                                                    :
                                                    <input type="checkbox" name="option" value="2" class="custom-switch-input" onChange={() => this.settingChange('debug', 1)} />
                                            }
                                            <span class="custom-switch-indicator custom-switch-indicator-square custom-switch-indicator-lg"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div> */}
                    <div className="col-md-3">
                        <div class="card  shadow">
                            <div class="card-header bg-transparent">
                                <div class="row align-items-center">
                                    <div class="" style={{ width: "70%", paddingLeft: "20px" }}>
                                        <h6 class="text-uppercase text-light ls-1 mb-1">Accept</h6>
                                        <h2 class="mb-0">Live Payment</h2>
                                    </div>
                                    <div>
                                        <label class="custom-switch">
                                            {
                                                this.state.settings.livePaymentGateway ?
                                                    <input type="checkbox" name="option" value="2" class="custom-switch-input" checked onChange={() => this.settingChange('livePaymentGateway', 0)} />
                                                    :
                                                    <input type="checkbox" name="option" value="2" class="custom-switch-input" onChange={() => this.settingChange('livePaymentGateway', 1)} />
                                            }
                                            <span class="custom-switch-indicator custom-switch-indicator-square custom-switch-indicator-lg"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* <div className="col-md-3">
                        <div class="card  shadow">
                            <div class="card-header bg-transparent">
                                <div class="row align-items-center">
                                    <div class="" style={{ width: "70%", paddingLeft: "20px" }}>
                                        <h6 class="text-uppercase text-light ls-1 mb-1">Android App</h6>
                                        <h2 class="mb-0">Update Mandatory</h2>
                                    </div>
                                    <div>
                                        <label class="custom-switch">
                                            {
                                                this.state.settings.appUpdateMandetory ?
                                                    <input type="checkbox" name="option" value="2" class="custom-switch-input" checked onChange={() => this.settingChange('appUpdateMandetory', 0)} />
                                                    :
                                                    <input type="checkbox" name="option" value="2" class="custom-switch-input" onChange={() => this.settingChange('appUpdateMandetory', 1)} />
                                            }
                                            <span class="custom-switch-indicator custom-switch-indicator-square custom-switch-indicator-lg"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div> */}

                </div>
                <hr style={{ margin: 0, marginBottom: "15px" }} />
                <b>Payment Options</b>
                <div className="row" style={{ marginTop: "5px" }}>
                    {
                        this.state.paymentOptionArr.map((obj, i) =>
                            <div className="col-md-3">
                                <div class="card  shadow">
                                    <div class="card-header bg-transparent">
                                        <div class="row align-items-center">
                                            <div class="" style={{ width: "70%", paddingLeft: "20px" }}>
                                                {/* <h6 class="text-uppercase text-light ls-1 mb-1">Vendor</h6> */}
                                                <h2 class="mb-0">{obj.gatewayName}</h2>
                                            </div>
                                            <div>
                                                <label class="custom-switch">
                                                    {
                                                        obj.status ?
                                                            <input type="checkbox" name={"option" + obj.id} value="2" class="custom-switch-input" checked onChange={() => this.paymentChange(obj.id, 0)} />
                                                            :
                                                            <input type="checkbox" name={"option2" + obj.id} value="52" class="custom-switch-input" onChange={() => this.paymentChange(obj.id, 1)} />
                                                    }
                                                    <span class="custom-switch-indicator custom-switch-indicator-square custom-switch-indicator-lg"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        )
                    }

                </div>
                <ToastContainer />
            </div>
        )
    }
}
