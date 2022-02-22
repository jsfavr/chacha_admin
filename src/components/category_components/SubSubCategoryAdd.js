import React, { Component } from 'react'
import {imageValid} from '../../utils/imageValid'
import queryString from 'query-string';
import {withoutauthformpost} from '../../utils/service';
import "../multipleinput.css";
import ToastServive from 'react-material-toast';


const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class SubSubCategoryAdd extends Component {
    constructor(props) {
        super(props);
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            id:params.id,
        };
    }

  
    handleSubmit = (e) => {
        document.title = 'Add Sub Sub Category : Admin Dashboard - Hardwarechacha';
        document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
        e.preventDefault();
        var formdata = new FormData(e.target);
    
        // console.log(...formdata);
         withoutauthformpost("/category/subsubcat/",formdata)
        .then((response) => {
           // console.log(response);
           // return true;
            this.props.history.push('/subSubCategory?id='+this.state.id);
            toast.success('Category Add Successfully');
            
        })
        .catch(function (error) {
            console.log(error);
            toast.error('Sorry!! Category Add Unsuccessful');
        }); 
    };

    
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">New Sub Sub Category Add</h3>
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
                                    <div className="col-md-3  form-group">
                            
                                         </div> 
                                            <div className="cat col-md-6  form-group">
                                                <label>Sub Sub Category Name<span style={{color:'red'}}>*</span></label>

                                                    <input type="text" name="sub_sub_cat_name" className="form-control" placeholder={`Enter Sub Sub Category name`}   />
                                                   
                                                    <input type="hidden" name="sub_cat_id" required className="form-control" value={this.state.id} />
                                            </div>
                                            <div className="col-md-3  form-group">
                                            {/* <label>Sub Sub Category Icon</label>

                                      
                                                <input type="file" className="form-control" name="sub_sub_cat_icon" id="icon" onChange={imageValid}/> */}
                                              
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
        )
    }
}
