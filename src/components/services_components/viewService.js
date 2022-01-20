import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import queryString from 'query-string';
import {get, put, patch, authget, DELETE, formpost} from '../../utils/service';
import ToastServive from 'react-material-toast';
import imageValid from "../../utils/imageValid";
import {checkAuth} from '../../utils/auth';
import ReactToPrint from "react-to-print";
var Barcode = require('react-barcode');
var Htmltotext = require('html-to-text');

const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });

export default class viewService extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            id:params.id,
            details:[],
        };
    }
    componentDidMount() {
       
        authget("/service/singleService/"+this.state.id)
        .then((response) => {
            this.setState({
                details:response.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
               <div className="page-header mt-0 p-3">
                <h3 className="mb-sm-0">{this.state.details.name}</h3>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <Link to="#"><i className="fe fe-home"></i></Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Vendor Dashboard</li>
                    </ol>
                </div>

                <div className="row">
               
                    <div className="col-md-6 col-xl-6">

                        <div className="card shadow">
                            <div className="card-header">
                                <h2 className="mb-0">Service Details</h2>
                            </div>
                            
                            <div className="card-body text-left ">
                                <div className="row">
                                <div className="con-md-12" style={{marginLeft: "17px"}}>
                                    Name : <b style={{fontSize: "18px"}}>{this.state.details.name}</b><br />
                                    Tag Line : <b>{this.state.details.tagLine}</b><br />
                                    MRP : <b>{this.state.details.mrp}</b><br />
                                    Price : <b>{this.state.details.price}</b><br />
                                    Location : {this.state.details.location}<br />
                                </div>
                             </div>
                                Vendor Active Status : <b>{
                                    this.state.details.vendoractiveStatus==true? <>YES</> : <>NO</>
                                
                                }</b><br />
                                 Admin Approval : <b>{
                                    this.state.details.activeStatus==true? <>YES</> : <>NO</>
                                
                                }</b><br />

                            
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-6">
                        <div className="card shadow">
                            <div className="card-header">
                                <h2 className="mb-0">Service Image</h2>
                            </div>
                            <div className="card-body text-center">
                                <a target="_blank" href={process.env.REACT_APP_DEV_URL + '/NWxctXUSLz1Gg/'+this.state.details.img}><img src={process.env.REACT_APP_DEV_URL + '/NWxctXUSLz1Gg/'+this.state.details.img} style={{width:"220px"}} /></a>
                            </div>
                        </div>
                    </div>
                </div>

           
                <div className="row">
                    <div className="col-md-12 col-xl-12">
                        <div className="card shadow">
                            <div className="card-header">
                                <h2 className="mb-0">Service Description</h2>
                            </div>
                            <div className="card-body">

                            {Htmltotext.fromString(this.state.details.description)}
                            
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        )
    }
}
