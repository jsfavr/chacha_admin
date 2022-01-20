import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {get,withoutauthpatch,withoutauthdelete} from '../../utils/service';
import ToastServive from 'react-material-toast';
const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export class viewPincode extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           pincode_details:[]  
        }
    }
    componentDidMount(){
      document.title = 'Pincode : Admin Dashboard - Crowd';
      document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
        get("/address/deliveryPincode/")
        .then((res)=>{
        
          if(res.status == 200){
            this.setState({
                pincode_details:res.data.sort((a, b) => (b > a ? 1 : -1))
            })
          }else{
            window.Location.href='/login'
          }
         
        }).catch((err)=>{
    
        })
      }
      pincodestatusChange =(id,pro)=>{
        const data = {
          activeStatus:pro
        }
        withoutauthpatch("/address/deliveryPincode/"+id,data)
        .then((response) => {
          
            toast.success('Pincode Staus Update Successfully');
            get("/address/deliveryPincode/")
            .then((res)=>{
              if(res.status == 200){
                this.setState({
                    pincode_details:res.data.sort((a, b) => (b > a ? 1 : -1))
                })
              }else{
                window.Location.href='/login'
              }
              console.log(res)
            }).catch((err)=>{
    
            })
            
        })
        .catch(function (error) {
            console.log(error);
            toast.error('Sorry!! Pincode Status Update Unsuccessful');
        });
      }
      pincodeDelete =(id)=>{
        withoutauthdelete("/address/deliveryPincode/"+id)
        .then((response) => {
          toast.success('Pincode Delete Successfully');
          this.setState({
            pincode_details: this.state.pincode_details.filter(item => item.id != id)
           
          })
        //  console.log(this.state.category);
        })
        .catch(function (error) {
            console.log(error);
            toast.error('Sorry!! Category Delete Unsuccessful');
        });
      }
      pincodeDetails =()=>{
        return this.state.pincode_details.map((obj,i)=>{
          return(
            <tr role="row" className="odd" key={i}>
              <td className="sorting_1">{obj.pincode}</td>
              <td>{obj.minPrice}</td>
              <td>{obj.deliveryCharge}</td>
              <td>{obj.cod}</td>
              <td>
                {obj.activeStatus == true ?
                <a className="btn btn-icon btn-pill btn-success mt-1 mb-1 btn-sm text-white" onClick={()=>this.pincodestatusChange(obj.id,0)}>Active</a>
                :
                <a className="btn btn-icon btn-pill btn-danger  mt-1 mb-1 btn-sm text-white" onClick={()=>this.pincodestatusChange(obj.id,1)}>Inactive</a>
                }
               
              </td>
              <td>
                 <Link to={"/updatePincode?id="+obj.id} className="btn btn-primary btn-square mt-1 mb-1 text-white" >Update</Link>
                <a className="btn btn-danger btn-square mt-1 mb-1 text-white" onClick={()=>this.pincodeDelete(obj.id)}>Delete</a>
               
               
              </td>
            </tr>
          );
        })
      }
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">View Pincode</h3>
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
                                <h2 className="mb-0">All Pincode</h2>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                <table id="example" className="table table-striped table-bordered w-100 text-nowrap">
                                    <thead>
                                        <tr>
                                            <th className="wd-15p">Pin</th>
                                            <th className="wd-15p">
                                                Minimum<br />
                                                Price
                                            </th>
                                            <th className="wd-15p">
                                                Deliver<br />
                                                Charge
                                            </th>
                                            <th>Cod</th>
                                            <th>
                                                Active/<br />
                                                Non-<br />
                                                Active
                                            </th>
                                            <th className="wd-20p">Auction</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {this.pincodeDetails()}
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

export default viewPincode
