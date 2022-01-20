import React, { Component } from 'react'
import {authget, put, patch} from '../../utils/service';
import queryString from 'query-string';
import ToastServive from 'react-material-toast';


const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class updateServices extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            brand_name:'',
            brand_logo:'',
            details:[],
            id:params.id
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
  handleChange = e => {
    e.preventDefault();
    this.setState({[e.target.name]:e.target.value});  
}
handleSubmit = e =>{
    e.preventDefault();
    var formdata = new FormData(e.target);
   
     var formdata1 = [...formdata];
   
     if(formdata1[1][1].size===0){
        var data = {
            name: formdata1[0][1],
            tagLing: formdata1[2][1],
            price: formdata1[3][1],
            mrp: formdata1[4][1],
            description: formdata1[5][1],
            location: formdata1[6][1],

        };
       
     }else{
     
        var data = formdata
     }

    patch("/service/service/"+this.state.id,data)
    .then((response) => {
        this.props.history.push('/service');
        toast.success('Service Update Successfully');
        
    })
    .catch(function (error) {
        console.log(error);
        toast.error('Sorry!! Service Update Unsuccessful');
    });
}
    render() {
        return (
            <div>
            <div className="page-header mt-0 p-3">
                <h3 className="mb-sm-0">Update Service</h3>
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <a href="/"><i className="fe fe-home"></i></a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Vendor Dashboard</li>
                </ol>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card shadow">
                        <div className="card-header">
                            <h2 className="mb-0">Update Service</h2>
                        </div>
                        <form onSubmit={this.handleSubmit} method="PATCH" encType="multipart/form-data">
                            <div className="card-body">
                                <div className="row" id="view">
                               
                                        
                                            <div className="cat col-md-6  form-group">
                                                <label>Service Name<span style={{color:'red'}}>*</span></label>
                                                    <input type="text" name="name" required className="form-control" placeholder={`Enter Service name`} defaultValue={this.state.details.name}/>
                                            </div>
                                            <div className="cat col-md-6  form-group">
                                                <label>Service Image<span style={{color:'red'}}>*</span></label>
                                                    <input type="file" name="image" className="form-control" id="image" />
                                            </div>
                                            <div className="cat col-md-6  form-group">
                                                <label>Tag Line<span style={{color:'red'}}>*</span></label>
                                                    <input type="text" name="tagLine" required className="form-control" placeholder={`Enter Service Tag Line`} defaultValue={this.state.details.tagLine}/>   
                                            </div>
                                            <div className="cat col-md-3  form-group">
                                                <label>Price(Rs)<span style={{color:'red'}}>*</span></label>
                                                    <input type="number" name="price" required className="form-control" placeholder={`Enter Service Price`} defaultValue={this.state.details.price}/>   
                                            </div>
                                            <div className="cat col-md-3  form-group">
                                                <label>MRP(Rs)<span style={{color:'red'}}>*</span></label>
                                                    <input type="number" name="mrp" required className="form-control" placeholder={`Enter Service MRP`} defaultValue={this.state.details.mrp}/>
                                            </div>
                                            <div className="cat col-md-6  form-group">
                                                <label>Description<span style={{color:'red'}}>*</span></label>
                                                    <textarea name="description" required className="form-control" placeholder="Enter Service Description" defaultValue={this.state.details.description}></textarea>
                                            </div>
                                            <div className="cat col-md-6  form-group">
                                                <label>Location<span style={{color:'red'}}>*</span></label>
                                                    <textarea name="location" required className="form-control" placeholder="Enter Service Location" defaultValue={this.state.details.location}></textarea>
                                            </div>






                                        
                                </div>
                               <center> <input type='submit' name='submit' value='Update' className='btn btn-primary mt-1 mb-1' style={{width: "auto"}}/></center>
                            </div>
                       
                        </form>
                    </div>
                </div>
            </div>


        </div>
        )
    }
}
