import React, { Component } from 'react'
import {get} from '../../utils/service';
export default class Viewplan extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             plan:[]
        }
    }
    componentDidMount(){
        document.title = 'Power Plan : Admin Dashboard - Hardwarechacha';
        document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
         get('/userDetails/GetPlan/')
         .then((res)=>{
             this.setState({
                 plan:res.data
             })
         }).catch((err)=>{
             console.log(err)
         })

    }
    render() {
        return (
            <div >
            <div className="page-header mt-0 p-3">
                <h3 className="mb-sm-0">Power Plan</h3>
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <a href="#"><i className="fe fe-home"></i></a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Admin Dashboard</li>
                </ol>
            </div>
            <div id="generic_price_table">
                <div>
                    <div>
                        <div className="row">
                            <div className="col-lg-4">
                               
                            </div>
        
                            <div className="col-lg-4">
                                <div className="generic_content active clearfix card shadow">
                                    <div className="generic_head_price clearfix">
                                        <div className="generic_head_content clearfix">
                                            <div className="head_bg"></div>
                                            <div className="head">
                                                <span>Standard</span>
                                            </div>
                                        </div>
        
                                        <div className="generic_price_tag clearfix">
                                            <span className="price">
                                                <span className="sign">₹</span>
                                                <span className="currency">{this.state.plan.price}</span>
                                                <span className="cent">.00</span>
                                                <span className="month">/One Time</span>
                                            </span>
                                        </div>
                                    </div>
        
                                    <div className="generic_feature_list">
                                        <ul>
                                            <li><span>{this.state.plan.price}</span> Wallet Point</li>
                                            <li><span></span> Open Share & Refer System</li>
                                            <li><span></span> Use Point in any Purchase</li>
                                            <li><span>50000</span> Member Refer</li>
                                           
                                            <li><span>24/7</span> Support</li>
                                        </ul>
                                    </div>
        
                                    <div className="generic_price_btn clearfix">
                                     <br/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
        
        )
    }
}
