import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { get, post } from '../../utils/service'
import ReactPaginate from 'react-paginate';
import SearchField from "react-search-field";

export default class Completebooking extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bookings: [],
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 50,
            currentPage: 0,
            searchitem: ''

        }
    }
    componentDidMount() {
        document.title = 'Complete Booking : Admin Dashboard - Hardwarechacha';
        document.getElementById("global-loader").style.display = "block";
        setTimeout(() => {
            document.getElementById("global-loader").style.display = "none";
        }, 500)
        get('/booking/adminBooking/2')
            .then(res => {
                var tdata = res.data.filter(e => e.bookingDetails.orderStatus == 4)
                var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    bookings: res.data,
                    pageCount: Math.ceil(tdata.length / this.state.perPage),
                    orgtableData: tdata,
                    tableData: slice
                })
            }).catch(err => {

            })
    }
    handleChange = e => {
        const data = {
            search: e
        }
        post('/booking/searchBooking/', data)
            .then(res => {
                var tdata = res.data.filter(e => e.bookingDetails.orderStatus == 4)
                var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    bookings: res.data,
                    pageCount: Math.ceil(tdata.length / this.state.perPage),
                    orgtableData: tdata,
                    tableData: slice
                })
            }).catch(err => {

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

    };
    loadMoreData() {
        const data = this.state.orgtableData;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            tableData: slice
        })

    }
    bookingShow = () => {
        return this.state.tableData.map((obj, i) => {
            if (obj.bookingDetails.orderStatus == 4) {
                return (
                    <tr className="odd" key={i}>
                        <td className="sorting_1">{obj.bookingDetails.orderDate}</td>
                        <td><b style={{ fontSize: "16px" }}>{obj.bookingDetails.OrderID}</b></td>
                        <td><b><Link to={"/userDetails?id=" + obj.shippingAddress.id + "&name=" + obj.shippingAddress.name} style={{ fontSize: "16px" }}>{obj.shippingAddress.customerID}</Link></b></td>
                        <td>{obj.shippingAddress.name}</td>
                        <td>{obj.shippingAddress.phone}</td>

                        <td>₹{obj.bookingDetails.productPayablePrice + obj.bookingDetails.deliveryCharge}<br />
                            
                            <span className="badge badge-primary" style={{ float: "right" }}> {obj.bookingDetails.paymentType}</span>
                            
                        </td>
                        <td>
                            <Link to={"/Viewbooking?booking_id=" + obj.bookingDetails.OrderID + "&status=2"} className="btn btn-icon btn-sm btn-primary mt-1 mb-1" type="button">
                                <span className="btn-inner--icon"><i className="fe fe-eye"></i></span>
                                <span className="btn-inner--text">View Details</span>
                            </Link>
                        </td>
                    </tr>
                );
            }

            // else{
            //     return(
            //         <tr className="odd">

            //             <td colSpan="6"><center>No Record Found</center></td>
            //         </tr>
            //     );

            // }

        })
    }
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Complete Booking</h3>
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
                                <h2 className="mb-0">Complete Booking</h2>
                                {/* <div
                                    style={{
                                        float: "right",
                                        marginBottom: "13px",
                                        marginTop: "-15px"
                                    }}
                                >
                                    <SearchField
                                        placeholder="Search by oder Id and date"
                                        onChange={this.handleChange}
                                        searchText={this.state.searchitem}
                                        classNames="test-class"
                                    />
                                </div> */}
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table id="example" className="table table-striped table-bordered w-100 text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Date &amp; <br />
                                                 Time
                                             </th>
                                                <th>
                                                    Order <br />
                                                 Id
                                             </th>
                                                <th>
                                                    Customer <br />
                                                 ID
                                             </th>
                                                <th>
                                                    Customer <br />
                                                 name
                                             </th>
                                                <th>
                                                    Contact <br />
                                                 Number
                                             </th>
                                                <th>
                                                    Payble <br />
                                                 Price
                                             </th>
                                                <th>
                                                    More <br />
                                                 Details
                                             </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.bookingShow()}
                                        </tbody>
                                    </table>
                                    <span style={{ float: 'right' }}>
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
                                            activeClassName={"active"} />
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
