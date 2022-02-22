import React, { Component } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'; 
import {get,DELETE, post} from '../../utils/service';
import * as CONSTANT from '../../utils/constant'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
export default class Viewcategory extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
       
         category:[],
      
    }
}

  componentDidMount() {
    document.title = 'Category : Admin Dashboard - Hardwarechacha';
    document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
    get("/category/cat/")
    .then((response) => {
      //  console.log(response);
      let data = response.data
        this.setState({ category: data.sort((a, b) => (b > a ? 1 : -1)) });
      //  console.log(this.state.category);
    })
    .catch(function (error) {
        console.log(error);
    });

  }
  deleteCategory = (id) =>{
    const data = {
      'id':id
    }
    post("/category/checkchild/",data)
    .then((res)=>{
      if(res.data.flag == 0){
        DELETE("/category/cat/"+id)
        .then((response) => {
          toast.success('Category Delete Successfully',
            {position: toast.POSITION.BOTTOM_CENTER,autoClose:2000}
          )   
          
          let data1 = this.state.category.filter(item => item.id != id)
          this.setState({
          category: data1.sort((a,b) =>  b.id-a.id )
          
          })
        //  console.log(this.state.category);
        })
        .catch(function (error) {
            console.log(error);
          
            toast.dark('Sorry!! Category Delete Unsuccessful',
            {position: toast.POSITION.BOTTOM_CENTER,autoClose:2000}
          )
        });
      }else{
        toast.dark('Sorry!! Category has a subcategory',
        {position: toast.POSITION.BOTTOM_CENTER,autoClose:2000}
      )
      
      }
    }).catch(err=>{
      console.log(err)
    })
    
  }

  render() {
    return (
      <div >
      <div className="page-header mt-0 p-3">
          <h3 className="mb-sm-0"><Link to="addCategory" type="button" className="btn btn-primary mt-1 mb-1">Add More Category</Link></h3>
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
                <h2 className="mb-0">View Category</h2>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="example"
                    className="table table-striped table-bordered w-100 text-nowrap"
                  >
                    <thead>
                      <tr>
                        <th className="wd-15p">Category <br/>Name</th>
                        <th className="wd-15p">Category <br/>Image</th>
                        <th className="wd-20p">View <br/> Sub Category</th>
                        <th className="wd-15p">Action</th>
                  
                      </tr>
                    </thead>
                    <tbody>
                    {

                     this.state.category.map((object, i) => (
                        <tr key={i}>
                            <td>{object.cat_name}</td>
                            <td><a target="_blank" href={object.cat_icon}><img src={object.cat_icon} style={{height:"50px"}}/></a></td>
                            <td><Link to={"subCategory?id="+object.id} type="button" className="btn btn-icon btn-pill btn-primary mt-1 mb-1 btn-sm">View Sub Category</Link></td>
                            <td><Link to={"updateCategory?id="+object.id} type="button" className="btn btn-icon btn-pill btn-info mt-1 mb-1 btn-sm">Update</Link>
                            <button type="button" onClick={()=>this.deleteCategory(object.id)} className="btn btn-icon btn-pill btn-danger mt-1 mb-1 btn-sm">Delete</button>
                            </td>
                        </tr>
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
    );
  }
}
