import React, { Component } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'; 
import {get,DELETE} from '../../utils/service';
import * as CONSTANT from '../../utils/constant'
import ToastServive from 'react-material-toast';

export default class mostView extends Component {
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
        document.title = 'Most Viewed Product : Admin Dashboard - Hardwarechacha';
        get("/product/AdminTopViewProduct/")
        .then((response) => {
            //console.log(response.data);
            this.setState({ topProduct: response.data });
          
        })
        .catch(function (error) {
            console.log(error);
        });
        get("/product/AdminLowestViewProduct/")
        .then((response) => {
            //console.log(response);
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
                    Customer Viewed Product
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
                                <div className="table-responsive table">
                                    {
                                        this.state.productType==0?<><h2>Most Viewed Product <span className="btn-sm btn btn-primary" style={{float:"right",cursor:"pointer"}} onClick={()=>this.handleChange(1)}>Lowest Viewed Product</span></h2></>:<><h2>Lowest Viewed Product<span className="btn-sm btn btn-primary" onClick={()=>this.handleChange(0)} style={{float:"right"}}>Most Viewed Product</span></h2></>
                                    }<br/>
                                    <table id="example" className="table table-striped table-bordered w-100 text-nowrap" style={{border:"solid 1px"}} cellPadding="10" cellSpacing="10">
                                        <thead>
                                            <tr>
                                                <th style={{border:"solid 1px #dee2e6"}}>Product Code</th>
                                                <th style={{border:"solid 1px #dee2e6"}}>Product Name</th>
                                                <th style={{border:"solid 1px #dee2e6"}}>View Count</th>
                                             
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.productType==0?
                                                this.state.topProduct.map((object, i) => (
                                                    <tr key={i}>
                                                        <td style={{border:"solid 1px #dee2e6"}} >{object.code}</td>
                                                        <td style={{border:"solid 1px #dee2e6"}} ><Link to={"/productDetails?id="+object.id}>{object.name}</Link></td>
                                                    

                                                        <td style={{border:"solid 1px #dee2e6"}} >
                                                        {object.count}
                                                    </td>
                                                 
                                                    </tr>
                                                    ))
                                                :
                                                this.state.lowestProduct.map((object, i) => (
                                                    <tr key={i}>
                                                        <td style={{border:"solid 1px #dee2e6"}} >{object.code}</td>
                                                        <td style={{border:"solid 1px #dee2e6"}} ><Link to={"/productDetails?id="+object.id}>{object.name}</Link></td>
                                                    

                                                        <td style={{border:"solid 1px #dee2e6"}} >
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
