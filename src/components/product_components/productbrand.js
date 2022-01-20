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
export default class productbrand extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
             brand:[],
          
        }
    }
    
      componentDidMount() {
        document.title = 'Product Brand : Admin Dashboard - Crowd';
        document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
        get("/product/brand/")
        .then((response) => {
           // console.log(response);
            this.setState({ brand: response.data.sort((a, b) => (b > a ? 1 : -1)) });
           // console.log(this.state.category);
        })
        .catch(function (error) {
            console.log(error);
        });
        // document.getElementsByTagName('table').dataTable();
    
      }
   
    render() {
        return (
            <div>
            <div className="page-header mt-0 p-3">
                <h3 className="mb-sm-0">
                    <Link to="/addbrand" type="button" className="btn btn-primary mt-1 mb-1">
                        Add More Brand
                    </Link>
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
                                <table id="example" className="table table-striped table-bordered w-100 text-nowrap">
                                    <thead>
                                        <tr>
                                            <th>Brand Name</th>
                                            <th>Brand Logo</th>
                

                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {

                                    this.state.brand.map((object, i) => (
                                        <tr key={i}>
                                            <td>{object.brand_name}</td>
                                            <td><img src={object.brand_logo} style={{height:"60px"}}/></td>
                                          

                                            <td>
                                                <Link to={"updatebrand?id="+object.id} type="button" className="btn btn-icon btn-pill btn btn-info mt-1 mb-1 btn-sm">
                                                    Update
                                                </Link>

                                                
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
        )
    }
}
