import React, { Component } from "react";
import { Link } from "react-router-dom";
import { get, withoutauthpatch } from "../../utils/service";
import queryString from "query-string";
import ToastServive from "react-material-toast";
import Moment from "moment";
import ReactToPrint from "react-to-print";
import Pdf from "react-to-pdf";
import "./invoicePrint.css";

var Barcode = require("react-barcode");
var QRCode = require("qrcode.react");

const toast = ToastServive.new({
  place: "topRight",
  duration: 2,
  maxCount: 8,
});
export default class invoice extends Component {
  constructor(props) {
    super(props);
    let url = this.props.location.search;
    let params = queryString.parse(url);
    this.state = {
      billingAddress: [],
      productDetail: [],
      shippingAddress: [],
      userDetails: [],
      bookingArray: [],
      get_id: params.booking_id,
    };
  }
  componentDidMount() {
    document.title = "Billing Invoice : Admin Dashboard - HardwareChacha";
    document.getElementById("global-loader").style.display = "block";
    setTimeout(() => {
      document.getElementById("global-loader").style.display = "none";
    }, 500);
    get("/booking/InvoiceBookingDetails/" + this.state.get_id)
      .then((res) => {
        console.log(res);
        this.setState({
          billingAddress: res.data.billingAddress,
          productDetail: res.data.productArray,
          shippingAddress: res.data.shippingAddress,
          userDetails: res.data.userDetails,
          bookingArray: res.data.bookingArray,
        });
      })
      .catch((err) => {});
  }
  handleClick = () => {
    const data = {
      ner: 0,
      hsdre: 1,
    };
    console.log(data);
  };
  render() {
    const options = {
      orientation: "landscape",
      unit: "in",
      // format: [400,200]
    };
    return (
      <div>
        <div className="page-header mt-0 p-3">
          <h3 className="mb-sm-0">Invoice</h3>
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
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <div className="card shadow">
              <div className="card-body" ref={(el) => (this.componentRef = el)}>
                <div className="">
                  <table class="table">
                    <tbody>
                      <tr>
                        <td style={{ width: "25%" }}>
                          <b style={{ fontSize: "25px" }}>Tax Invoice</b>
                        </td>
                        <td style={{ width: "20%" }}>
                          Order id: <b>{this.state.bookingArray.orderID}</b>
                          <br />
                          Order Date: {this.state.bookingArray.orderDate}
                        </td>
                        <td style={{ width: "20%" }}>
                          Invoice Number:{" "}
                          <b>{this.state.bookingArray.invoiceNumber}</b>
                          <br />
                          Invoice Date: {this.state.bookingArray.invoiceDate}
                        </td>

                        <td style={{ width: "15%" }}>
                          GSTIN: 19AGLPH9476L1ZH
                          <br />
                          {/* PAN: */}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="row invoice">
                    <div class="col-md-12">
                      <div class="">
                        <table class="table">
                          <tbody>
                            <tr>
                              <td style={{ width: "30%" }}>
                                <b>Shipping Address</b>
                                <br />
                                <strong style={{ fontSize: "14px" }}>
                                  {this.state.shippingAddress.name}
                                </strong>
                                ,{this.state.shippingAddress.phone},
                                {String(
                                  this.state.shippingAddress.optionalPhone
                                ).length > 9 ? (
                                  <>
                                    {this.state.shippingAddress.optionalPhone},
                                  </>
                                ) : null}
                                <br />
                                {this.state.shippingAddress.address},
                                {String(this.state.shippingAddress.flat)
                                  .length > 2 &&
                                this.state.shippingAddress.flat != null ? (
                                  <>
                                    <br />
                                    {this.state.shippingAddress.flat},
                                  </>
                                ) : null}
                                {String(this.state.shippingAddress.landmark)
                                  .length > 2 &&
                                this.state.shippingAddress.landmark != null ? (
                                  <>{this.state.shippingAddress.landmark},</>
                                ) : null}
                                <br />
                                {String(this.state.shippingAddress.location)
                                  .length > 2 &&
                                this.state.shippingAddress.location != null ? (
                                  <>{this.state.shippingAddress.location},</>
                                ) : null}
                                {this.state.shippingAddress.city},
                                {this.state.shippingAddress.district}, <br />
                                {this.state.shippingAddress.state}-
                                {this.state.shippingAddress.pincode}
                              </td>

                              <td style={{ width: "30%" }}>
                                <b>Billing Address</b>
                                <br />
                                <strong>{this.state.userDetails.name},</strong>
                                {this.state.userDetails.phone}
                                <br />
                                {this.state.billingAddress.flat},
                                {String(this.state.billingAddress.location)
                                  .length > 2 &&
                                this.state.billingAddress.location != null ? (
                                  <>{this.state.billingAddress.location},</>
                                ) : null}
                                <br />
                                {this.state.billingAddress.address},
                                {this.state.billingAddress.city},<br />
                                {this.state.billingAddress.district},
                                {this.state.billingAddress.state}-
                                {this.state.billingAddress.pincode}
                              </td>
                              <td style={{ width: "40%" }}>
                                <br />
                                *Keep this Invoice and <br />
                                manufacture box for
                                <br />
                                warranty purpose.
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <div class="mb-0">
                          <div class="row mt-4">
                            <div class="col-md-12">
                              <div class="table-responsive">
                                <table
                                  class="table table-bordered m-t-30 text-nowrap"
                                  style={{ tableLayout: "fixed" }}
                                >
                                  <thead>
                                    <tr>
                                      <th style={{ width: "30%" }}>Product</th>
                                      <th style={{ width: "25%" }}>
                                        Description
                                      </th>
                                      <th style={{ width: "5%" }}>Qty</th>
                                      <th style={{ width: "10%" }}>
                                        Gross
                                        <br />
                                        Amount
                                      </th>

                                      <th style={{ width: "10%" }}>
                                        Taxable <br />
                                        Value
                                      </th>
                                      <th style={{ width: "10%" }}>IGST</th>
                                      <th
                                        class="text-right"
                                        style={{ width: "10%" }}
                                      >
                                        Total
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.productDetail.map((obj, i) => (
                                      <tr>
                                        <td
                                          style={{ whiteSpace: "break-spaces" }}
                                        >
                                          <div>
                                            {obj.productName}
                                            <br />
                                            {obj.size != "NO" ? (
                                              <>({obj.size})</>
                                            ) : null}
                                            {obj.color != "NO" ? (
                                              <>({obj.color})</>
                                            ) : null}
                                          </div>
                                        </td>
                                        <td>
                                          Product SKU Code : {obj.skuCode}{" "}
                                          <br />
                                          Product Code : {obj.productCode}
                                          <br />
                                        </td>
                                        <td>{obj.qty}</td>

                                        <td>
                                          {parseInt(obj.productSellingPrice) -
                                            parseInt(obj.productGST)}
                                          <br />
                                          <br />
                                        </td>

                                        <td>
                                          {" "}
                                          {parseInt(obj.productSellingPrice)}
                                          <br />
                                        </td>
                                        <td>
                                          {" "}
                                          {parseInt(obj.productGST)}
                                          <br />
                                        </td>
                                        <td class="text-right">
                                          ₹
                                          {parseInt(obj.productSellingPrice) *
                                            parseInt(obj.qty)}
                                          <br />
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div
                              class=""
                              style={{ paddingRight: "20px", width: "100%" }}
                            >
                              <table class="table m-t-30 text-nowrap">
                                <tbody>
                                  <tr>
                                    <td width="">
                                      <p class="mt-3 font-weight-600">
                                        <b style={{ fontSize: "large" }}>
                                          Total Qty :{" "}
                                          {this.state.bookingArray.totalQty}{" "}
                                        </b>
                                      </p>
                                    </td>
                                    <td></td>
                                    <td>
                                      <p class="text-right mt-3 font-weight-600">
                                        Sub-total: ₹
                                        {parseInt(
                                          this.state.bookingArray
                                            .productSellingPrice
                                        )}
                                      </p>

                                      <h4 class="text-right text-xl">
                                        Grand Total : ₹
                                        {parseInt(
                                          this.state.bookingArray
                                            .productSellingPrice
                                        )}
                                      </h4>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td style={{ fontSize: "12px" }}>
                                      <b style={{ color: "black" }}>
                                        {" "}
                                        Registered Address{" "}
                                      </b>
                                      : HardwareChacha,
                                      <br />
                                      Panchwati Tower, Barbil Joda Highway,{" "}
                                      <br />
                                      Odisha,Barbil - 758035
                                      <br />
                                      Email:infohardwarechacha@gmail.com,
                                      Phone:(+91) 7682968868
                                      <br />
                                      <b>Declaration : </b>
                                      The goods sold are intended for end user
                                      consumption and not for resale.
                                      <br />
                                      **Conditions Apply. Please refer to the
                                      product page for more details
                                      <br />
                                      E.&amp; O.E
                                    </td>

                                    <td>
                                      <br />
                                      <br />
                                      <br />
                                      <center>
                                        Ordered Through: HardwareChacha
                                      </center>
                                    </td>

                                    <td class="text-right">
                                      <br />
                                      <br />
                                      <br />
                                      <br />

                                      <font
                                        size="2px"
                                        style={{ marginTop: "-5px" }}
                                      >
                                        {" "}
                                        Authorized Signature
                                      </font>
                                      <br />
                                      <font size="4px">
                                        {
                                          this.state.bookingArray
                                            .vendorCompanyName
                                        }
                                      </font>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <center>
              <ReactToPrint
                trigger={() => (
                  <a
                    href="javascript:void(0)"
                    className="btn btn-primary"
                    onClick={this.barcodePrint}
                  >
                    Print
                  </a>
                )}
                content={() => this.componentRef}
                documentTitle="Hardwarechacha Tax Invoice"
              />
            </center>
            <br />
            <br />
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    );
  }
}
