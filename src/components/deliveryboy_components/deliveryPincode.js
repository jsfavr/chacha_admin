import React, { Component } from 'react'
import queryString from 'query-string';
import {Link} from 'react-router-dom'
import Moment from 'moment';
import {get,withoutauthpatch,withoutauthdelete} from '../../utils/service';
import ToastServive from 'react-material-toast';
const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });

export class deliveryPincode extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {    
            id:params.id,
            pincode_details:[],
            name:''
        }
      }
      componentDidMount() {
        document.title = 'Delivery Pincode : Admin Dashboard - Hardwarechacha';
        document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
        get("/address/delBoyPincodedetails/"+this.state.id)
        .then((response) => {
            // if(JSON.parse(response.data.delivery_boy.lenght >0)
        //    console.log(response.data);
            this.setState({ 
                pincode_details: JSON.parse(response.data.delivery_boy),
                name: JSON.parse(response.data.user)[0].fields.name,
             });
        })
        .catch(function (error) {
            console.log(error);
        });

    }
    pincodestatusChange=(id,pra)=>{
        console.log(id);
        console.log(pra);
        const data = {
            activeStatus:pra
        }
        withoutauthpatch("/address/deliveryBoyPincode/"+id,data)
        .then((response) => {
            
            toast.success('Pincode Staus Update Successfully');
            get("/address/delBoyPincodedetails/"+this.state.id)
                .then((response) => {
                    // if(JSON.parse(response.data.delivery_boy.lenght >0)
                //    console.log(response.data);
                    this.setState({ 
                        pincode_details: JSON.parse(response.data.delivery_boy),
                        name: JSON.parse(response.data.user)[0].fields.name,
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
                
        })
        .catch(function (error) {
            console.log(error);
            toast.error('Sorry!! Pincode Status Update Unsuccessful');
        });
    }
    deliveryPincodeDetails = () =>{
        return this.state.pincode_details.map((obj,i)=>{
            return(
                <tr key={i}>
                    <td>
                        {obj.fields.pincode}
                        <span style={{float: "right"}}> </span>
                    </td>
                    <td>
                        {
                          obj.fields.activeStatus == true ?
                          <span>
                            <p style={{margin: "0px 0px -5px 0px"}}>
                                <a className="btn btn-icon btn-pill btn-danger mt-1 mb-1 btn-sm text-white" onClick={()=>this.pincodestatusChange(obj.pk,0)}>InActive</a>
                               
                            </p>
                            <span className="badge badge-primary"><b>Pincode is Active</b></span>
                          </span>
                          :
                          <span>
                            <p style={{margin: "0px 0px -5px 0px"}}>
                                <a className="btn btn-icon btn-pill btn-success mt-1 mb-1 btn-sm text-white" onClick={()=>this.pincodestatusChange(obj.pk,1)}>Active</a>
                                
                            </p>
                            <span className="badge badge-primary"><b>Pincode is Inactive</b></span>
                          </span>
                        }
                        
                    </td>
                </tr>
            );
        })
    }
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Delivered Pincodes List</h3>
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
                                <h2 className="mb-0">Delivery Boy Name : {this.state.name}  <Link to={"addDeliveryBoyPincode?id="+this.state.id} className="btn btn-info mt-1 mb-1 btn-sm" style={{float:"right"}}>+ Add Pincode</Link></h2>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table id="example" className="table table-striped table-bordered w-100 text-nowrap">
                                        <thead>
                                            <tr>
                                                <th className="wd-15p">Pincode</th>
                    
                                                <th className="wd-15p">
                                                    Active/<br />
                                                    Deactivate
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          {this.deliveryPincodeDetails()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default deliveryPincode
