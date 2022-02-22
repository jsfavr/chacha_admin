import React, { Component } from 'react'
import {get,withoutauthformpost,post} from '../../utils/service';
import ToastServive from 'react-material-toast';
import SimpleReactValidator from 'simple-react-validator'

const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export class addDeliveryBoy extends Component {
    constructor(props) {
        super(props);
        var uniqid = require("uniqid");
        this.state = {
            name: '',
            email: '',
            username:uniqid(),
            password: '',
            phone: '',
            role_id: 5,
            is_active:1,
            is_verified:1,
            status:1,
            loading: false
        };
       
        this.validator = new SimpleReactValidator();
    }
    componentDidMount() {
        document.title = 'Add Delivery Boy : Admin Dashboard - Hardwarechacha';
        document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
      }
    handleSubmit = e => {
        e.preventDefault();

        const data = {
            name: this.state.name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.phone,
            phone: this.state.phone,
            role_id: this.state.role_id,
            is_active: this.state.is_active,
            is_verified: this.state.is_verified,
            status: this.state.status,
        }
        if (this.validator.allValid()) {
            this.setState({
                loading:true
            })
            post('/auth/delboyregister/', data)
                .then((res) => {

                    // window.location.reload();
                    if (res.status === 200) {
                        toast.success('Delivery Boy added successfully');
                        const walletdata = {
                            user_id : res.data.id,
                            amount: 0
                        }
                        post('/wallet/wallet/',walletdata)
                        .then(res=>{console.log(res)})
                        .catch(err=>{console.log(err)})
                        this.setState({
                            name: '',
                            email: '',
                            phone: '',
                            loading:false
                        })
                    }else{
                        console.log(res)
                    }

                }).catch(function (error) {
                    console.log(error);
                    toast.error('Opps! Something is wrong');
                })


        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }

    }

    handleChange = e => {
        e.preventDefault();
       // console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Add New Delivery Boy</h3>
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
                            <div className="card-body">
                                <form method="post" action="add_delivery_boy_action" >
                                  
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Delivery Boy Name"
                                                    name="name"
                                                    className="form-control"
                                                    onChange={this.handleChange}
                                                    value={this.state.name}
                                                />
                                                {this.validator.message('name', this.state.name, 'required', { className: 'text-danger' })}

                                                
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Contact No</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Delivery Boy Contact No"
                                                    name="phone"
                                                    className="form-control"
                                                    onChange={this.handleChange}
                                                    value={this.state.phone}
                                                />
                                                {this.validator.message('phone', this.state.phone, 'required|max:10|min:10', { className: 'text-danger' })}
                                               
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Email ID</label>
                                                <input
                                                    type="email"
                                                    placeholder="Enter Delivery Boy Email ID"
                                                    name="email"
                                                    className="form-control"
                                                    onChange={this.handleChange}
                                                    value={this.state.email}
                                                />
                                                {this.validator.message('email', this.state.email, 'required|email', { className: 'text-danger' })}
                                              
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <br />
                                            <center><a href="#" disabled={this.state.loading} onClick={this.handleSubmit} className="login100-form-btn btn-primary text-white" >{this.state.loading ? 'Loading...' : 'Submit'}</a></center>
                                        </div>
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

export default addDeliveryBoy
