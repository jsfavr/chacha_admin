import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Default from '../components/Default'
import Header from '../components/layout_components/header_components/Header'
import Footer from '../components/layout_components/footer_components/Footer'
import Main from '../components/main_components/Dashboard'
import Login from '../components/auth_components/SignIn'
import Sidebar from '../components/layout_components/header_components/Siderbar'
import Categoryglance from '../components/category_components/Categoryglance'
import subCategory from '../components/category_components/subCategory'
import subSubCategory from '../components/category_components/subSubCategory'
import Viewcategory from '../components/category_components/Viewcategory'
import AddCategory from '../components/category_components/categoryAdd'
import updateCategory from '../components/category_components/updateCategory'
import updateSubCategory from '../components/category_components/updateSubCategory'
import updateSubSubCategory from '../components/category_components/updateSubSubCategory'

import AddSubCategory from '../components/category_components/subCategoryAdd'
import AddSubSubCategory from '../components/category_components/SubSubCategoryAdd'
import Addvendor from '../components/vendor_components/Addvendor'
import Pendingvendor from '../components/vendor_components/Pendingvendor'
import Viewvendor from '../components/vendor_components/Viewvendor'
import vendorDetails from '../components/vendor_components/vendorDetails'
import Productgroup from '../components/product_components/Productgroup'
import Addgroup from '../components/product_components/Addgroup'
import Addbrand from '../components/product_components/Addbrand'
import productbrand from '../components/product_components/productbrand'
import updatebrand from '../components/product_components/updatebrand'
import productDetails from '../components/product_components/productDetails'
import Updategroup from '../components/product_components/Updategroup'
import Product from '../components/product_components/Product'
import Viewbanner from '../components/banner_components/Viewbanner'
import Promotionbanner from '../components/banner_components/Promotionbanner'
import Updatebanner from '../components/banner_components/Updatebanner'
import Viewcoupon from '../components/cupon_components/Viewcoupon'
import Addcoupon from '../components/cupon_components/Addcoupon'
// import Viewbooking from '../components/booking_components/Viewbooking'
import Viewbooking from '../components/booking_components/BookingDetails'

import Pendingbooking from '../components/booking_components/Pendingbooking'
import Cancelbooking from '../components/booking_components/Cancelbooking'
import Completebooking from '../components/booking_components/Completebooking'
import Pendingreturn from '../components/booking_components/Pendingreturn'
import Completereturn from '../components/booking_components/Completereturn'
import Bookinghistory from '../components/booking_components/Bookinghistory'
import Viewrefund from '../components/wallet_components/Viewrefund'
import Viewuser from '../components/user_components/Viewuser'
import subscribeUser from '../components/user_components/subscribeUser'
import userDetails from '../components/user_components/userDetails'
import Salesreport from '../components/report_components/Salesreport'
import Taxreport from '../components/report_components/Taxreport'
import deliveryReport from '../components/report_components/deliveryReport'
import Inventory from '../components/inventory_components/Inventory'
import inventoryDetails from '../components/inventory_components/inventoryDetails'
import addPincode from '../components/pincode_components/addPincode'
import viewPincode from '../components/pincode_components/viewPincode'
import updatePincode from '../components/pincode_components/updatePincode'
import viewDeliveryBoy from '../components/deliveryboy_components/viewDeliveryBoy'
import addDeliveryBoy from '../components/deliveryboy_components/addDeliveryBoy'
import deliveryDetails from '../components/deliveryboy_components/deliveryDetails'
import returnDetails from '../components/deliveryboy_components/returnDetails'
import deliveryPincode from '../components/deliveryboy_components/deliveryPincode'
import viewDetails from '../components/deliveryboy_components/viewDetails'
import addDeliveryBoyPincode from '../components/deliveryboy_components/addDeliveryBoyPincode'
import sellingProduct from '../components/main_components/sellingProduct'
import review from '../components/main_components/review'
import mostView from '../components/main_components/mostView'
import mostReview from '../components/main_components/mostReview'
import invoice from '../components/invoiceComponents/invoice'
import deliverySlip from '../components/invoiceComponents/deliverySlip'
import vendorWallet from '../components/wallet_components/vendor_withdraw'

import Viewplan from '../components/plan_components/Viewplan'
import subscribeList from '../components/plan_components/subscribeList'



import Service from '../components/services_components/services'
import AddService from '../components/services_components/AddServices'
import UpdateService from '../components/services_components/updateServices'
import ViewService from '../components/services_components/viewService'
import ViewEnquiry from '../components/services_components/enquiry'
import Ads from '../components/ads_components/ads'
import AdsCreate from '../components/ads_components/adsCreate'
import Setting from '../components/others_components/settings'

