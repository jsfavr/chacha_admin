import React, { Component } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'; 
import {get,DELETE} from '../../utils/service';
import * as CONSTANT from '../../utils/constant'
import ToastServive from 'react-material-toast';
const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class sellingProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
             topProduct:[],
             lowestProduct:[],
             product:[],
             productType:0
          
        }
    }
    componentDidMount() {
        document.title = 'Top Selling Product : Admin Dashboard - Hardwarechacha';
        get("/product/AdminTopProduct/")
        .then((response) => {
           // console.log(response.data);
            this.setState({ topProduct: response.data });
          
        })
        .catch(function (error) {
            console.log(error);
        });
        get("/product/AdminLowestProduct/")
        .then((response) => {
           // console.log(response);
            this.setState({ lowestProduct: response.data});
          
        })
        .catch(function (error) {
            console.log(error);
        });
    
      }
      handleChange = (id) =>{
        this.setState({ productType: id});
      }
      
     
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">
                     Selling Product
                    </h3>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <a href="/">
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
                            <div className="card-body">
                                <div className="table-responsive">
                                    {
                                        this.state.productType==0?<><h2>Top Selling Product <span className="btn-sm btn btn-primary" style={{float:"right",cursor:"pointer"}} onClick={()=>this.handleChange(1)}>Lowest Selling Product</span></h2></>:<><h2>Lowest Selling Product<span className="btn-sm btn btn-primary" onClick={()=>this.handleChange(0)} style={{float:"right"}}>Top Selling Product</span></h2></>
                                    }<br/>
                                    <table id="example" className="table table-striped table-bordered w-100 text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>Product Code</th>
                                                <th>Product Name</th>
                                                <th>Total Sales</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.productType==0?
                                                this.state.topProduct.map((object, i) => (
                                                    <tr key={i}>
                                                        <td>{object.code}</td>
                                                        <td><Link to={"/productDetails?id="+object.id}>{object.name}</Link></td>
                                                    

                                                        <td>
                                                        {object.count}
                                                    </td>
                                                    </tr>
                                                    ))
                                                :
                                                this.state.lowestProduct.map((object, i) => (
                                                    <tr key={i}>
                                                        <td>{object.code}</td>
                                                        <td><Link to={"/productDetails?id="+object.id}>{object.name}</Link></td>
                                                    

                                                        <td>
                                                        {object.count}
                                                    </td>
                                                    </tr>
                                                    ))
                                            }

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
