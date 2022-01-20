import React, { Component } from 'react'
import {get, put, patch} from '../../utils/service';
import queryString from 'query-string';
import ToastServive from 'react-material-toast';
import {imageValid} from '../../utils/imageValid'
const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class updatebrand extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            brand_name:'',
            brand_logo:'',
            id:params.id
        };
    }

    
  componentDidMount() {
    document.title = 'Update Brand : Admin Dashboard - Crowd';
    document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
    get("/product/brand/"+this.state.id)
    .then((response) => {
       // console.log(response);
        this.setState({ 
            brand_name: response.data.brand_name,
            brand_logo: response.data.brand_logo
        });
        //console.log(response);
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
            brand_name: formdata1[0][1],
        };
       
     }else{
     
        var data = formdata
     }

    patch("/product/brand/"+this.state.id,data)
    .then((response) => {
        this.props.history.push('/productbrand');
        toast.success('Product Brand Update Successfully');
        
    })
    .catch(function (error) {
        console.log(error);
        toast.error('Sorry!! Product Brand Update Unsuccessful');
    });
}
    render() {
        return (
            <div>
            <div className="page-header mt-0 p-3">
                <h3 className="mb-sm-0">Update Brand</h3>
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <a href="/"><i className="fe fe-home"></i></a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Admin Dashboard</li>
                </ol>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card shadow">
                        <div className="card-header">
                            <h2 className="mb-0">Update Brand</h2>
                        </div>
                        <form onSubmit={this.handleSubmit} method="PATCH" encType="multipart/form-data">
                            <div className="card-body">
                                <div className="row" id="view">
                               
                                    <div className="col-md-5"><label>Brand Name</label>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" required name="brand_name" placeholder="Enter Brand Name" defaultValue={this.state.brand_name} />
                                                </div>
                                                
                                        </div>
                                        <div className="col-md-4"><label>Brand Logo</label>
                                                <div className="form-group">
                                                    <input type="file" className="form-control" required name="brand_logo" placeholder="Enter Brand Name" defaultValue={this.state.brand_logo} id="icon" onChange={imageValid}/>
                                                </div>
                                                
                                        </div>
                                        <div className="col-md-3  form-group">
                                         <div  style={{border: "solid 1px",padding: "10px", width: "max-content"}}>

                                     <center> <img src={this.state.brand_logo} style={{height:"100px"}}/><br/>/
                                             <b><label>{this.state.brand_name}</label></b></center> 
                                         </div>
                                         
                                        </div>
                                </div>
                               <center> <input type='submit' name='submit' value='Final Submission' className='btn btn-primary mt-1 mb-1' style={{width: "auto"}}/></center>
                            </div>
                       
                        </form>
                    </div>
                </div>
            </div>


        </div>
        )
    }
}
