import React, { Component } from 'react'
import ToastServive from 'react-material-toast';
import {formpost} from '../../utils/service';
import queryString from 'query-string';
import SimpleReactValidator from 'simple-react-validator';
import {imageValid} from '../../utils/imageValid'
import './Product.css'
const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class Addgroup extends Component {
    constructor() {
        super();
        this.state = {
          
        };
    }

    componentDidMount(){
        document.title = 'Add Group : Admin Dashboard - Crowd';
        document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
    }
  
    handleSubmit = (e) => {
            // if (this.validator.allValid()) {
                e.preventDefault();
                var formdata = new FormData(e.target);
            
                // console.log(...formdata);
                 formpost("/product/group/",formdata)
                .then((response) => {
                   // console.log(response);
                   // return true;
                    this.props.history.push('/productgroup');
                    toast.success('Group Add Successfully');
                    
                })
                .catch(function (error) {
                    console.log(error);
                    toast.error('Sorry!! Group Add Unsuccessful');
                }); 
        
            // }else{
            //     this.validator.showMessages();
            //     this.forceUpdate();
            // }  
    };

  
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">New Product Group Add</h3>
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
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="row" id="add">
                                      
                                            <div className="cat col-md-5  form-group">
                                                <label>Group Name<span style={{color:'red'}}>*</span></label>

                                                    <input type="text" name="group_name" required className="form-control" placeholder={`Enter Group name`}  />
                                                   
                                                
                                            </div>
                                            <div className="cat col-md-5  form-group ">
                                               <br/>
                                                <input type="submit"  value="Save" className="btn btn-secondary mt-1 mb-1 addgroup-button" />
                                            </div>
                                            
                                       
                                      
                                    </div>
                                   
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
