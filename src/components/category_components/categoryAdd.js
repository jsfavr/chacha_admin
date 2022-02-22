import React, { Component } from "react";
import "../multipleinput.css";
import ToastServive from 'react-material-toast';
import {withoutauthformpost} from '../../utils/service';
import queryString from 'query-string';
import SimpleReactValidator from 'simple-react-validator';
import {imageValid} from '../../utils/imageValid'
const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
class categoryAdd extends Component {
    constructor() {
        super();
        this.validator = new SimpleReactValidator();
    }


    handleSubmit = (e) => {
        // if (this.validator.allValid()) {
        e.preventDefault();
        var formdata = new FormData(e.target);
    
        // console.log(...formdata);
         withoutauthformpost("/category/cat/",formdata)
        .then((response) => {
           // console.log(response);
           // return true;
            this.props.history.push('/viewcategory');
            toast.success('Category Add Successfully');
            
        })
        .catch(function (error) {
            console.log(error);
            toast.error('Sorry!! Category Add Unsuccessful');
        }); 

    // }else{
    //     this.validator.showMessages();
    //     this.forceUpdate();
    // }  
    };
    componentDidMount(){
        document.title = 'Category Add : Admin Dashboard - Hardwarechacha';
        document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
    }
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">New Category Add</h3>
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
                                <form onSubmit={this.handleSubmit} method="POST" encType="multipart/form-data">
                                    <div className="row" id="add">
                                       
                                            <div className="cat col-md-6  form-group">
                                                <label>Category Name<span style={{color:'red'}}>*</span></label>

                                                    <input type="text" name="cat_name" required className="form-control" placeholder={`Category name`} />
                          
                                                
                                            </div>
                                            <div className="col-md-6  form-group">
                                            <label>Category Icon<span style={{color:'red'}}>*</span></label>

                                      
                                                <input type="file" required className="form-control" id="icon" name="cat_icon" onChange={imageValid}/>
                                  
                                              
                                         </div> 
                                    
                                      
                                    </div>
                                    <center style={{ color: "white" }}>
                                    
                                            <input type="submit" value="Save" className="btn btn-secondary mt-1 mb-1" style={{ width: "85px" }} />
                                       
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default categoryAdd;
