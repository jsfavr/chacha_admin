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
export default class subCategoryAdd extends Component {
    constructor(props) {
        super(props);
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            id:params.id,
        };
    }

    handleSubmit = (e) => {
        document.title = 'Add Sub Category : Admin Dashboard - Crowd';
        document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
        e.preventDefault();
        var formdata = new FormData(e.target);
    
        // console.log(...formdata);
         withoutauthformpost("/category/subcat/",formdata)
        .then((response) => {
           // console.log(response);
           // return true;
            this.props.history.push('/subCategory?id='+this.state.id);
            toast.success('Sub Category Add Successfully');
            
        })
        .catch(function (error) {
            console.log(error);
            toast.error('Sorry!! Sub Category Add Unsuccessful');
        }); 
     
    };

    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">New Sub Category Add</h3>
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
                                      
                                            <div className="cat col-md-4  form-group">
                                                <label>Sub Category Name<span style={{color:'red'}}>*</span></label>

                                                    <input type="text" name="sub_cat_name" required className="form-control" placeholder={`Enter Category name`}  />
                                                   
                                                    <input type="hidden" name="cat_id" required className="form-control" value={this.state.id} />
                                            </div>
                                            <div className="cat col-md-4  form-group">
                                                <label>Commission(%)<span style={{color:'red'}}>*</span></label>

                                                    <input type="number" name="commission" required className="form-control" placeholder={`Enter Commission`}  />
                                                   
                                                
                                            </div>
                                            <div className="cat col-md-4  form-group">
                                                <label>GST(%)<span style={{color:'red'}}>*</span></label>

                                                    <input type="number" name="gst" required className="form-control" placeholder={`Enter GST`} />
                                                   
                                                
                                            </div>
                                            {/* <div className="col-md-3  form-group">
                                            <label>Sub Category Icon</label>

                                      
                                                <input type="file" className="form-control" required name="sub_cat_icon" id="icon" onChange={imageValid}/>
                                              
                                         </div>  */}
                                       
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
