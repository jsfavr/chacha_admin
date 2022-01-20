import React, { Component } from 'react'
import {formpost} from '../../utils/service';
import ToastServive from 'react-material-toast';


const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class AddServices extends Component {
    constructor() {
        super();
        this.state = {
           
        };
    }

    componentDidMount() {
        document.title = 'Add Brand : Vendor Dashboard - Crowd';
        document.getElementById("global-loader").style.display = "block";
        setTimeout(()=>{
          document.getElementById("global-loader").style.display = "none";
        },500)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var formdata = new FormData(e.target);
    
        // console.log(...formdata);
         formpost("/service/addService/",formdata)
        .then((response) => {
           // console.log(response);
           // return true;
            this.props.history.push('/service');
            toast.success('Service Add Successfully');
            
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
                    <h3 className="mb-sm-0">New Service Add</h3>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <a href="#">
                                <i className="fe fe-home"></i>
                            </a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Vendor Dashboard
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
                                                <label>Service Name<span style={{color:'red'}}>*</span></label>
                                                    <input type="text" name="name" required className="form-control" placeholder={`Enter Service name`} />
                                            </div>
                                            <div className="cat col-md-6  form-group">
                                                <label>Service Image<span style={{color:'red'}}>*</span></label>
                                                    <input type="file" name="image" className="form-control" id="image" />
                                            </div>
                                            <div className="cat col-md-6  form-group">
                                                <label>Tag Line<span style={{color:'red'}}>*</span></label>
                                                    <input type="text" name="tagLine" required className="form-control" placeholder={`Enter Service Tag Line`} />   
                                            </div>
                                            <div className="cat col-md-3  form-group">
                                                <label>Price(Rs)<span style={{color:'red'}}>*</span></label>
                                                    <input type="number" name="price" required className="form-control" placeholder={`Enter Service Price`} />   
                                            </div>
                                            <div className="cat col-md-3  form-group">
                                                <label>MRP(Rs)<span style={{color:'red'}}>*</span></label>
                                                    <input type="number" name="mrp" required className="form-control" placeholder={`Enter Service MRP`} />
                                            </div>
                                            <div className="cat col-md-6  form-group">
                                                <label>Description<span style={{color:'red'}}>*</span></label>
                                                    <textarea name="description" required className="form-control" placeholder="Enter Service Description"></textarea>
                                            </div>
                                            <div className="cat col-md-6  form-group">
                                                <label>Location<span style={{color:'red'}}>*</span></label>
                                                    <textarea name="location" required className="form-control" placeholder="Enter Service Location"></textarea>
                                            </div>
                                    </div>
                                    <center style={{ color: "white" }}>
                                        <input type="submit"  value="Save" className="btn btn-secondary mt-1 mb-1" required style={{ width: "85px" }}  id="icon" />
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
