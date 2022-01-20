import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { get, withoutauthpatch, post } from '../../utils/service'
import ToastServive from 'react-material-toast';
import ReactPaginate from 'react-paginate';
import SearchField from "react-search-field";
const toast = ToastServive.new({
    place: 'topRight',
    duration: 2,
    maxCount: 8
});
export default class Product extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: [],
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 50,
            currentPage: 0,
            searchitem: '',
            searchType: 'Product Name',
        }
    }

    componentDidMount() {
        this.getData()
        document.title = 'Product List : Admin Dashboard - Crowd';
        document.getElementById("global-loader").style.display = "block";
        setTimeout(() => {
            document.getElementById("global-loader").style.display = "none";
        }, 500)
    }
    getData() {
        get('/product/viewallProduct/')
            .then(res => {
                if (res.data === undefined) {
                    // console.log(res.data);
                    window.location.href = '/login'
                } else {
                    let data = res.data
                    var tdata = res.data.sort((a, b) => (b > a ? 1 : -1))
                    var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
                    this.setState({
                        product: data.sort((a, b) => (b > a ? 1 : -1)),
                        pageCount: Math.ceil(tdata.length / this.state.perPage),
                        orgtableData: tdata,
                        tableData: slice

                    })
                }
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
    }
    loadMoreData() {
        const data = this.state.orgtableData;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            tableData: slice
        })

    }
    productstatusChange = (id, pro) => {
        const data = {
            adminActiveStatus: pro
        }
        withoutauthpatch("/product/product/" + id, data)
            .then((response) => {

                toast.success('Product Status Update Successfully');
                this.getData()

            })
            .catch(function (error) {
                console.log(error);
                toast.error('Sorry!! Product Status Update Unsuccessful');
            });
    }
    handleChange = (e) => {

        this.setState({
            searchText: e
        })
        const data = {
            searchText: e,
            searchType: this.state.searchType
        }
        console.log(data)
        post('/product/searchallProduct/', data)
            .then(res => {
                console.log(res.data)
                if (res.data === undefined) {
                    // console.log(res.data);
                    window.location.href = '/login'
                } else {
                    let data = res.data
                    var tdata = res.data.sort((a, b) => (b > a ? 1 : -1))
                    var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
                    this.setState({
                        product: data.sort((a, b) => (b > a ? 1 : -1)),
                        pageCount: Math.ceil(tdata.length / this.state.perPage),
                        orgtableData: tdata,
                        tableData: slice

                    })
                }
            }).catch(err => {

            })
    }
    productdetails = () => {
        return this.state.tableData.map((obj, i) => {
            return (
                <tr role="row" className="odd" key={i}>
                    <td className="sorting_1">{JSON.parse(obj.details)[0].fields.productCode}</td>
                    <td>
                        <span style={{ fontSize: "12px" }}>

                            <span style={{ fontSize: "15px" }}><b>{JSON.parse(obj.details)[0].fields.productName}</b></span> <br /><b>HSN </b>: {JSON.parse(obj.details)[0].fields.skuCode},<br />
                            <b>Group</b> : {JSON.parse(obj.group)[0].fields.group_name}<br />
                            <b>Brand</b> : {JSON.parse(obj.brand)[0].fields.brand_name}<br />
                            <b>Color</b> : {JSON.parse(obj.details)[0].fields.color},<br />
                            <b>Size</b> : {JSON.parse(obj.details)[0].fields.size}


                            <br />

                            <b>Vendor Status</b> : {JSON.parse(obj.details)[0].fields.vendorActiveStatus == true ?
                                <span className="badge badge-primary"><b>Active </b></span>
                                :
                                <span className="badge badge-danger"><b>Inactive </b></span>
                            }
                        </span>
                    </td>
                    <td>
                        <span style={{ fontSize: "14px" }}>Customer ID :   <Link to={"vendorDetails?id=" + JSON.parse(obj.vendorDetails)[0].pk} > <b style={{ fontSize: "17px" }}>{JSON.parse(obj.vendorDetails)[0].fields.username}</b></Link></span>
                        <br /><b>Name</b> : {JSON.parse(obj.vendorDetails)[0].fields.name}
                        <br /> <b>Email</b> : {JSON.parse(obj.vendorDetails)[0].fields.email}
                        <br /> <b>Phone</b> : {JSON.parse(obj.vendorDetails)[0].fields.phone}

                    </td>
                    {/* <td>{JSON.parse(obj.group)[0].fields.group_name}</td> */}

                    <td>
                        <b>Category</b> : {JSON.parse(obj.cat_details)[0].fields.cat_name}
                        <br /><b>Sub Category</b> : {JSON.parse(obj.subcat_details)[0].fields.sub_cat_name}
                        <br /> <b>Sub Sub Category</b> : {JSON.parse(obj.subsubcat_details)[0].fields.sub_sub_cat_name}

                    </td>


                    <td>
                        <Link to={"/productDetails?id=" + JSON.parse(obj.details)[0].pk} className="btn btn-primary mt-1 mb-1 btn-sm">View &amp; Update</Link>
                        <br />
                        {JSON.parse(obj.details)[0].fields.adminActiveStatus == true ?
                            <a className="btn btn-icon btn-pill btn-success mt-1 mb-1 btn-sm text-white" onClick={() => this.productstatusChange(JSON.parse(obj.details)[0].pk, 0)}>Active</a>
                            :
                            <a className="btn btn-icon btn-pill  btn-danger mt-1 mb-1 btn-sm text-white" onClick={() => this.productstatusChange(JSON.parse(obj.details)[0].pk, 1)}>Inactive</a>
                        }
                    </td>
                </tr>
            );

        })
    }
    handleSelectChange = (e) => {
        console.log(e.target.value)

        this.setState({
            searchType: e.target.value,
            searchText: ''
        })
        this.getData()

    }
    handleSelect2Change = (e) => {
        console.log(e.target.value)
        this.setState({
            searchText: e.target.value
        })
        this.handleChange(e.target.value)
    }
    render() {
        return (
            <div>

                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Product List</h3>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <Link to="#"><i className="fe fe-home"></i></Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Product List</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow">
                            <div className="card-body row">
                                <div className="col-md-6"><b>{this.state.product.length}</b> Product Found</div>
                                <div className="col-md-6" >
                                    <div
                                        style={{
                                            float: "right",
                                            marginBottom: "13px",
                                            marginTop: "-15px"
                                        }}>
                                        <select style={{
                                            height: "34px",
                                            borderColor: "#dddddd",
                                            borderRight: "none",
                                            outline: "none",
                                            fontSize: "12.7px",
                                            padding: "9px",
                                            flex: " 1 1 0%",
                                            color: "rgb(90, 90, 90)",
                                            fontWeight: 100,
                                            cursor: "pointer"
                                        }}
                                            onChange={this.handleSelectChange}
                                        >

                                            <option>Product Name</option>
                                            <option>Product Code</option>
                                            <option>Product Group</option>
                                            <option>Product Brand</option>
                                            <option>Customer ID</option>
                                            <option>Vendor Name</option>
                                            <option>Vendor Email</option>
                                            <option>Vendor Phone</option>
                                            <option>Category</option>
                                            <option>Sub Category</option>
                                            <option>Sub Sub Category</option>
                                            <option>Vendor Status</option>
                                            <option>Admin Status</option>
                                        </select>
                                        {
                                            this.state.searchType == 'Vendor Status' || this.state.searchType == 'Admin Status' ?

                                                <select classNames="test-class"
                                                    style={{
                                                        height: "34px",
                                                        borderColor: "#dddddd",
                                                        // borderRight: "none",
                                                        outline: "none",
                                                        fontSize: "12.7px",
                                                        padding: "9px",
                                                        flex: " 1 1 0%",
                                                        color: "rgb(90, 90, 90)",
                                                        fontWeight: 100,
                                                        cursor: "pointer",
                                                        width: "223px"
                                                    }}
                                                    onChange={this.handleSelect2Change}
                                                >
                                                    <option disabled selected>Choose</option>
                                                    <option value='True'>Active</option>
                                                    <option value='False'>Non-Active</option>

                                                </select>
                                                :
                                                <>
                                                    <SearchField
                                                        placeholder="Search..."
                                                        onChange={this.handleChange}
                                                        searchText={this.state.searchText}
                                                        classNames="test-class"
                                                    />
                                                </>
                                        }


                                    </div>
                                </div>


                                <div className="table-responsive">
                                    <table id="example" className="table table-striped table-bordered w-100 text-nowrap">
                                        <thead>
                                            <tr>
                                                <th className="wd-15p">
                                                    Product <br />
                                          Code
                                      </th>
                                                <th className="wd-15p">
                                                    Product <br />
                                          Details
                                      </th>

                                                <th className="wd-15p">
                                                    Vendor<br />
                                          Details
                                      </th>
                                                {/* <th className="wd-15p">
                                                    Product <br />
                                          Group
                                      </th> */}

                                                <th className="wd-15p">
                                                    Category<br />
                                          Details
                                      </th>
                                                {/* <th className="wd-15p">
                                                    sub <br />
                                          category<br />
                                          name
                                      </th>
                                                <th className="wd-15p">
                                                    sub sub <br />
                                          category<br />
                                          name
                                      </th> */}



                                                <th className="wd-20p">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.productdetails()}

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
                            <p style={{ color: "red" }}>&nbsp;&nbsp;&nbsp; &nbsp;* Please Contact to the Admin</p>
                        </div>
                    </div>
                </div>
                <input type="hidden" name="_token" id="_token" value="<?php echo csrf_token(); ?>" />
            </div>
        );
    }
}
