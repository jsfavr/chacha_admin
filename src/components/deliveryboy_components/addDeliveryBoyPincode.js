import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {get,formpost} from '../../utils/service';
import ToastServive from 'react-material-toast';
import queryString from 'query-string';
const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class addDeliveryBoyPincode extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            id:params.id,
           pincode_details:[],
           pinCh:[]
        }
    }
    componentDidMount(){

            document.title = 'Add Delivery Boy Pincode : Admin Dashboard - Hardwarechacha';
            document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
          
        get("/address/deliveryPincode/")
        .then((res)=>{
          //console.log(res.data)
          if(res.status == 200){
            this.setState({
                pincode_details:res.data.filter(item => item.activeStatus == true)
                
            })
           // console.log(this.state.pincode_details)
          }else{
            window.Location.href='/login'
          }
       //   console.log(res)
        }).catch((err)=>{
    
        })
      }
    handleSubmit =(e) =>{
        e.preventDefault();
        var formdata = new FormData(e.target);
        formdata.append('user_id', this.state.id);
        formdata.append('activeStatus', 1);
        var d=[...formdata]
        //console.log(d[0][1])
        if(d[0][1]!=0){
            get("/address/deliveryBoyPincode/")
            .then((res)=>{
               // console.log(res)
                var pinCh1=res.data.filter(item => item.user_id == this.state.id)
               // console.log(pinCh1)
                this.setState({
                     
                     pinCh:pinCh1.filter(item => item.pincode == d[0][1])
                     
                })
               // console.log(this.state.pinCh)
                if(this.state.pinCh.length==0){         
                    formpost("/address/deliveryBoyPincode/",formdata)
                    .then((res)=>{
                   // console.log(res)
                        toast.success('Pincode added Successfully');
                    }).catch((err)=>{
                        toast.error('Opps! Something is wrong');
                    })
                }else{
                    toast.error('Pincode already added');
                }
            }).catch((err)=>{
                 toast.error('Opps! Something is wrong');
            })
        }else{
            toast.error('Please Select Pincode');
        }
           
     
    }
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Delivery Boy Pincode</h3>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <a href="#">
                                <i className="fe fe-home"></i>
                            </a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Admin Dashboard
                        </li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow">
                            <div className="card-body row">
                            <div class="card-body" style={{border: "solid 0px",padding: "1.6rem",borderRadius: "20px", margin: "10px"}}> 
                                          
                                          <form onSubmit={this.handleSubmit}>
                                          <div class="widget text-left">
                                              <label class="">
                                                    Select Pincode
                                              </label>
                                              <select class="form-control" name="pincode">
                                              <option value='0'>--Select Pincode--</option>
                                                    {
                                                        this.state.pincode_details.map((object, i) => (
                                                            <option value={object.pincode}>{object.pincode}</option>
                                                        ))
                                                    }
                                              </select>

                                          </div>
                                          <div class="widget text-center">
                                              <input type="submit" value="Submit"/>
                                            </div>
                                            </form>
                                      </div>
                                      
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
