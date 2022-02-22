import React, { Component } from "react";
import {get,withoutauthformpost,post} from '../../utils/service';
import ToastServive from 'react-material-toast';
import {imageValid} from "../../utils/imageValid";
const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class Addcoupon extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  componentDidMount() {
    document.title = 'Add Coupon : Admin Dashboard - Hardwarechacha';
    document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
  }
  couponAdd = (e) =>{
    e.preventDefault();
    var formdata = new FormData(e.target);
    formdata.append('activeStatus', 1);
      withoutauthformpost("/banner/coupon/",formdata)
      .then((response) => {
          if(response.status ==201){
            toast.success('Coupon added successfully');
            document.getElementById("coupon_form").reset();
            this.props.history.push('/viewcoupon');
          //window.location.href='/login';
          }else{
              
            toast.error('Opps! Something is wrong');
          
          }
      })
      .catch(function (error) {
          console.log(error);
      }); 
    
}
  render() {
    return (
      <div >
        <div className="page-header mt-0  p-3">
          <h3 className="mb-sm-0">Add coupon</h3>
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="#">
                <i className="fe fe-home"></i>
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add coupon
            </li>
          </ol>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card shadow">
              <form
               action="" 
               onSubmit={this.couponAdd} 
               method="post" 
               id="coupon_form" 
               encType="multipart/form-data"
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Add coupon<span style={{color:'red'}}>*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          placeholder="Enter Coupon Title"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">
                          Coupon Image(1090px X 245px)<span style={{color:'red'}}>*</span>
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={imageValid}
                          name="couponImage"
                          id="coupon_image"
                          placeholder="Enter Coupon Image"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Coupon Value<span style={{color:'red'}}>*</span></label>
                        <input
                          type="number"
                          className="form-control"
                          name="discount"
                          placeholder="Enter Coupon Value"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">
                          Coupon Validity Date<span style={{color:'red'}}>*</span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="couponValidDate"
                          placeholder="Enter Coupon Validity Date"
                          required=""
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Coupon Code<span style={{color:'red'}}>*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          name="couponCode"
                          placeholder="Enter Coupon Code"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Minimum Value<span style={{color:'red'}}>*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          name="minPrice"
                          placeholder="Enter Minimum Value"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Coupon Type<span style={{color:'red'}}>*</span></label>
                        <select className="form-control"  name="couponType"  required>
                            <option   defaultValue="0">--Select Category-- </option>
                            <option value="PERCENTAGE">PERCENTAGE </option>
                            <option value="FLAT">FLAT</option>
                        
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group"></div>
                    </div>

                   
                  </div>
                  <center>
                    <input
                      type="submit"
                      className="btn btn-primary mt-1 mb-1"
                    />
                  </center>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
