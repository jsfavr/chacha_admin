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
export default class updateSubSubCategory extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            sub_sub_cat_name:'',
            sub_cat_icon:'',
            returnId:0,
            id:params.id,
        };
    }

    
  componentDidMount() {
    document.title = 'Update Sub Sub Category : Admin Dashboard - Crowd';
    document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
    get("/category/subsubcat/"+this.state.id)
    .then((response) => {
        console.log(response);
        this.setState({ 
            sub_sub_cat_name: response.data.sub_sub_cat_name,
            sub_sub_cat_icon: response.data.sub_sub_cat_icon,
            returnId: response.data.sub_cat_id
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
    
     //console.log(formdata1)
    // return true;
    //  if(formdata1[1][1].size===0){
    //     var data = {
    //         sub_sub_cat_name: formdata1[0][1],
    //     };
       
    //  }else{
     
        var data = formdata
    //  }
    // console.log(data);
    patch("/category/subsubcat/"+this.state.id,data)
    .then((response) => {
       // console.log(response);
       // return true;
        this.props.history.push('/subSubCategory?id='+this.state.returnId);
        toast.success('Category Update Successfully');
        
    })
    .catch(function (error) {
        console.log(error);
        toast.error('Sorry!! Sub Sub Category Update Unsuccessful');
    }); 
}
    render() {
        return (
            <div>
              <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Sub Sub Category Update</h3>
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
                                    <div className="cat col-md-3  form-group">
                                                  
                                                
                                        </div>
                                        <div className="cat col-md-6  form-group">
                                            <label>Sub Category Name</label>

                                            <input type="text" name="sub_sub_cat_name" className="form-control" defaultValue={this.state.sub_sub_cat_name} placeholder={`Sub Sub Category name`} />
                                                   
                                                
                                        </div>
                                        <div className="cat col-md-3  form-group">
                                                  
                                                
                                        </div>
                                        {/* <div className="col-md-4  form-group">
                                            <label>Sub Category Icon</label>
                                            <input type="file" className="form-control" id="icon"  name="sub_sub_cat_icon" onChange={imageValid}/>
                                              
                                        </div>     */}
                                        {/* <div className="col-md-3  form-group">
                                         <div  style={{border: "solid 1px",padding: "10px", width: "max-content"}}>

                                         <img src={this.state.sub_sub_cat_icon} style={{height:"100px"}}/>
                                             <center><b><label>{this.state.sub_sub_cat_name}</label></b></center> 
                                         </div>
                                         
                                        </div> */}
                                     
                                        
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
