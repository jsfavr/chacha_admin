import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string';
import { get, put, patch, authget, DELETE, formpost } from '../../utils/service';
import ToastServive from 'react-material-toast';
import imageValid from "../../utils/imageValid";
import { checkAuth } from '../../utils/auth';
import ReactToPrint from "react-to-print";
var Barcode = require('react-barcode');
var Htmltotext = require('html-to-text');

const toast = ToastServive.new({
    place: 'topRight',
    duration: 2,
    maxCount: 8
});

export default class productDetails extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state = {
            id: params.id,
            details: [],
            brand: [],
            feature: [],
            group: [],
            image: [],
            specification: [],
            cat_details: [],
            sub_cat_details: [],
            sub_cub_cat_details: [],


        };
    }
    componentDidMount() {
        document.title = 'Product Details : Admin Dashboard - Crowd';
        document.getElementById("global-loader").style.display = "block";
        setTimeout(() => {
            document.getElementById("global-loader").style.display = "none";
        }, 500)
        authget("/product/viewadminProducts/" + this.state.id)
            .then((response) => {
                //console.log(response);
                if (response.status == 200 || response.status == 201) {
                    this.setState({
                        details: JSON.parse(response.data[0].details)[0].fields,
                        brand: JSON.parse(response.data[0].brand)[0].fields,
                        feature: JSON.parse(response.data[0].feature),
                        group: JSON.parse(response.data[0].group)[0].fields,
                        image: JSON.parse(response.data[0].image),
                        specification: JSON.parse(response.data[0].specification),
                        cat_details: JSON.parse(response.data[0].cat_details)[0].fields,
                        sub_cat_details: JSON.parse(response.data[0].subcat_details)[0].fields,
                        sub_cub_cat_details: JSON.parse(response.data[0].subsubcat_details)[0].fields,





                    });
                } else {
                    toast.error('Session Expired! Please Login');
                    checkAuth.signout();
                    localStorage.removeItem('hcbAdminToken');
                    window.location.href = '/login';
                }

                // console.log(JSON.parse(response.data[0].feature));
                //console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    featureDelete = (id, index1) => {
        // console.log(...this.state.feature)
        // console.log(index1)
        DELETE("/product/feature/" + id)
            .then((response) => {

                toast.success('Feature Delete Successfully');
                let feature = [...this.state.feature]
                let index = feature.findIndex((e) => e.pk === id)
                feature.splice(index, 1)
                this.setState({
                    feature
                })
                //  console.log(this.state.category);
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Sorry!! Feature Delete Unsuccessful');
            });
    }
    specificationDelete = (id) => {
        // console.log(id)
        DELETE("/product/specification/" + id)
            .then((response) => {

                toast.success('Specification Delete Successfully');
                let specification = [...this.state.specification]
                let index = specification.findIndex((e) => e.pk === id)
                specification.splice(index, 1)
                this.setState({
                    specification
                })
                //  console.log(this.state.category);
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Sorry!! Specification Delete Unsuccessful');
            });
    }
    imageDelete = (id) => {
        console.log(id)
        DELETE("/product/image/" + id)
            .then((response) => {

                toast.success('Image Delete Successfully');
                let image = [...this.state.image]
                let index = image.findIndex((e) => e.pk === id)
                image.splice(index, 1)
                this.setState({
                    image
                })
                //  console.log(this.state.category);
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Sorry!! Image Delete Unsuccessful');
            });
    }

    // imageSubmit = (e) =>{
    //     e.preventDefault();
    //     var formdata = new FormData(e.target);
    //     formdata.append('productID_id', this.state.id);
    //        // console.log(...formdata)

    //             formpost("/product/multipleproductimage/",formdata)
    //             .then((response) => {
    //                 if(response.status!=200){
    //                 toast.error('Session Expired! Please Login');
    //                 checkAuth.signout();
    //                 localStorage.removeItem('hcbVendorToken');
    //                 window.location.href='/login';
    //                 }else{
    //                     authget("/product/viewProducts/"+this.state.id)
    //                     .then((response) => {
    //                         //console.log(response.data[0]);
    //                         this.setState({ 
    //                             details:JSON.parse(response.data[0].details)[0].fields,
    //                             brand:JSON.parse(response.data[0].brand)[0].fields,
    //                            feature:JSON.parse(response.data[0].feature),
    //                             group:JSON.parse(response.data[0].group)[0].fields,
    //                             image:JSON.parse(response.data[0].image),
    //                             specification:JSON.parse(response.data[0].specification),
    //                             cat_details:JSON.parse(response.data[0].cat_details)[0].fields,
    //                             sub_cat_details:JSON.parse(response.data[0].subcat_details)[0].fields,
    //                             sub_cub_cat_details:JSON.parse(response.data[0].subsubcat_details)[0].fields,




    //                         });
    //                         //console.log(JSON.parse(response.data[0].feature));
    //                         //console.log(response);
    //                     })
    //                     .catch(function (error) {
    //                         console.log(error);
    //                     });
    //                 toast.success('Image added successfully');

    //                 }
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             }); 

    // }


    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">{this.state.details.productName}</h3>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <Link to="#"><i className="fe fe-home"></i></Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Vendor Dashboard</li>
                    </ol>
                </div>

                <div className="row">
                    <div className="col-md-6 col-xl-6">
                        <div className="card shadow">
                            <div className="card-header">
                                <h2 className="mb-0">Product Details</h2>
                            </div>
                            <div className="card-body text-left">
                                Name : <b style={{ fontSize: "18px" }}>{this.state.details.productName}</b><br />
                                Product Code : <b>{this.state.details.productCode}</b><br />
                                SKU Code : <b>{this.state.details.skuCode}</b><br />
                                Size : {this.state.details.size}<br />
                                Color : {this.state.details.color}<br />
                                Category Name :
                                <b>{this.state.cat_details.cat_name}</b>
                                <br />
                                Sub-category Name :
                                <b>{this.state.sub_cat_details.sub_cat_name}</b>
                                <br />
                                Sub-sub-category Name :
                                <b>{this.state.sub_cub_cat_details.sub_sub_cat_name}</b>
                                <br />

                                Brand Name : <b>{this.state.brand.brand_name}</b> <br />
                                Group Name : {this.state.group.group_name} <br />
  				Country of Origin : <b>{this.state.details.contryOfOrigin}</b><br />

                                Admin Active Status : <b>{
                                    this.state.details.adminActiveStatus == true ? <>YES</> : <>NO</>

                                }</b><br />
                                Review : <b>{this.state.details.avgReview}</b><br />
                                Total Review : <b>{this.state.details.totalReview}</b><br />
                                MRP : {this.state.details.mrp}<br />
                                Selling Price : {Math.round(Number(this.state.details.sellingPrice) + (Number(this.state.details.sellingPrice) * this.state.sub_cat_details.gst) / 100)}({this.state.sub_cat_details.gst}% GST)<br />
                                {/* <Link to={"updateProductDetails?id="+this.state.id} className="btn btn-icon btn-default mt-1 mb-1">
                                    <span className="btn-inner--icon"><i className="fe fe-edit"></i></span>
                                    <span className="btn-inner--text">Update</span>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-6">

                        <div className="card shadow">
                            <div className="card-header">
                                <h2 className="mb-0">Product Description</h2>
                            </div>
                            <div className="card-body text-center">
                                {Htmltotext.fromString(this.state.details.productDescription)}

                                <br />

                                {/* <Link to={"/productDescriptionUpdate?id="+this.state.id} className="btn btn-icon btn-default mt-1 mb-1">
                                    <span className="btn-inner--icon"><i className="fe fe-edit"></i></span>
                                    <span className="btn-inner--text">Update</span>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 col-xl-6">
                        <div className="card shadow">
                            <div className="card-header">
                                <h2 className="mb-0">Features</h2>
                            </div>
                            <div className="card-body text-center">
                                <table width="100%">
                                    <tbody>
                                        {
                                            this.state.feature.map((object, i) => (
                                                <>
                                                    <tr key={i}>
                                                        <td width="45%">
                                                            <p style={{ textAlign: "left" }}>{object.fields.feature}&nbsp;</p>
                                                        </td>
                                                        <td width="15%">
                                                            {/* {
                                                            this.state.feature.length>1?
                                                            <a href="javascript:void(0)" onClick={()=>this.featureDelete(object.pk,i)}><i className="fa fa-trash"></i></a>:null

                                                        } */}

                                                        </td>
                                                    </tr>
                                                </>
                                            ))
                                        }

                                    </tbody>
                                </table>

                                {/* <Link to={"addFeature?id="+this.state.id} className="btn btn-primary btn-pill mt-1 mb-1">Add Features</Link> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-6">
                        <div className="card shadow">
                            <div className="card-header">
                                <h2 className="mb-0">Product Specification</h2>
                            </div>
                            <div className="card-body text-left">
                                <table width="100%">
                                    <tbody>
                                        {
                                            this.state.specification.map((object, i) => (
                                                <>
                                                    <tr key={i}>
                                                        <td width="40%">
                                                            <p style={{ textAlign: "left" }}>{object.fields.title}&nbsp;</p>
                                                        </td>
                                                        <td width="50%">
                                                            <p style={{ textAlign: "left" }}>{object.fields.details}&nbsp;</p>
                                                        </td>

                                                        <td width="10%">
                                                            {/* {
                                                                    this.state.specification.length>1?
                                                                    <a href="javascript:void(0)" onClick={()=>this.specificationDelete(object.pk)}><i className="fa fa-trash"></i></a>:null

                                                                } */}


                                                        </td>
                                                    </tr>
                                                </>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <br />
                                {/* <center>
                                    <Link to={"addSpecification?id="+this.state.id} className="btn btn-icon btn-primary mt-1 mb-1">
                                        <span className="btn-inner--icon"><i className="fe fe-check-square"></i></span>
                                        <span className="btn-inner--text">Add Specification</span>
                                    </Link>
                                </center> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8 col-xl-8">
                        <div className="card shadow">
                            <div className="card-header">
                                <h2 className="mb-0">Product Price &amp; Stock Details</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>

                                                <th>
                                                    Product <br />
                                                    MRP(RS)
                                                </th>
                                                <th>
                                                    Selling <br />
                                                    Price(RS)
                                                </th>
                                                <th>
                                                    Total <br />
                                                    Stock(Qty)
                                                </th>
                                                <th>
                                                    Out <br />
                                                    Stock(Qty)
                                                </th>
                                                <th>
                                                    Available <br />
                                                    Stock(Qty)
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>

                                                <td>₹ {this.state.details.mrp}</td>
                                                <td>₹ {Math.round(Number(this.state.details.sellingPrice) + (Number(this.state.details.sellingPrice) * this.state.sub_cat_details.gst) / 100)}({this.state.sub_cat_details.gst}% GST)</td>
                                                <td>{this.state.details.totalStock}</td>

                                                <td>{parseInt(this.state.details.totalStock) - parseInt(this.state.details.availableStock)}</td>
                                                <td>{this.state.details.availableStock}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="6">
                                                    <center>
                                                        <Link to={"inventoryDetails?id=" + this.state.id} className="btn btn-icon btn-danger mt-1 mb-1">
                                                            <span className="btn-inner--icon"><i className="fe fe-eye"></i></span>
                                                            <span className="btn-inner--text">Inventory</span>
                                                        </Link>
                                                    </center>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-xl-4">
                        <div className="card shadow">
                            <div className="card-header">
                                <h2 className="mb-0">Product Barcode</h2>
                            </div>
                            <div className="row">
                                <div className="card-body text-left ">
                                    <center> <Barcode value={this.state.details.productCode} id='divcontents' width='1' height='50' ref={el => (this.componentRef = el)} />
                                        <br /><br />

                                        <ReactToPrint
                                            trigger={() => <a href="javascript:void(0)" className="btn btn-primary" onClick={this.barcodePrint}>Print</a>}
                                            content={() => this.componentRef}
                                        />
                                    </center>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 col-xl-12">
                        <div className="card shadow">
                            <div className="card-header">
                                <h2 className="mb-0">Product image</h2>
                            </div>
                            <div className="card-body">


                                <div className="row">

                                    {
                                        this.state.image.map((object, i) => (
                                            <>
                                                <div className="" style={{ padding: "5px" }} key={i}>
                                                    <img src={process.env.REACT_APP_DEV_URL + '/NWxctXUSLz1Gg/' + object.fields.productImage} height="160px" style={{ padding: "10px" }} />
                                                    <br />
                                                    {/* <center>
                                                        {
                                                            this.state.image.length>1?
                                                            <a href="javascript:void(0)" onClick={()=>this.imageDelete(object.pk)} className="btn btn-icon btn-pill btn-danger mt-1 mb-1 btn-sm" >
                                                                <span className="btn-inner--icon">Delete</span>
                                                            </a>
                                                            :null

                                                        }
                                                           

                                                            <br />
                                                            <br />
                                                        </center> */}
                                                </div>
                                            </>
                                        ))
                                    }



                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
