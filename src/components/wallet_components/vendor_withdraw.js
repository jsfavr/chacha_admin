import React, { Component } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { get, DELETE, patch, post, withoutauthpatch } from '../../utils/service';
import * as CONSTANT from '../../utils/constant'
import ToastServive from 'react-material-toast';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'react-responsive-modal';
export default class vendor_withdraw extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      transID: '',
      modalStatus: false,
      userID: 0

    }
  }
  componentDidMount() {
    this.getData()
    document.title = 'Vendor Wallet : Admin Dashboard - Crowd';
    document.getElementById("global-loader").style.display = "block";
    setTimeout(() => {
      document.getElementById("global-loader").style.display = "none";
    }, 500)
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  getData() {
    get('/wallet/vendorwithdraw/')
      .then((res) => {
        console.log(res)
        if (res.status == 200) {
          this.setState({
            data: res.data
          })
        } else {
          this.setState({
            data: []
          })
        }

      }).catch((err) => {
        console.log(err)

      })
  }
  onCloseModal = () => {
    this.setState({
      modalStatus: false
    })
  }
  onOpenModal = (id) => {
    this.setState({
      transID: '',
      modalStatus: true,
      userID: id
    })
  }
  handleClick = () => {
    const data1 = {
      "transID": this.state.transID,
      "withdraw_id": this.state.userID,
    }
    if (String(this.state.transID).length > 5) {
      post('/wallet/vendorpayment/', data1)
        .then((res) => {
          console.log(res)
          toast.dark(res.data.status, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.getData()
        }).catch((err) => {
          console.log(err)
        })

    } else {
      toast.dark('Please Enter Transaction ID', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }
  handleCancelClick = (id) => {
    const data1 = {
      "withdraw_id": id,
    }
    post('/wallet/vendorPaymentCancel/', data1)
      .then((res) => {
        console.log(res)
        toast.dark(res.data.status, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.getData()

      }).catch((err) => {
        console.log(err)
      })

  }


  userDetails = () => {
    return this.state.data.map((obj, i) => {
      return (
        <tr>
          <td>Name : {obj.vendorName}<br />
                Email : {obj.email}<br />
                Phone : {obj.phone}</td>
          <td>{obj.walletAmount}</td>
          <td>
            Bank Name : {obj.bank}<br />
                    Branch Name : {obj.branch}<br />
                    Account Holder Name : {obj.name}<br />
                    Account Number : {obj.account}<br />
                    IFSC Code : {obj.ifsc}<br />
                    UPI ID : {obj.upi}<br />
          </td>
          <td>{obj.withdrawAmount}</td>
          <td>
            {
              obj.status == 0 ?
                <>
                  <a className="btn btn-sm btn-success" style={{ color: "white" }} onClick={() => this.onOpenModal(obj.id)}>Complete</a>
                  <a className="btn btn-sm btn-danger" style={{ color: "white" }} onClick={() => this.handleCancelClick(obj.id)}>Cancel</a>
                </>
                : obj.status == 1 ?
                  <><b style={{ color: "green", fontSize: "16px" }}>Payment Successful</b><br />
                  Transaction ID : <b>{obj.transID}</b>

                  </>

                  : <b style={{ color: "red", fontSize: "16px" }}>Payment Canceled</b>

            }

          </td>
        </tr>
      );
    })
  }
  render() {
    return (
      <div>
        <div className="page-header mt-0  p-3">
          <h3 className="mb-sm-0">Withdrawal Request</h3>
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
          <div className="col-md-12">
            <div className="card shadow">
              <div className="card-header">
                <h2 className="mb-0">Withdrawal Request</h2>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="example"
                    className="table table-striped table-bordered w-100 text-nowrap"
                  >
                    <thead>
                      <tr>
                        <th className="wd-15p">Vendor Details</th>

                        <th className="wd-15p">Current <br />Wallet <br />Balance</th>
                        <th className="wd-15p">Bank <br />Details</th>
                        <th className="wd-15p">Withdrawal <br />Request <br />Balance</th>
                        <th className="wd-10p">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.userDetails()}
                    </tbody>
                  </table>

                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal open={this.state.modalStatus} onClose={this.onCloseModal} center>
          <div style={{ width: "250px" }}>
            <h2>Enter Referrer Code</h2>
            <hr style={{ margin: "10px" }} />
            <input type="text" name="transID" className="form-control " value={this.state.transID} onChange={this.handleChange} placeholder='Enter Transaction ID' style={{ borderColor: "black" }} /><br />
            <span style={{ fontSize: "12px", color: "red" }}>{this.referError}</span>
            <button className="btn btn-primary btn-sm" onClick={this.handleClick} style={{ float: "right" }}>Save</button>
          </div>
        </Modal>
        <ToastContainer />
      </div>
    );
  }
}
