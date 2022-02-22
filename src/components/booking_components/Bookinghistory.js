import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { get } from '../../utils/service'
export default class Bookinghistory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            booking_history: []
        }
    }
    componentDidMount() {
        document.title = 'Booking History : Admin Dashboard - Hardwarechacha';
        document.getElementById("global-loader").style.display = "block";
        setTimeout(() => {
            document.getElementById("global-loader").style.display = "none";
        }, 500)
        get('/booking/bookingHistory/')
            .then(res => {
                this.setState({
                    booking_history: res.data
                })
            })
            .catch(err => {

            })
    }
    getHistory = () => {
        return this.state.booking_history.map((obj, i) => {
            return (
                <tr key={i}>
                    <td><b style={{ fontSize: "16px" }}><Link to={"/userDetails?id=" + obj.userDetails.id + "&name=" + obj.userDetails.name}>{obj.userDetails.customerID}</Link></b></td>
                    <td>{obj.userDetails.name}</td>
                    <td>{obj.userDetails.email}</td>
                    <td>
                        {obj.orderId.map((obj1, j) => {
                            return (
                                <>
                                    <Link to={"/Viewbooking?booking_id=" + obj1.booking_id}>{obj1.OrderID}</Link>, </>
                            );

                        })}
                    </td>
                    <td>{obj.bookingPayment.grandTotal}</td>
                    <td>{obj.bookingPayment.walletAmount}</td>
                    <td>{obj.bookingPayment.walletPoint}</td>
                    <td>{obj.bookingPayment.couponDiscount}</td>
                    <td>{obj.bookingPayment.deliveryCharge}</td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Booking History</h3>
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
                                <h2 className="mb-0">Booking History</h2>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table id="example" className="table table-striped table-bordered w-100 text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Customer <br />
                                                 ID
                                             </th>
                                                <th>
                                                    Customer <br />
                                                 name
                                             </th>
                                                <th>
                                                    Email <br />
                                                 Address
                                             </th>
                                                <th>
                                                    Order <br />
                                                 Id
                                             </th>

                                                <th>
                                                    Payble <br />
                                                 Price
                                             </th>
                                               
                                                <th>
                                                    Coupon <br />
                                                 Discount
                                             </th>
                                                <th>
                                                    Delivery <br />
                                                 Charage
                                             </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.getHistory()}
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
