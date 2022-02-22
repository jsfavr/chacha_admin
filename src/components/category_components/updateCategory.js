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
export default class updateCategory extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            cat_name:'',
            cat_icon:'',
            id:params.id
        };
    }

    
  componentDidMount() {
    document.title = 'Update Category : Admin Dashboard - Hardwarechacha';
    document.getElementById("global-loader").style.display = "block";
    setTimeout(()=>{
        document.getElementById("global-loader").style.display = "none";
        },500)
    get("/category/cat/"+this.state.id)
    .then((response) => {
       // console.log(response);
        this.setState({ 
            cat_name: response.data.cat_name,
            cat_icon: response.data.cat_icon
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
            cat_name: formdata1[0][1],
        };
       
     }else{
     
        var data = formdata
     }

    patch("/category/cat/"+this.state.id,data)
    .then((response) => {
        this.props.history.push('/viewcategory');
        toast.success('Category Update Successfully');
        
    })
    .catch(function (error) {
        console.log(error);
        toast.error('Sorry!! Category Update Unsuccessful');
    });
}
    render() {
        return (
            <div>
              <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Category Update</h3>
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
                                <form onSubmit={this.handleSubmit} method="PATCH" encType="multipart/form-data">
                                    <div className="row" id="add">
                                        <div className="cat col-md-5  form-group">
                                            <label>Category Name</label>

                                            <input type="text" name="cat_name" className="form-control" defaultValue={this.state.cat_name} placeholder={`Category name`} />
                                                   
                                                
                                        </div>
                                        <div className="col-md-4  form-group">
                                            <label>Category Icon</label>
                                            <input type="file" className="form-control" name="cat_icon" id="icon"  onChange={imageValid}/>
                                              
                                        </div>    
                                        <div className="col-md-3  form-group">
                                         <div  style={{border: "solid 1px",padding: "10px", width: "max-content"}}>

                                         <img src={this.state.cat_icon} style={{height:"100px"}}/>
                                             <center><b><label>{this.state.cat_name}</label></b></center> 
                                         </div>
                                         
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
  
            </div>
        )
    }
}
