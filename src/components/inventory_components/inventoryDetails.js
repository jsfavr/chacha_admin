import React, { Component } from "react";
import {Link} from 'react-router-dom'
import {get,withoutauthpatch,withoutauthdelete} from '../../utils/service';
import ToastServive from 'react-material-toast';
import queryString from 'query-string';
import Moment from 'moment';
const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class inventoryDetails extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            id:params.id,
           product:[],
           inventory:[]
        }
      }
      componentDidMount(){
        document.title = 'Inventory Details : Admin Dashboard - Hardwarechacha';
        document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
        get("/product/viewadminProducts/"+this.state.id)
        .then((res)=>{
          
          if(res.status == 200){
            this.setState({
               // product:JSON.parse(res.data[0].details)
                product:JSON.parse(res.data[0].details)[0].fields
            })
          }else{
           // window.Location.href='/login'
          }
          
        }).catch((err)=>{
            console.log(err)
        })
        get("/other/inventoryTransaction/")
        .then((res)=>{
           // console.log(res)
          if(res.status == 200){
              //console.log(res.data.sort((a,b) =>  a.id-b.id))
            this.setState({
               // product:JSON.parse(res.data[0].details)
               inventory:res.data.sort((a,b) =>  b.id-a.id)
            })
           
          }else{
           // window.Location.href='/login'
          }
          
        }).catch((err)=>{
            console.log(err)
        })

      }
      Details =()=>{
        return this.state.inventory.map((obj,i)=>{
          return(
        //     <tr>
        //     <td>{JSON.parse(obj.details)[0].fields.productCode}</td>
        //     <td> {JSON.parse(obj.details)[0].fields.productName}</td>
        //     <td> Size : {JSON.parse(obj.details)[0].fields.size}<br/>Color : <span style={{color:JSON.parse(obj.details)[0].fields.color}}>{JSON.parse(obj.details)[0].fields.color}</span></td>
        //     <td> {JSON.parse(obj.details)[0].fields.totalStock}</td>
        //     <td> {JSON.parse(obj.details)[0].fields.totalStock-JSON.parse(obj.details)[0].fields.availableStock}</td>
        //     <td> <b style={{fontSize:"20px"}}>{JSON.parse(obj.details)[0].fields.availableStock} </b></td>
        //     <td>
        //         <Link to={"inventoryDetails?id="+JSON.parse(obj.details)[0].pk} className="btn btn-icon btn-sm btn-primary mt-1 mb-1" style={{color: "white"}}>
        //             <span className="btn-inner--icon"><i className="fe fe-eye"></i></span>
        //             <span className="btn-inner--text">More Details</span>
        //         </Link>
        //         {/* <Link to="addStock?product_id=15" className="btn btn-icon btn-sm btn-info mt-1 mb-1" style={{color: "white"}}>
        //             <span className="btn-inner--icon"><i className="fe fe-plus"></i></span>
        //             <span className="btn-inner--text">Add Stoke</span>
        //         </Link> */}
        //     </td>
        //  </tr>
          
          <tr>
          <td>{Moment(obj.transactionDate).format('LLLL')}</td>
          <td>{obj.transactionID}</td>
          <td>{obj.remarks}</td>
          <td>{obj.transactionType}<br /></td>
          <td>
              {
                  obj.transactionType=='DEBIT'?
                  <span style={{color: "#6c757d", fontSize: "20px", fontWeight: "bold"}}>-{obj.quantity}</span>
                   :<span style={{color: "#6c757d", fontSize: "20px", fontWeight: "bold"}}>+{obj.quantity}</span>
                 
              }
              
          </td>
          <td>{obj.afterTransactionQuantity}</td>
      </tr>


          );
        })
      }
    render() {
        return (
            <div>
               <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{paddingRight: "30px"}}>
                                        <h3 className="mb-0">Product Name : <b>{this.state.product.productName}</b></h3>
                                    </td>
                                    <td style={{paddingRight: "30px"}}>
                                        <h3 className="mb-0">Product Size : <b>{this.state.product.size}</b></h3>
                                    </td>
                                    <td>
                                        <h3 className="mb-0">Product Color : <b style={{color:this.state.product.color}}>{this.state.product.color}</b></h3>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </h3>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <Link to="/"><i className="fe fe-home"></i></Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Admin Dashboard</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-xl-4 col-md-6">
                        <div className="card shadow text-center">
                            <div className="card-body">
                                <h3 className="mb-3">Total Stock</h3>
                                <div className="chart-circle" data-value="1.0" data-thickness="10" data-color="#ad59ff">
                                    <canvas width="128" height="128"></canvas><canvas width="128" height="128"></canvas><canvas width="128" height="128"></canvas>
                                    <div className="chart-circle-value"><div className="text-xxl">{this.state.product.totalStock}</div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="card shadow text-center">
                            <div className="card-body">
                                <h3 className="mb-3">Out Stock</h3>
                                <div className="chart-circle" data-value="1.0" data-thickness="10" data-color="#00d9bf">
                                    <canvas width="128" height="128"></canvas><canvas width="128" height="128"></canvas><canvas width="128" height="128"></canvas>
                                    <div className="chart-circle-value"><div className="text-xxl">{this.state.product.totalStock-this.state.product.availableStock}</div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="card shadow text-center">
                            <div className="card-body">
                                <h3 className="mb-3">Available Stock</h3>
                                <div className="chart-circle" data-value="1.0" data-thickness="10" data-color="#00b3ff">
                                    <canvas width="128" height="128"></canvas><canvas width="128" height="128"></canvas><canvas width="128" height="128"></canvas>
                                    <div className="chart-circle-value"><div className="text-xxl">{this.state.product.availableStock}</div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow">
                            <div className="card-header">
                                <h2 className="mb-0">
                                    Stock Transfer Details

                                    {/* <Link style={{float: "right"}} to={"/addStock?id="+this.state.id} className="btn btn-icon btn-sm btn-info mt-1 mb-1">
                                        <span className="btn-inner--icon"><i className="fe fe-plus"></i></span>
                                        <span className="btn-inner--text">Add Stoke</span>
                                    </Link> */}
                                </h2>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                <table id="example" className="table table-striped table-bordered w-100 text-nowrap">
                                    <thead>
                                        <tr>
                                            <th>
                                                Date &amp;<br />
                                                Time
                                            </th>
                                            <th>
                                                Transfer<br />
                                                ID
                                            </th>
                                            <th>Remarks</th>
                                            <th>Transfer Type<br /></th>
                                            <th>Transfer Qty</th>
                                            <th>Available Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.Details()}
                                       
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
