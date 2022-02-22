import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from './chacha.png'
import LogoDark from './suhem_light.png'
export default class Siderbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expended: 'NO'
        }

    }
    expended = (e) => {
        var active = document.querySelectorAll(".is-expanded");
        active.forEach(element => {
            if (element.classList[1] != e) {
                element.classList.remove("is-expanded");
            }
        });
    }
    render() {
        return (
            <>
                <aside className="app-sidebar ">
                    <div className="sidebar-img">
                        <Link className="navbar-brand" to="/"><img src={Logo} style={{ width: "100%", padding: 0, borderRadius: "10px" }} /> </Link>
                        <ul className="side-menu">
                            <li className="slide" onClick={() => this.expended(0)}>
                                <Link className={"side-menu__item"} to="/"><i className="side-menu__icon fe fe-home"></i><span className="side-menu__label">Dashboard</span></Link>

                            </li>
                            {/* <li className="slide">
                                <Link className="side-menu__item"  to="/categoryglance"><i className="side-menu__icon fe fe-home"></i><span className="side-menu__label">Category at a Glance</span></Link>
                              
                            </li> */}
                            <li className="slide 1" onClick={() => this.expended(1)}>
                                <Link className="side-menu__item" to="/viewcategory"><i className="side-menu__icon fe fe-home"></i><span className="side-menu__label">View Category</span></Link>

                            </li>


                            <li className="slide 3" onClick={() => this.expended(3)}>
                                <Link className="side-menu__item" to="/productgroup"><i className="side-menu__icon fe fe-grid"></i><span className="side-menu__label">Product Group</span></Link>

                            </li>
                            <li className="slide 4" onClick={() => this.expended(4)}>
                                <Link className="side-menu__item" to="/productbrand"><i className="side-menu__icon fe fe-grid"></i><span className="side-menu__label">Product Brand</span></Link>

                            </li>


                            <li className="slide 5" onClick={() => this.expended(5)}>
                                <Link className="side-menu__item" to="/product"><i className="side-menu__icon fe fe-edit"></i><span className="side-menu__label">Product</span></Link>

                            </li>

                            <li className="slide 6" onClick={() => this.expended(6)}>
                                <a className="side-menu__item" data-toggle="slide" href="#"><i className="side-menu__icon fe fe-bar-chart-2"></i><span className="side-menu__label">Banner Details</span><i className="angle fa fa-angle-right"></i></a>
                                <ul className="slide-menu">
                                    <li>
                                        <Link to="/viewbanner" className="slide-item">Display Banner</Link>
                                    </li>
                                    {/* <li>
                                        <Link to="/promotionbanner" className="slide-item">Promotion Banner </Link>
                                    </li> */}
                                    <li>
                                        <Link to="/viewcoupon" className="slide-item">View Coupon</Link>
                                    </li>
                                    <li>
                                        <Link to="/addcoupon" className="slide-item">Add Coupon</Link>
                                    </li>

                                </ul>
                            </li>
                            <li className="slide 7" onClick={() => this.expended(7)}>
                                <a className="side-menu__item" data-toggle="slide" href="#" ><i className="side-menu__icon fe fe-edit"></i><span className="side-menu__label">Booking</span><i className="angle fa fa-angle-right"></i></a>
                                <ul className="slide-menu">
                                    <li>
                                        <Link to="/pendingbooking" className="slide-item">Pending Booking</Link>
                                    </li>
                                    <li>
                                        <Link to="/completebooking" className="slide-item">Completed Booking</Link>
                                    </li>
                                    <li>
                                        <Link to="/cancelbooking" className="slide-item">Canceled Booking</Link>
                                    </li>
                                    <li>
                                        <Link to="/pendingreturn" className="slide-item">Pending Return Booking</Link>
                                    </li>
                                    <li>
                                        <Link to="/completereturn" className="slide-item">Completed Return Booking</Link>
                                    </li>
                                    <li>
                                        <Link to="/bookinghistory" className="slide-item">Booking History</Link>
                                    </li>
                                </ul>
                            </li>


                            {/* <li className="slide 8" onClick={()=>this.expended(8)}>
                                <a className="side-menu__item"  data-toggle="slide" href="#"><i className="side-menu__icon fe fe-bar-chart-2"></i><span className="side-menu__label">Delivery Boy Details</span><i className="angle fa fa-angle-right"></i></a>
                                <ul className="slide-menu">
                                   <li>
                                        <Link to="/addDeliveryBoy" className="slide-item">Add Delivery Boy</Link>
                                    </li>
                                    <li>
                                        <Link to="/viewDeliveryBoy" className="slide-item">View Delivery Boy</Link>
                                    </li>
                    
                                </ul>
                            </li> */}
                            {/* <li className="slide 8" onClick={() => this.expended(8)}>
                                <a className="side-menu__item" data-toggle="slide" href="#"><i className="side-menu__icon fe fe-bar-chart-2"></i><span className="side-menu__label">Power</span><i className="angle fa fa-angle-right"></i></a>
                                <ul className="slide-menu">
                                
                                    <li>
                                        <Link to="/viewplan" className="slide-item">View Power</Link>
                                    </li>
                                    <li>
                                        <Link to="/purchaseList" className="slide-item">Power Purchase List</Link>
                                    </li>

                                </ul>
                            </li> */}

                            <li className="slide 9" onClick={() => this.expended(9)}>
                                <a className="side-menu__item" data-toggle="slide" href="#"><i className="side-menu__icon fe fe-bar-chart-2"></i><span className="side-menu__label">Delivery Pincode</span><i className="angle fa fa-angle-right"></i></a>
                                <ul className="slide-menu">
                                    <li>
                                        <Link to="/addPincode" className="slide-item">Add Pincode</Link>
                                    </li>
                                    <li>
                                        <Link to="/viewPincode" className="slide-item">View Pincode</Link>
                                    </li>

                                </ul>
                            </li>
                            <li className="slide 2" onClick={() => this.expended(2)}>
                                <Link className="side-menu__item" to="/viewvendor"><i className="side-menu__icon fe fe-grid"></i><span className="side-menu__label">Vendor Details</span></Link>

                            </li>
                            {/* <li className="slide 19" onClick={() => this.expended(19)}>
                                <a className="side-menu__item" data-toggle="slide" href="#"><i className="side-menu__icon fe fe-bar-chart-2"></i><span className="side-menu__label">Power Video</span><i className="angle fa fa-angle-right"></i></a>
                                <ul className="slide-menu">
                                    <li>
                                        <Link to="/videoCategory" className="slide-item">Video Category</Link>
                                    </li>
                                    <li>
                                        <Link to="/powerVideo" className="slide-item">Power Video</Link>
                                    </li>
                                </ul>
                            </li> */}
                            <li className="slide 10" onClick={() => this.expended(10)}>
                                <Link to="/viewuser" className="side-menu__item"><i className="side-menu__icon fe fe-bar-chart-2"></i><span className="side-menu__label">User Details</span></Link>

                            </li>
                            {/* <li className="slide 11" onClick={()=>this.expended(11)}>
                                <Link className="side-menu__item"  to="/deliveryReport"><i className="side-menu__icon fe fe-home"></i><span className="side-menu__label">Delivery Report</span></Link>
                            </li> */}
                            {/* <li className="slide 12" onClick={() => this.expended(12)}>
                                <Link className="side-menu__item" to="/inventory"><i className="side-menu__icon fe fe-home"></i><span className="side-menu__label">Inventory Details</span></Link>
                            </li> */}
                            <li className="slide 13" onClick={() => this.expended(13)}>
                                <Link className="side-menu__item" to="/salesreport"><i className="side-menu__icon fe fe-file-text"></i><span className="side-menu__label">Sales Report</span></Link>
                            </li>
                            <li className="slide 14" onClick={() => this.expended(14)}>
                                <Link className="side-menu__item" to="/taxreport"><i className="side-menu__icon fe fe-file-text"></i><span className="side-menu__label">Tax Report</span></Link>
                            </li>
                            <li className="slide 15" onClick={() => this.expended(15)}>
                                <Link className="side-menu__item" to="/vendorWallet"><i className="side-menu__icon fe fe-file-text"></i><span className="side-menu__label">Withdrawal Request</span></Link>
                            </li>
                            {/* <li className="slide 16" onClick={() => this.expended(16)}>
                                <Link className="side-menu__item" to="/service"><i className="side-menu__icon fe fe-file-text"></i><span className="side-menu__label">Other Service</span></Link>
                            </li> */}
                            <li className="slide 17" onClick={() => this.expended(17)}>
                                <Link className="side-menu__item" to="/enquiry"><i className="side-menu__icon fe fe-map"></i><span className="side-menu__label">All Enquiry</span></Link>
                            </li>
                            {/* <li className="slide 18" onClick={() => this.expended(18)}>
                                <Link className="side-menu__item" to="/ads"><i className="side-menu__icon fe fe-map"></i><span className="side-menu__label">Short Video</span></Link>
                            </li> */}
                            <li className="slide 18" onClick={() => this.expended(19)}>
                                <Link className="side-menu__item" to="/setting"><i className="side-menu__icon fe fe-map"></i><span className="side-menu__label">Setting</span></Link>
                            </li>


                        </ul>
                    </div>
                </aside>
            </>
        )
    }
}
