import React, { Component } from 'react'
import {get,withoutauthformpost,post,DELETE} from '../../utils/service';
import ToastServive from 'react-material-toast';
import {Link} from 'react-router-dom'
import {imageValid} from "../../utils/imageValid";
const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export default class Promotionbanner extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           banner_details:[]
        }
      }
      componentDidMount(){
        document.title = 'Promotion Banner : Admin Dashboard - Hardwarechacha';
        document.getElementById("global-loader").style.display = "block";
        setTimeout(()=>{
          document.getElementById("global-loader").style.display = "none";
        },500)
        get("/banner/promotion/")
        .then((response)=>{
            if(response.data == undefined){
                this.setState({
                  banner_details:[]
                })
             }else{
                this.setState({
                  banner_details:response.data
                })
             }
        }).catch(err=>{
    
        })
      }
      imageSubmit = (e) =>{
          e.preventDefault();
          var formdata = new FormData(e.target);
         
            // console.log(...formdata)
    
            withoutauthformpost("/banner/promotion/",formdata)
            .then((response) => {
                if(response.status ==201){
                  toast.success('Promotion Banner added successfully');
                  document.getElementById("banner_form").reset();
                  get("/banner/promotion/")
                  .then((response)=>{
                   // console.log(response.data)
                   if(response.data == undefined){
                      this.setState({
                        banner_details:[]
                      })
                   }else{
                      this.setState({
                        banner_details:response.data
                      })
                   }
                   
                  }).catch(err=>{
              
                  })
                //window.location.href='/login';
                }else{
                    
                  toast.error('Session Expired! Please Login');
                
                }
            })
            .catch(function (error) {
                console.log(error);
            }); 
          
      }
      bannerDetete = (id) =>{
        
        DELETE("/banner/promotion/"+id)
        .then((response) => {
          toast.success('Promotion Banner Delete Successfully');
          this.setState({
            banner_details: this.state.banner_details.filter(item => item.id != id)
           
          })
       
        })
        .catch(function (error) {
            console.log(error);
            toast.error('Sorry!! Promotion Banner Delete Unsuccessful');
        });
      }
      showBanner =()=>{
        return this.state.banner_details.map((obj,i)=>{
          return(
            <div className="col-lg-4 profile-image" key={i}>
              <div className="card shadow">
                <a target="_blank" href={obj.image}>
                  
                
    
                <img src={obj.image} alt="gallery" height="200px"/><br/>
                <span>{obj.url}</span>
                </a>
                <center>
                    {/* <input type="button" className="btn btn-danger btn-sm" value="Delete" onClick={()=>this.bannerDetete(obj.id)}/> */}
                    <Link className="btn btn-info btn-sm" to={"updatepromotionbanner?id="+obj.id}>Update</Link>
                </center>
              </div>
            </div>
          );
        })
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
                <div className="col-md-12">
                  <div className="card card-profile overflow-hidden">
                  {/* <form action="" onSubmit={this.imageSubmit} method="post" id="banner_form" encType="multipart/form-data"
                    >
                    <div
                      className="card-body text-center cover-image qqq"
                      data-image-src="assets/img/profile-bg.jpg"
                    >
                      <div className="dropify-wrapper">
                       
                     <center><h2>Add Promotion Banner</h2></center>
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
                        />
                        <input
                        type="submit"
                        className="btn btn-success btn-sm"
                        value="submit"
                        name="submit"
                        />
                      
                      </div>
    
    
                    
    
                     
                    </div>
                    </form> */}
                    {/* <center>(size : 1230px x 425px)</center> */}
                    <div className="card-body">
                      <div className="nav-wrapper p-0">
                        <ul
                          className="nav nav-pills nav-fill flex-column flex-md-row"
                          id="tabs-icons-text"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className="nav-link mb-sm-3 mb-md-0 active show mt-md-2 mt-0 mt-lg-0"
                              id="tabs-icons-text-3-tab"
                              data-toggle="tab"
                              href="#tabs-icons-text-3"
                              role="tab"
                              aria-controls="tabs-icons-text-3"
                              aria-selected="true"
                            >
                              <i className="far fa-images mr-2"></i>Promotion Banner
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
    
                  <div className="card shadow">
                    <div className="card-body pb-0">
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="tabs-icons-text-3"
                          role="tabpanel"
                          aria-labelledby="tabs-icons-text-3-tab"
                        >
                          <div className="row">
                           {this.showBanner()}
                           
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           
            </>
        )
    }
}
