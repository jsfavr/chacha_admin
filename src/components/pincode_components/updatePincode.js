import React, { Component } from 'react'
import {withoutauthpatch,get,patch} from '../../utils/service';
import ToastServive from 'react-material-toast';
import queryString from 'query-string';
import {imageValid} from "../../utils/imageValid";
const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class UpdatePincode extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
 
        this.state = {
           pincode_details:[],
           id:params.id,
        }
    }
    componentDidMount(){
      document.title = 'Update Pincode : Admin Dashboard - Crowd';
      document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
        get("/address/deliveryPincode/"+this.state.id)
        .then((res)=>{
          if(res.status == 200){
            this.setState({
                pincode_details:res.data
            })
          }else{
            window.Location.href='/login'
          }
         
        }).catch((err)=>{
    
        })
      }
      handleSubmit = (e) =>{
        e.preventDefault();
        var formdata = new FormData(e.target);
        patch("/address/deliveryPincode/"+this.state.id,formdata)
          .then((response) => {
              if(response.status ==200){
                toast.success('Pincode updated successfully');
                this.props.history.push('/viewPincode')
               
              //window.location.href='/login';
              }else{
                  
                toast.error('Pincode Already Exits');
              
              }
          })
          .catch(function (error) {
              console.log(error);
          }); 
      }
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Update Pincode</h3>
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
                            <div className="card-header">
                                <h2 className="mb-0">Update Pincode</h2>
                            </div>
                            <form method="POST" className="appointment-form" id="" onSubmit={this.handleSubmit} role="form" name="frm">
                                <div className="card-body">
                                    <div className="row" id="view">
                                        <div className="col-md-3">
                                            <label>Pin Code</label>
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="pincode" placeholder="Add Pin Code" defaultValue={this.state.pincode_details.pincode}/>
                                                <span className="text-danger"></span>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <label>Minimum Order</label>
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="min_price" placeholder="Add Minimum Order" defaultValue={this.state.pincode_details.minPrice}/>
                                                <span className="text-danger"></span>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <label>Delivery Charge</label>
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="delivery_charge" placeholder="Add Delivary Charge" defaultValue={this.state.pincode_details.deliveryCharge}/>
                                                <span className="text-danger"></span>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <label>COD Available</label>
                                            <div className="form-group">
                                                <select name="cod" id="cod" className="form-control">
                                                    <option value={this.state.pincode_details.cod}  selected="">{this.state.pincode_details.cod}</option>
                                                    <option value="YES">YES</option>
                                                    <option value="NO">NO</option>
                                                </select>
                                                <span className="text-danger"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="hidden" name="_token" id="_token" value="4Tn5woQQ5MKXPLIoByGV4L6DYMP7pohVE6Vvi7mj" />
                                </div>
                                <center><input type="submit" name="submit" value="Final Submission" className="btn btn-primary mt-1 mb-1" /></center>
                                <br />
                                <br />
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