import VideoCategory from '../components/video_components/videoCategory'
import PowerVideo from '../components/video_components/powerVideo'
import AddVideo from '../components/video_components/addVideo'




import './App.css'
import { checkAuth } from '../utils/auth'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
export default class App extends Component {
  render() {
    var url = window.location.href
    var urlarray = url.split('/')
    var route1 = urlarray[urlarray.length - 1]
    var route11 = route1.split('?')
    var route = route11[0]
    //console.log(rouat1[0])
    return (
      <>
        {
          route != 'login' && route != 'register' ?
            <>

              <div className="page">
                <div className="page-main">

                  <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
                  <Sidebar></Sidebar>
                  <div className="app-content ">
                    <div className="side-app">
                      <div className="main-content">
                        <div className="p-2 d-block d-sm-none navbar-sm-search">

                        </div>
                        <Header></Header>
                        <div className="container-fluid pt-8">
                          <div style={{ minHeight: "82vh" }}>
                            <Switch >
                              <PrivateRoute exact path='/' component={Main}></PrivateRoute>
                              <PrivateRoute exact path='/sellingProduct' component={sellingProduct}></PrivateRoute>
                              <PrivateRoute exact path='/review' component={review}></PrivateRoute>
                              <PrivateRoute exact path='/mostView' component={mostView}></PrivateRoute>
                              <PrivateRoute exact path='/mostReview' component={mostReview}></PrivateRoute>

                              <PrivateRoute exact path='/deliverySlip' component={deliverySlip}></PrivateRoute>
                              <PrivateRoute exact path='/invoice' component={invoice}></PrivateRoute>






                              {/* <PrivateRoute exact path='/home' component={Main}></PrivateRoute> */}
                              <Route path='/login' component={Login}></Route>
                              <PrivateRoute path='/categoryglance' component={Categoryglance}></PrivateRoute>
                              <PrivateRoute path='/viewcategory' component={Viewcategory}></PrivateRoute>
                              <PrivateRoute path='/addCategory' component={AddCategory}></PrivateRoute>
                              <PrivateRoute path='/subCategory' component={subCategory}></PrivateRoute>
                              <PrivateRoute path='/subSubCategory' component={subSubCategory}></PrivateRoute>
                              <PrivateRoute path='/AddSubCategory' component={AddSubCategory}></PrivateRoute>
                              <PrivateRoute path='/AddSubSubCategory' component={AddSubSubCategory}></PrivateRoute>
                              <PrivateRoute path='/updateCategory' component={updateCategory}></PrivateRoute>
                              <PrivateRoute path='/updateSubCategory' component={updateSubCategory}></PrivateRoute>
                              <PrivateRoute path='/updateSubSubCategory' component={updateSubSubCategory}></PrivateRoute>

                              <PrivateRoute path='/addvendor' component={Addvendor}></PrivateRoute>
                              <PrivateRoute path='/pendingvendor' component={Pendingvendor}></PrivateRoute>
                              <PrivateRoute path='/viewvendor' component={Viewvendor}></PrivateRoute>
                              <PrivateRoute path='/vendorDetails' component={vendorDetails}></PrivateRoute>
                              <PrivateRoute path='/updategroup' component={Updategroup}></PrivateRoute>
                              <PrivateRoute path='/addgroup' component={Addgroup}></PrivateRoute>
                              <PrivateRoute path='/addbrand' component={Addbrand}></PrivateRoute>
                              <PrivateRoute path='/updatebrand' component={updatebrand}></PrivateRoute>

                              <PrivateRoute path='/productbrand' component={productbrand}></PrivateRoute>
                              <PrivateRoute path='/productgroup' component={Productgroup}></PrivateRoute>
                              <PrivateRoute path='/product' component={Product}></PrivateRoute>
                              <PrivateRoute path='/productDetails' component={productDetails}></PrivateRoute>
                              <PrivateRoute path='/viewbanner' component={Viewbanner}></PrivateRoute>
                              <PrivateRoute path='/promotionbanner' component={Promotionbanner}></PrivateRoute>
                              <PrivateRoute path='/updatepromotionbanner' component={Updatebanner}></PrivateRoute>
                              <PrivateRoute path='/viewcoupon' component={Viewcoupon}></PrivateRoute>
                              <PrivateRoute path='/addcoupon' component={Addcoupon}></PrivateRoute>
                              <PrivateRoute path='/viewbooking' component={Viewbooking}></PrivateRoute>
                              <PrivateRoute path='/pendingbooking' component={Pendingbooking}></PrivateRoute>
                              <PrivateRoute path='/cancelbooking' component={Cancelbooking}></PrivateRoute>
                              <PrivateRoute path='/completebooking' component={Completebooking}></PrivateRoute>
                              <PrivateRoute path='/pendingreturn' component={Pendingreturn}></PrivateRoute>
                              <PrivateRoute path='/completereturn' component={Completereturn}></PrivateRoute>
                              <PrivateRoute path='/bookinghistory' component={Bookinghistory}></PrivateRoute>
                              <PrivateRoute path='/viewrefund' component={Viewrefund}></PrivateRoute>
                              <PrivateRoute path='/viewuser' component={Viewuser}></PrivateRoute>
                              <PrivateRoute path='/referList' component={subscribeUser}></PrivateRoute>
                              <PrivateRoute path='/userDetails' component={userDetails}></PrivateRoute>

                              <PrivateRoute path='/salesreport' component={Salesreport}></PrivateRoute>
                              <PrivateRoute path='/taxreport' component={Taxreport}></PrivateRoute>
                              <PrivateRoute path='/deliveryReport' component={deliveryReport}></PrivateRoute>
                              <PrivateRoute path='/inventory' component={Inventory}></PrivateRoute>
                              <PrivateRoute path='/inventoryDetails' component={inventoryDetails}></PrivateRoute>
                              <PrivateRoute path='/addPincode' component={addPincode}></PrivateRoute>
                              <PrivateRoute path='/viewPincode' component={viewPincode}></PrivateRoute>
                              <PrivateRoute path='/updatePincode' component={updatePincode}></PrivateRoute>
                              <PrivateRoute path='/addDeliveryBoy' component={addDeliveryBoy}></PrivateRoute>
                              <PrivateRoute path='/viewDeliveryBoy' component={viewDeliveryBoy}></PrivateRoute>
                              <PrivateRoute path='/deliveryDetails' component={deliveryDetails}></PrivateRoute>
                              <PrivateRoute path='/returnDetails' component={returnDetails}></PrivateRoute>
                              <PrivateRoute path='/deliveryPincode' component={deliveryPincode}></PrivateRoute>
                              <PrivateRoute path='/viewDetails' component={viewDetails}></PrivateRoute>
                              <PrivateRoute path='/addDeliveryBoyPincode' component={addDeliveryBoyPincode}></PrivateRoute>
                              <PrivateRoute path='/vendorWallet' component={vendorWallet}></PrivateRoute>
                              <PrivateRoute path='/viewplan' component={Viewplan}></PrivateRoute>
                              <PrivateRoute path='/purchaseList' component={subscribeList}></PrivateRoute>



                              <PrivateRoute path='/service' component={Service}></PrivateRoute>
                              <PrivateRoute path='/addService' component={AddService}></PrivateRoute>
                              <PrivateRoute path='/updateService' component={UpdateService}></PrivateRoute>
                              <PrivateRoute path='/viewService' component={ViewService}></PrivateRoute>
                              <PrivateRoute path='/enquiry' component={ViewEnquiry}></PrivateRoute>
                              <PrivateRoute path='/ads' component={Ads}></PrivateRoute>
                              <PrivateRoute path='/adsCreate' component={AdsCreate}></PrivateRoute>
                              <PrivateRoute path='/setting' component={Setting}></PrivateRoute>


                              <PrivateRoute path='/powerVideo' component={PowerVideo}></PrivateRoute>
                              <PrivateRoute path='/videoCategory' component={VideoCategory}></PrivateRoute>
                              <PrivateRoute path='/addVideo' component={AddVideo}></PrivateRoute>







                              <Route component={Default}></Route>
                            </Switch>
                          </div>


                          <Footer></Footer>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a href="#top" id="back-to-top"><i className="fa fa-angle-up"></i></a>
            </>
            :
            <div className="bg-gradient-info">
              <Route render={({ location }) => (
                <TransitionGroup >
                  <CSSTransition
                    key={location.key}
                    timeout={5000}
                    className="fade"
                  >
                    <Switch location={location}>
                      {/* <PrivateRoute exact path='/' component={Main}></PrivateRoute> */}
                      <Route path='/login' component={Login}></Route>
                      <PrivateRoute exact path='/deliverySlip' component={deliverySlip}></PrivateRoute>
                      <PrivateRoute exact path='/invoice' component={invoice}></PrivateRoute>
                      {/* <PrivateRoute path='/categoryglance' component={Categoryglance}></PrivateRoute>
                                    <PrivateRoute path='/viewcategory' component={Viewcategory}></PrivateRoute>
                                    <PrivateRoute path='/addCategory' component={AddCategory}></PrivateRoute>
                                    <PrivateRoute path='/subCategory' component={subCategory}></PrivateRoute>
                                    <PrivateRoute path='/subSubCategory' component={subSubCategory}></PrivateRoute>
                                    <PrivateRoute path='/AddSubCategory' component={AddSubCategory}></PrivateRoute>
                                    <PrivateRoute path='/AddSubSubCategory' component={AddSubSubCategory}></PrivateRoute>
                                    <PrivateRoute path='/addvendor' component={Addvendor}></PrivateRoute>
                                    <PrivateRoute path='/pendingvendor' component={Pendingvendor}></PrivateRoute>
                                    <PrivateRoute path='/viewvendor' component={Viewvendor}></PrivateRoute>
                                    <PrivateRoute path='/vendorDetails' component={vendorDetails}></PrivateRoute>
                                    <PrivateRoute path='/updategroup' component={Updategroup}></PrivateRoute>
                                    <PrivateRoute path='/addgroup' component={Addgroup}></PrivateRoute>
                                    <PrivateRoute path='/addbrand' component={Addbrand}></PrivateRoute>
                                    <PrivateRoute path='/productbrand' component={productbrand}></PrivateRoute>
                                    <PrivateRoute path='/productgroup' component={Productgroup}></PrivateRoute>
                                    <PrivateRoute path='/product' component={Product}></PrivateRoute>
                                    <PrivateRoute path='/productDetails' component={productDetails}></PrivateRoute>
                                    <PrivateRoute path='/viewbanner' component={Viewbanner}></PrivateRoute>
                                    <PrivateRoute path='/promotionbanner' component={Promotionbanner}></PrivateRoute>
                                    <PrivateRoute path='/viewcoupon' component={Viewcoupon}></PrivateRoute>
                                    <PrivateRoute path='/addcoupon' component={Addcoupon}></PrivateRoute>
                                    <PrivateRoute path='/viewbooking' component={Viewbooking}></PrivateRoute>
                                    <PrivateRoute path='/pendingbooking' component={Pendingbooking}></PrivateRoute>
                                    <PrivateRoute path='/cancelbooking' component={Cancelbooking}></PrivateRoute>
                                    <PrivateRoute path='/completebooking' component={Completebooking}></PrivateRoute>
                                    <PrivateRoute path='/pendingreturn' component={Pendingreturn}></PrivateRoute>
                                    <PrivateRoute path='/completereturn' component={Completereturn}></PrivateRoute>
                                    <PrivateRoute path='/viewrefund' component={Viewrefund}></PrivateRoute>
                                    <PrivateRoute path='/viewuser' component={Viewuser}></PrivateRoute>
                                    <PrivateRoute path='/subscribeUser' component={subscribeUser}></PrivateRoute>
                                    <PrivateRoute path='/salesreport' component={Salesreport}></PrivateRoute>
                                    <PrivateRoute path='/taxreport' component={Taxreport}></PrivateRoute>
                                    <PrivateRoute path='/deliveryReport' component={deliveryReport}></PrivateRoute>
                                    <PrivateRoute path='/inventory' component={Inventory}></PrivateRoute>
                                    <PrivateRoute path='/inventoryDetails' component={inventoryDetails}></PrivateRoute>
                                    <PrivateRoute path='/addPincode' component={addPincode}></PrivateRoute>
                                    <PrivateRoute path='/viewPincode' component={viewPincode}></PrivateRoute>
                                    <PrivateRoute path='/updatePincode' component={updatePincode}></PrivateRoute>
                                    <PrivateRoute path='/addDeliveryBoy' component={addDeliveryBoy}></PrivateRoute>
                                    <PrivateRoute path='/viewDeliveryBoy' component={viewDeliveryBoy}></PrivateRoute>
                                    <PrivateRoute path='/deliveryDetails' component={deliveryDetails}></PrivateRoute>
                                    <PrivateRoute path='/returnDetails' component={returnDetails}></PrivateRoute>
                                    <PrivateRoute path='/deliveryPincode' component={deliveryPincode}></PrivateRoute> */}



                      <Route component={Default}></Route>
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              )} />
            </div>
        }

      </>
    )
  }
}


const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route {...rest} render={(props) => (
    checkAuth.isAuthenticated
      ? <Component {...props} />
      : window.location.href = '/login'

  )} />
)