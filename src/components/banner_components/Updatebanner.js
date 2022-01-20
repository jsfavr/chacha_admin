import React, { Component } from 'react'
import {withoutauthpatch,get} from '../../utils/service';
import ToastServive from 'react-material-toast';
import queryString from 'query-string';
import {imageValid} from "../../utils/imageValid";
const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class Updatebanner extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            id:params.id,
            url:''
        }
    }
    componentDidMount(){
      document.title = 'Display Banner Update : Admin Dashboard - Crowd';
      document.getElementById("global-loader").style.display = "block";
      setTimeout(()=>{
        document.getElementById("global-loader").style.display = "none";
      },500)
      get("/banner/promotion/"+this.state.id)
      .then(res=>{
        console.log(res)
        this.setState({
          url:res.data.url
        })
      })
      .catch(err=>{
        console.log(err)
      })
    }
    imageSubmit = (e) =>{
        e.preventDefault();
        var formdata = new FormData(e.target);
        var formdata1 = [...formdata];
    
        console.log(formdata1)
          if(formdata1[0][1].size===0){
        var data = {
            url: formdata1[1][1],
        
        };
       
     }else{
     
      var data = formdata
        }
        withoutauthpatch("/banner/promotion/"+this.state.id,data)
        .then((response) => {
          if(response.status == 200){
            toast.success('Promotion Banner Update Successfully');
            this.props.history.push('/promotionbanner')
          }
      
       
        })
        .catch(function (error) {
        });
      }
    render() {
        return (
            <>
            <div className="page-header mt-0 shadow p-3">
              <h3 className="mb-sm-0">Promotionbanner</h3>
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
                
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="card card-profile overflow-hidden">
                  <form action="" onSubmit={this.imageSubmit} method="post" id="banner_form" encType="multipart/form-data"
                    >
                    <div
                      className="card-body text-center cover-image qqq"
                      data-image-src="assets/img/profile-bg.jpg"
                    >
                      <div className="dropify-wrapper">
                       
                     <center><h2>Update Promotion Banner</h2></center>
                     <hr/>
                     <br/>
                        <input 
                        type="file" 
                        id="logo_image" 
                        name="image"
                        onChange={imageValid}
                        />
                        <input 
                        type="text" 
                        id="url" 
                        name="url"
                        placeholder="Enter Url"
                        defaultValue={this.state.url}
                        />
                        <input
                        type="submit"
                        className="btn btn-success btn-sm"
                        value="submit"
                        name="submit"
                        />
                      
                      </div>
    
    
                    
    
                     
                    </div>
                    </form>
                   
                   
                  </div>
    
                  </div>
                  <div className="col-md-4"></div>
                </div>
              
           
            </>
        )
    }
}
