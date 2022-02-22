import React, { Component } from 'react'
import {get,withoutauthformpost,post} from '../../utils/service';
import ToastServive from 'react-material-toast';

const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class AddPincode extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    componentDidMount() {
        document.title = 'Add Pincode : Admin Dashboard - Hardwarechacha';
        document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
    }
    pincodeAdd=(e)=>{
        e.preventDefault();
        var formdata = new FormData(e.target);
        formdata.append('activeStatus', 1);
          withoutauthformpost("/address/deliveryPincode/",formdata)
          .then((response) => {
              if(response.status ==201){
                toast.success('Pincode added successfully');
                document.getElementById("pincode_form").reset();
               
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
                    <h3 className="mb-sm-0">Add Pincode</h3>
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
                                <h2 className="mb-0">Add Pincode</h2>
                            </div>
                            <form action="" 
                                onSubmit={this.pincodeAdd} 
                                method="post" 
                                id="pincode_form" 
                                encType="multipart/form-data">
                                <div className="card-body">
                                    <div className="row" id="view">
                                        <div className="col-md-3 ">
                                            <label>Pin Code<span style={{color:'red'}}>*</span></label>
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="pincode" placeholder="Add Pin Code" required />
                                                <span className="text-danger"></span>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <label>Minimum Order<span style={{color:'red'}}>*</span></label>
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="minPrice" placeholder="Add Minimum Order" required />
                                                <span className="text-danger"></span>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <label>Delivery Charge<span style={{color:'red'}}>*</span></label>
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="deliveryCharge" placeholder="Add Delivary Charge" required />
                                                <span className="text-danger"></span>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <label>COD<span style={{color:'red'}}>*</span></label>
                                            <div className="form-group">
                                               <select className="form-control" name="cod">
                                                   <option value="YES">YES</option>
                                                   <option value="NO">NO</option>
                                               </select>
                                                <span className="text-danger"></span>
                                            </div>
                                        </div>
                                      
                                    </div>
                                   
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


