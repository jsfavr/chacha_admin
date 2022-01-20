import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {post} from '../../utils/service'
const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
export default class Taxreport extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            start_date:'',
            end_date:'',
            taxReport:[]
        }
    }
    handelChange=(e)=>{
        this.setState({
            start_date:e.target.value
        })
        
    }
    componentDidMount(){
        document.title = 'Tax Report : Admin Dashboard - Crowd';
        document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
    }
    handelChange1=(e)=>{
        this.setState({
            end_date:e.target.value
        })
        
    }
  
    getTaxlist=()=>{
        const data = {
            start_date:this.state.start_date,
            end_date:this.state.end_date
        }
        post('/booking/taxsReport/',data)
        .then(res=>{
            this.setState({
                taxReport:res.data
            },()=>{
                this.showTaxlist()
            })
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    showTaxlist=()=>{
        if(typeof this.state.taxReport !== 'undefined' && this.state.taxReport.length > 0){
            return this.state.taxReport.map((obj,i)=>{
                return(
                    <tr key={i}>
                        <td>{obj.bookingDetails.orderDate}</td>
                        <td>{obj.bookingDetails.OrderID}</td>
                        <td>{obj.bookingDetails.productPayablePrice}</td>
                        <td>{(obj.bookingDetails.productSellingPrice)*(obj.bookingDetails.quantity)}</td>
                        <td>{(obj.bookingDetails.productGST)*(obj.bookingDetails.quantity)}</td>
                    </tr>
                );
            })
        }else{
            return(
                <tr>
                    <td colSpan="5"><center>No Record Found</center></td>
                </tr>
            );
        }
       
    }
    render() {
        
        return (
            <div>
            <div className="page-header mt-0 p-3">
                <h3 className="mb-sm-0" id="tex_date_show">Tex Report</h3>
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <a href="#"><i className="fe fe-home"></i></a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Vendor Dashboard</li>
                </ol>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card shadow">
                        <div className="col-md-12">
                            <br />
                            <br />
                            <div className="">
                                    <div className="input-daterange datepicker row align-items-center">
                                    <div className="col-sm-3">
                                            <div className="form-group mb-0">
                                                <div className="input-group">
                                                
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="form-group mb-0">
                                                <div className="input-group">
                                                    <TextField
                                                        id="date"
                                                        label="Start Date"
                                                        type="date"
                                                        value={this.state.start_date}
                                                        className={useStyles.textField}
                                                        InputLabelProps={{
                                                        shrink: true,
                                                        }}
                                                        onChange={this.handelChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="form-group mb-0">
                                                <div className="input-group">
                                                    <TextField
                                                        id="date"
                                                        label="End Date"
                                                        type="date"
                                                        value={this.state.end_date}
                                                        className={useStyles.textField}
                                                        InputLabelProps={{
                                                        shrink: true,
                                                        }}
                                                        onChange={this.handelChange1}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="form-group mb-0">
                                                <div className="input-group">
                                                <input type="button" onClick={this.getTaxlist} className="btn btn-primary mt-1 mb-1" name="Search" id="search" value="Search" style={{backgroundColor: "#ad59ff"}} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                            <span id="table_view">
                            <table className="table" id="example">
                                <thead className="thead-dark">
                                    <tr>
                                        <th className="wd-15p">
                                            Date &amp; <br />
                                            Time
                                        </th>
                                        <th className="wd-15p">
                                            Order <br />
                                            ID
                                        </th>
                                        <th className="wd-15p">
                                            Billing <br />
                                            Value
                                        </th>
                                        <th className="wd-15p">
                                            Taxable <br />
                                            Value
                                        </th>
                                        <th className="wd-15p">Tax(GST)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {this.showTaxlist()}
                                    {/* <tr>
                                        <td colspan="2"><b style={{fontSize: "20px"}}>Total</b></td>
                                        <td><b  style={{fontSize: "20px"}}>500004</b></td>
                                        <td><b  style={{fontSize: "20px"}}>283386.9</b></td>
                                        <td><b  style={{fontSize: "20px"}}>14915.1</b></td>
                                    </tr> */}
                                    <tr></tr>
                                </tbody>
                            </table>

                              </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        )
    }
}
