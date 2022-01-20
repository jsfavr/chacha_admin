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
export default class Productgroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
             group:[],
          
        }
    }
    componentDidMount() {
        document.title = 'Product Group : Admin Dashboard - Crowd';
        document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
        get("/product/group/")
        .then((response) => {
           // console.log(response);
            this.setState({ group: response.data.sort((a, b) => (b > a ? 1 : -1)) });
           // console.log(this.state.category);
        })
        .catch(function (error) {
            console.log(error);
        });
    
      }
      
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">
                        <Link to="/addgroup" type="button" className="btn btn-primary mt-1 mb-1">
                            Add More Group
                        </Link>
                    </h3>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <a href="/">
                                <i className="fe fe-home"></i>
                            </a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Product Group
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
                                                <th>Group Name</th>
                                            

                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {

                                            this.state.group.map((object, i) => (
                                                <tr key={i}>
                                                    <td>{object.group_name}</td>
                                                   

                                                    <td>
                                                        <Link to={"updategroup?id="+object.id+"&name="+object.group_name} type="button" className="btn btn-icon btn-pill btn btn-info mt-1 mb-1 btn-sm text-white">
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
        );
    }
}
