import React, { Component } from 'react'
import {get,withoutauthpatch,withoutauthdelete} from '../../utils/service';
import ToastServive from 'react-material-toast';
import queryString from 'query-string';
import {Link} from 'react-router-dom'

export class returnDetails extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
             deliver_details:[],
             name:'',
             get_id:params.delivery_boy_id,
             total_booking:0,
             delivery_booking:0,
             Pending_booking:0
        }
    }
   componentDidMount(){
    document.title = 'Return Details : Admin Dashboard - Hardwarechacha';
    document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
       get('/booking/retunboyReport/'+this.state.get_id)
       .then(res=>{
           console.log(res.data)
           this.setState({
                deliver_details:res.data,
                total_booking:res.data[0].total_booking,
                delivery_booking:res.data[0].delivery_booking,
                Pending_booking:parseInt(res.data[0].total_booking)-parseInt(res.data[0].delivery_booking),
                name:res.data[0].returnBoy.name
           })
       }).catch(err=>{

       })
   }
   getReport=()=>{
       return this.state.deliver_details.map((obj,i)=>{
           return(
            <tr key={i}>
                <td>{obj.bookingDetails.orderDate}</td>
                <td>
                    <Link to={"/Viewbooking?booking_id="+obj.bookingDetails.booking_id}>{obj.bookingDetails.OrderID}</Link>
                </td>

                <td>₹ {obj.bookingDetails.productPayablePrice}/-</td>
                <td>{obj.shippingAddress.pincode}({obj.shippingAddress.city})</td>
                <td>{obj.bookingDetails.orderStatus == 1 ?
                        <>
                        <span className="badge badge-primary">Order Under Process</span><br />
                        </>:
                        obj.bookingDetails.orderStatus == 2 ?
                        <>
                        <span className="badge badge-primary">Order In Transit</span><br />
                        </>:
                        obj.bookingDetails.orderStatus == 3 ?
                        <>
                        <span className="badge badge-primary">Out for Delivery</span><br />
                        </>:
                        obj.bookingDetails.orderStatus == 4 ?
                        <>
                        <span className="badge badge-primary">Delivered</span><br />
                        </>:
                        obj.bookingDetails.orderStatus == 5 ?
                        <>
                        <span className="badge badge-primary">Return Under Process</span><br />                  
                        </>:
                        obj.bookingDetails.orderStatus == 6 ?
                        <>
                        <span className="badge badge-primary">Ready for Return</span><br />
                        </>:
                        obj.bookingDetails.orderStatus == 7 ?
                        <>
                        <span className="badge badge-primary">Out for Pickup</span><br />
                        
                        </>:
                        obj.bookingDetails.orderStatus == 8 ?
                        <>
                        <span className="badge badge-danger">Returned</span><br />
                       
                        </>:
                        obj.bookingDetails.orderStatus == 9 ?
                        <>
                        <span className="badge badge-danger">Canceled</span><br />
                            
                        </>:
                        null
                    }                
                   <br /></td>

                <td>{obj.bookingDetails.returnDate}</td>
            </tr>
       
           );
       })
   }
    render() {
        return (
            <div>
            <div className="page-header mt-0 p-3">
                 <h3 className="mb-0" style={{float: "left"}}>Return Boy Name : <b>{this.state.name}</b></h3>
                 <ol className="breadcrumb mb-0">
                     <li className="breadcrumb-item">
                         <a href="#"><i className="fe fe-home"></i></a>
                     </li>
                     <li className="breadcrumb-item active" aria-current="page">Admin Dashboard</li>
                 </ol>
             </div>
             <div className="row">
                 <div className="col-xl-4 col-md-6">
                     <div className="card shadow text-center">
                         <div className="card-body">
                             <h3 className="mb-3">Return Assigned</h3>
                             <div className="chart-circle" data-value="1.0" data-thickness="10" data-color="#ad59ff">
                                 <canvas width="128" height="128"></canvas><canvas width="128" height="128"></canvas><canvas width="128" height="128"></canvas>
                                 <div className="chart-circle-value"><div className="text-xxl">{this.state.total_booking}</div></div>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div className="col-xl-4 col-md-6">
                     <div className="card shadow text-center">
                         <div className="card-body">
                             <h3 className="mb-3">Successfully Returned</h3>
                             <div className="chart-circle" data-value="1.0" data-thickness="10" data-color="#00d9bf">
                                 <canvas width="128" height="128"></canvas><canvas width="128" height="128"></canvas><canvas width="128" height="128"></canvas>
                                 <div className="chart-circle-value"><div className="text-xxl">{this.state.delivery_booking}</div></div>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div className="col-xl-4 col-md-6">
                     <div className="card shadow text-center">
                         <div className="card-body">
                             <h3 className="mb-3">Pending Return</h3>
                             <div className="chart-circle" data-value="1.0" data-thickness="10" data-color="#00b3ff">
                                 <canvas width="128" height="128"></canvas><canvas width="128" height="128"></canvas><canvas width="128" height="128"></canvas>
                                 <div className="chart-circle-value"><div className="text-xxl">{this.state.Pending_booking}</div></div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
             <div className="row">
                 <div className="col-md-12">
                     <div className="card shadow">
                         <div className="card-header">
                             <h2 className="mb-0">Delivery Details</h2>
                         </div>
                         <div className="card-body">
                             <div className="table-responsive">
                                 <table id="example" className="table table-striped table-bordered w-100 text-nowrap">
                                     <thead>
                                         <tr role="row">
                                             <th className="wd-15p">
                                                 Order <br />
                                                 Date
                                             </th>
                                             <th className="wd-15p">
                                                 Order<br />
                                                 ID
                                             </th>
                                             <th className="wd-15p">
                                                 Order <br />
                                                 Value
                                             </th>
                                             <th className="wd-15p">
                                                 Pickup <br />
                                                 Pincode
                                             </th>
                                             <th className="wd-15p">
                                                 Return <br />
                                                 Status<br />
                                             </th>
                                             <th className="wd-15p">
                                                Returned <br />
                                                 Date
                                             </th>
                                         </tr>
                                     </thead>
                                     <tbody>
                                     {this.getReport()}
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

export default returnDetails
