import React, { Component } from "react";
import {get,withoutauthpatch,withoutauthdelete} from '../../utils/service';
import ToastServive from 'react-material-toast';
const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class Viewcoupon extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       coupon_details:[]
    }
  }
  componentDidMount(){

      document.title = 'View Coupon : Admin Dashboard - Crowd';
      document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
    get("/banner/coupon/")
    .then((res)=>{
     
      if(res.status == 200){
        this.setState({
          coupon_details:res.data
        })
      }else{
        window.Location.href='/login'
      }
     
    }).catch((err)=>{

    })
  }
  couponstatusChange =(id,pro)=>{
    const data = {
      activeStatus:pro
    }
    withoutauthpatch("/banner/coupon/"+id,data)
    .then((response) => {
      
        toast.success('Coupon Staus Update Successfully');
        get("/banner/coupon/")
        .then((res)=>{
          if(res.status == 200){
            this.setState({
              coupon_details:res.data
            })
          }else{
            window.Location.href='/login'
          }
         
        }).catch((err)=>{

        })
        
    })
    .catch(function (error) {
        console.log(error);
        toast.error('Sorry!! Coupon Status Update Unsuccessful');
    });
  }
  couponDelete =(id)=>{
    withoutauthdelete("/banner/coupon/"+id)
    .then((response) => {
      toast.success('Coupon Delete Successfully');
      this.setState({
        coupon_details: this.state.coupon_details.filter(item => item.id != id)
       
      })
    //  console.log(this.state.category);
    })
    .catch(function (error) {
        console.log(error);
        toast.error('Sorry!! Category Delete Unsuccessful');
    });
  }
  couponDetails =()=>{
    return this.state.coupon_details.map((obj,i)=>{
      return(
        <tr key={i}>
          <td>{obj.title}</td>
          <td>{obj.discount}</td>
          <td>{obj.couponType}</td>
          <td>{obj.minPrice}</td>
          <td>{obj.couponValidDate}</td>
          <td>{obj.couponCode}</td>
          <td>
            {obj.activeStatus == true ?
            <a className="btn btn-icon btn-pill btn-success mt-1 mb-1 btn-sm text-white" onClick={()=>this.couponstatusChange(obj.id,0)}>Active</a>
            :
            <a className="btn btn-icon btn-pill  btn-danger mt-1 mb-1 btn-sm text-white" onClick={()=>this.couponstatusChange(obj.id,1)}>Inactive</a>
            }
           
          </td>
          <td>
            <a className="btn btn-primary btn-square mt-1 mb-1 text-white" onClick={()=>this.couponDelete(obj.id)}>Delete</a>
           
          </td>
        </tr>
      );
    })
  }
  render() {
    return (
      <div >
        <div className="page-header mt-0  p-3">
          <h3 className="mb-sm-0">View Coupon</h3>
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="#">
                <i className="fe fe-home"></i>
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              View Coupon
            </li>
          </ol>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card shadow">
              <div className="card-header">
                <h2 className="mb-0">View Coupon</h2>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="example"
                    className="table table-striped table-bordered w-100 text-nowrap"
                  >
                    <thead>
                      <tr>
                        <th className="wd-15p">Coupon Title</th>
                        <th className="wd-15p">Discount Vlaue</th>
                        <th className="wd-15p">Coupon Type</th>
                        <th className="wd-15p">Minimum Price</th>
                        <th className="wd-15p">Validated Date</th>
                        <th className="wd-15p">Coupon Code</th>
                        <th className="wd-15p">Status</th>
                        <th className="wd-25p">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.couponDetails()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
