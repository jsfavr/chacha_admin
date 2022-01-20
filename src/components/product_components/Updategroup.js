import React, { Component } from 'react'
import {get, put, patch} from '../../utils/service';
import queryString from 'query-string';
import ToastServive from 'react-material-toast';
const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class Updategroup extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
      
            name:params.name,
            id:params.id
        };
    }
    componentDidMount() {
        document.title = 'Update Group : Admin Dashboard - Crowd';
        document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
    }
    handleSubmit = e =>{
        e.preventDefault();
        var formdata = new FormData(e.target);
    
        patch("/product/group/"+this.state.id,formdata)
        .then((response) => {
            this.props.history.push('/productgroup');
            toast.success('Product Group Update Successfully');
            
        })
        .catch(function (error) {
            console.log(error);
            toast.error('Sorry!! Product Group Update Unsuccessful');
        });
    }
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Update Group</h3>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <a href="/"><i className="fe fe-home"></i></a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Product Group</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow">
                            <div className="card-header">
                                <h2 className="mb-0">Update Groups</h2>
                            </div>
                            <form onSubmit={this.handleSubmit} method="PATCH" encType="multipart/form-data">
                                <div className="card-body">
                                    <div className="row" id="view">
                                        <input type="hidden" name="_token" id="_token" value="<?php echo csrf_token(); ?>" />
                                        <div className="col-md-6">
                                            <label>Group Name</label>
													<div className="form-group">
														<input type="text" className="form-control" required name="group_name" placeholder="Enter Group Name" defaultValue={this.state.name} />
													</div>
													
											</div>
                                            <div className="col-md-4">
                                            <label style={{color:"white"}}>Group Name</label>
													<div className="form-group">
                                                    <input type='submit' name='submit' value='Save Changes' className='btn btn-primary mt-1 mb-1' />
													</div>
													
											</div>
                                    </div>
                                    
                                    
                                </div>
                           
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
