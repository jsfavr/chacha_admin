import React, { Component } from 'react'
import {get} from '../../utils/service'
import {Link} from 'react-router-dom'
import ReactPaginate from 'react-paginate';

export class deliveryReport extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             delevery_report:[],
             offset: 0,
             tableData: [],
             orgtableData: [],
             perPage: 50,
             currentPage: 0
        }
    }
    componentDidMount(){
            document.title = 'Delivery Report : Admin Dashboard - Crowd';
            document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
        get('/booking/deliveryReport/')
        .then(res=>{
            var tdata = res.data
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                delevery_report:res.data,
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData : tdata,
                tableData:slice
            })
        })
        .catch(err=>{

        })
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    }
    loadMoreData() {
		const data = this.state.orgtableData;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice
		})
	
    }
    getReport=()=>{
        return this.state.tableData.map((obj,i)=>{
            return(
                <tr>
                    <td>{obj.bookingDetails.orderDate}</td>
                    <td>
                        <Link to={"/Viewbooking?booking_id="+obj.bookingDetails.booking_id}>{obj.bookingDetails.OrderID}</Link>
                    </td>
                    
                    <td>₹{ obj.bookingDetails.productPayablePrice}/-</td>
                    <td>
                    {obj.bookingDetails.orderStatus == 1 ?
                        <>
                        <span className="badge badge-primary">Order Under Process</span><br />
                        </>:
                        obj.bookingDetails.orderStatus == 2 ?
                        <>
                        <span className="badge badge-primary">Order In Transit</span><br />
                        </>:
                        obj.bookingDetails.orderStatus == 3 ?
                        <>
                        <span className="badge badge-primary">Out for Delivery</span><br />
                        </>:
                        obj.bookingDetails.orderStatus == 4 ?
                        <>
                        <span className="badge badge-primary">Delivered</span><br />
                        </>:
                        obj.bookingDetails.orderStatus == 5 ?
                        <>
                        <span className="badge badge-primary">Return Under Process</span><br />                  
                        </>:
                        obj.bookingDetails.orderStatus == 6 ?
                        <>
                        <span className="badge badge-primary">Ready for Return</span><br />
                        </>:
                        obj.bookingDetails.orderStatus == 7 ?
                        <>
                        <span className="badge badge-primary">Out for Pickup</span><br />
                        
                        </>:
                        obj.bookingDetails.orderStatus == 8 ?
                        <>
                        <span className="badge badge-danger">Returned</span><br />
                       
                        </>:
                        obj.bookingDetails.orderStatus == 9 ?
                        <>
                        <span className="badge badge-danger">Canceled</span><br />
                            
                        </>:
                        null
                    }                
                   <br />
                                                      
                    </td>
                    <td>
                    {obj.shippingAddress.pincode}
                    </td>

                    <td>
                    {obj.deliveryBoy.name}<br/>
                    {obj.deliveryBoy.phone}
                    </td>
                    <td>
                    {obj.bookingDetails.deliveryDate}
                    </td>

                    <td>{obj.returnBoy.name}<br/>
                    {obj.returnBoy.phone}
                    </td>
                    <td>
                   { obj.bookingDetails.returnDate}
                    </td>
                </tr>
            );
        })
    }
    render() {
        return (
            <div>
                <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Delivery Report</h3>
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
                                <h2 className="mb-0">Delivery Report</h2>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table id="example" className="table table-striped table-bordered w-100 text-nowrap">
                                        <thead>
                                            <tr>
                                                <th className="wd-15p">
                                                    Order <br />
                                                    Date
                                                </th>
                                                <th className="wd-15p">
                                                    Order<br />
                                                    ID
                                                </th>
                                                <th className="wd-15p sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Order Value: activate to sort column ascending" style={{width: "51px"}}>
                                                    Order <br />
                                                    Value
                                                </th>
                                                <th className="wd-15p">
                                                    Current <br />
                                                    Order <br />
                                                    Status<br />
                                                </th>
                                                <th className="wd-15p">
                                                    Custromar <br />
                                                    Pincode
                                                </th>
                                                <th className="wd-15p">
                                                    Delivery <br />
                                                    Boy Name
                                                </th>
                                                <th className="wd-15p">
                                                    Delivery <br />
                                                    Date
                                                </th>
                                                <th className="wd-15p">
                                                    Return <br />
                                                    Boy Name
                                                </th>
                                                <th className="wd-15p">
                                                    Return <br />
                                                    Date<br />
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           {this.getReport()}
                                        </tbody>
                                    </table>
                                    <span style={{float:'right'}}>
                                        <ReactPaginate
                                            previousLabel={"prev"}
                                            nextLabel={"next"}
                                            breakLabel={"..."}
                                            breakClassName={"break-me"}
                                            pageCount={this.state.pageCount}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={this.handlePageClick}
                                            containerClassName={"pagination"}
                                            subContainerClassName={"pages pagination"}
                                            activeClassName={"active"}/>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            </div>
        )
    }
}

export default deliveryReport
