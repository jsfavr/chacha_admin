import React, { Component } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'; 
import {get,DELETE, post} from '../../utils/service';
import * as CONSTANT from '../../utils/constant'
import queryString from 'query-string';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
export class subSubCategory extends Component {
  constructor(props) {
    super(props)
    let url = this.props.location.search;
    let params = queryString.parse(url);
    this.state = {
        id:params.id,
        category:[],
      
    }
}

  componentDidMount() {
    document.title = 'Sub Sub Category : Admin Dashboard - Hardwarechacha';
    document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
    get("/category/subsubcat/")
    .then((response) => {
       // console.log(response);
        this.setState({ category: response.data });
       // console.log(this.state.category);
    })
    .catch(function (error) {
        console.log(error);
    });

  }
  deleteCategory = (id) =>{
    const data = {
      'id':id
    }
    post('/category/procheckchild/',data)
    .then(res=>{
      if(res.data.flag == 0){
        DELETE("/category/subsubcat/"+id)
        .then((response) => {
          toast.success('Sub Sub Category Delete Successfully',
            {position: toast.POSITION.BOTTOM_CENTER,autoClose:2000}
          ) 
         
          this.setState({
          category: this.state.category.filter(item => item.id != id)
          
          })
        //  console.log(this.state.category);
        })
        .catch(function (error) {

            toast.error('Sorry!! Sub Sub Category Delete Unsuccessful',
            {position: toast.POSITION.BOTTOM_CENTER,autoClose:2000}
          )
         
        });
      }else{
        toast.dark('Sorry!! Sub Sub Category has a product',
          {position: toast.POSITION.BOTTOM_CENTER,autoClose:2000}
        )
      }
    })
    .catch(err=>{

    })
    
  }
    render() {
        return (
            <div >
            <div className="page-header mt-0 p-3">
                <h3 className="mb-sm-0"><Link to={"addSubSubCategory?id="+this.state.id} type="button" className="btn btn-primary mt-1 mb-1">Add More Sub Sub Category</Link></h3>
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <a href="#"><i className="fe fe-home"></i></a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Admin Dashboard</li>
                </ol>
            </div>
      
              <div className="row">
                <div className="col-md-12">
                  <div className="card shadow">
                    <div className="card-header">
                      <h2 className="mb-0">View Sub Sub Category</h2>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table
                          id="example"
                          className="table table-striped table-bordered w-100 text-nowrap"
                        >
                          <thead>
                            <tr>
                              <th className="wd-15p">Sub Sub<br/>Category <br/>Name</th>
                              {/* <th className="wd-15p">Sub Sub<br/>Category <br/>Image</th> */}
      
                              <th className="wd-15p">Action</th>
                        
                            </tr>
                          </thead>
                          <tbody>
                          {

                            this.state.category.map((object, i) => (
                              object.sub_cat_id==this.state.id?
                            <tr key={i}>
                                <td>{object.sub_sub_cat_name}</td>
                                {/* <td><a target="_blank" href={object.sub_sub_cat_icon}><img src={object.sub_sub_cat_icon} style={{height:"50px"}}/></a></td> */}
                              <td>
                              <Link to={"updateSubSubCategory?id="+object.id} type="button" class="btn btn-icon btn-pill btn-info mt-1 mb-1 btn-sm">Update</Link>
                              <button type="button"  onClick={()=>this.deleteCategory(object.id)} class="btn btn-icon btn-pill btn-danger mt-1 mb-1 btn-sm">Delete</button>
                                    
                              </td>
                            </tr>
                            :null
                            ))
                          }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default subSubCategory
