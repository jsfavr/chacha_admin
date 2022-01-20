import React, { Component } from 'react'
import {formpost} from '../../utils/service';
import ToastServive from 'react-material-toast';
import {imageValid} from '../../utils/imageValid'
const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class Addbrand extends Component {
    constructor() {
        super();
        this.state = {
           
        };
    }


    componentDidMount(){
        document.title = 'Add Brand : Admin Dashboard - Crowd';
        document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var formdata = new FormData(e.target);
    
        // console.log(...formdata);
         formpost("/product/brand/",formdata)
        .then((response) => {
           // console.log(response);
           // return true;
            this.props.history.push('/productbrand');
            toast.success('Brand Add Successfully');
            
        })
        .catch(function (error) {
            console.log(error);
            toast.error('Sorry!! Brand Add Unsuccessful');
        }); 

    };

    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">New Product Brand Add</h3>
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
                                       
                                            <div className="cat col-md-6  form-group">
                                                <label>Brand Name<span style={{color:'red'}}>*</span></label>

                                                    <input type="text" name="brand_name" required className="form-control" placeholder={`Enter Brand name`} />
                                                   
                                                
                                            </div>
                                            <div className="cat col-md-6  form-group">
                                                <label>Brand Logo<span style={{color:'red'}}>*</span></label>

                                                    <input type="file" name="brand_logo" className="form-control"  id="icon" onChange={imageValid}/>
                                                   
                                                
                                            </div>
                                            
                                       
                                      
                                    </div>
                                    <center style={{ color: "white" }}>
                                      
                                            <input type="submit"  value="Save" className="btn btn-secondary mt-1 mb-1" required style={{ width: "85px" }}  id="icon" onChange={imageValid} />
                                        
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
