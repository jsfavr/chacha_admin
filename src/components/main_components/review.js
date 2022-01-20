import React, { Component } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'; 
import {get,DELETE} from '../../utils/service';
import * as CONSTANT from '../../utils/constant'
import ToastServive from 'react-material-toast';
var wrap = require('word-wrap');
export default class review extends Component {
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
        document.title = 'Product Review : Admin Dashboard - Crowd';
        get("/other/AdminHighRatting/")
        .then((response) => {
            //console.log(response.data);
            this.setState({ topProduct: response.data });
          
        })
        .catch(function (error) {
            console.log(error);
        });
        get("/other/AdminLowRatting/")
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
                    Customer Retting and Review
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
                                        this.state.productType==0?<><h2>Highest Ratting <span className="btn-sm btn btn-primary" style={{float:"right",cursor:"pointer"}} onClick={()=>this.handleChange(1)}>Lowest Ratting</span></h2></>:<><h2>Lowest Ratting<span className="btn-sm btn btn-primary" onClick={()=>this.handleChange(0)} style={{float:"right"}}>Highest Ratting</span></h2></>
                                    }<br/>
                                    <table id="example" className="" style={{border:"solid 1px"}} cellPadding="10" cellSpacing="10">
                                        <thead>
                                            <tr>
                                                <th style={{border:"solid 1px #dee2e6", width:"15%"}}>Product Code</th>
                                                <th style={{border:"solid 1px #dee2e6", width:"25%"}}>Product Name</th>
                                                <th style={{border:"solid 1px #dee2e6", width:"10%"}}>Ratting</th>
                                                <th style={{border:"solid 1px #dee2e6", width:"50%"}}>Comments</th>
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
                                                        {object.ratting}★
                                                    </td>
                                                    <td style={{border:"solid 1px #dee2e6"}} >
                                                   
                                                    <span>{wrap(object.comments,{width: 10})}</span>
                                                    </td>
                                                    </tr>
                                                    ))
                                                :
                                                this.state.lowestProduct.map((object, i) => (
                                                    <tr key={i}>
                                                        <td style={{border:"solid 1px #dee2e6"}} >{object.code}</td>
                                                        <td style={{border:"solid 1px #dee2e6"}} ><Link to={"/productDetails?id="+object.id}>{object.name}</Link></td>
                                                    

                                                        <td style={{border:"solid 1px #dee2e6"}} >
                                                        {object.ratting}★
                                                    </td>
                                                    <td style={{border:"solid 1px #dee2e6"}} >
                                                    <span>{object.comments}</span>
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
