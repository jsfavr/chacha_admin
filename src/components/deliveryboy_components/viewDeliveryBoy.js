import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment';
import { get, withoutauthpatch, withoutauthdelete, post } from '../../utils/service';
import ToastServive from 'react-material-toast';
const toast = ToastServive.new({
    place: 'topRight',
    duration: 2,
    maxCount: 8
});
export class viewDeliveryBoy extends Component {
    constructor(props) {
        super(props)

        this.state = {
            delivery_boy_details: []
        }
    }
    componentDidMount() {
        document.title = 'Delivery Boy : Admin Dashboard - Crowd';
        document.getElementById("global-loader").style.display = "block";
        setTimeout(() => {
            document.getElementById("global-loader").style.display = "none";
        }, 500)
        get('/userDetails/alldeliveryboy/')
            .then((res) => {

                this.setState({
                    delivery_boy_details: JSON.parse(res.data.deleiveryboy_details).sort((a, b) => (b > a ? 1 : -1))
                })
            }).catch((err) => {
                console.log(err)
            })
    }
    vendorstatusChange = (id, pra, number) => {
        if (pra == 0) {
            var sms = "Approval Canceled : Sorry!! your delivery boy approval is canceled. For more details contact to the admin. Any query visit https://crowdindia.co.in/contact.html";
        } else {
            var sms = "Profile Approved : Congratulation, we checked your profile and approve. Now you are a delivery boy of Crowd.";
        }
        const data = {
            status: pra
        }
        withoutauthpatch("/userDetails/user/" + id, data)
            .then((response) => {
                const data1 = {
                    msg: sms,
                    phone_no: number
                }
                post('/other/getsms/', data1)
                    .then(res => {

                    }).catch(err => {

                    })
                toast.success('Vendor Status Update Successfully');
                get('/userDetails/alldeliveryboy/')
                    .then((res) => {

                        this.setState({
                            delivery_boy_details: JSON.parse(res.data.deleiveryboy_details).sort((a, b) => (b > a ? 1 : -1))
                        })
                    }).catch((err) => {
                        console.log(err)
                    })

            })
            .catch(function (error) {
                console.log(error);
                toast.error('Sorry!! Vendor Status Update Unsuccessful');
            });
    }
    deliveryBoyDetails = () => {
        return this.state.delivery_boy_details.map((obj, i) => {
            return (
                <tr role="row" className="odd" key={i}>
                    <td className="sorting_1">{Moment(obj.fields.created_at).format('LLLL')}</td>
                    <td>{obj.fields.name}</td>
                    <td>{obj.fields.email}</td>
                    <td>{obj.fields.phone}</td>
                    <td>
                        {obj.fields.status == true ?
                            <a className="btn btn-icon btn-pill btn-success mt-1 mb-1 btn-sm text-white" onClick={() => this.vendorstatusChange(obj.pk, 0, obj.fields.phone)}>Active</a>
                            :
                            <a className="btn btn-icon btn-pill btn-danger  mt-1 mb-1 btn-sm text-white" onClick={() => this.vendorstatusChange(obj.pk, 1, obj.fields.phone)}>Inactive</a>
                        }

                    </td>
                    <td>
                        <Link className="btn btn-info mt-1 mb-1 btn-sm" to={"viewDetails?id=" + obj.pk}>View Details</Link>

                    </td>
                </tr>
            );
        })
    }
    render() {

        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Delivery Boy</h3>
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
                                <h2 className="mb-0">Delivery Boy</h2>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table id="example" className="table table-striped table-bordered w-100 text-nowrap">
                                        <thead>
                                            <tr role="row">
                                                <th className="wd-15p">
                                                    Registration <br />
                                                    Date
                                                </th>
                                                <th className="wd-15p">
                                                    Delivery Boy<br />
                                                    Name
                                                </th>
                                                <th className="wd-15p">
                                                    Delivery Boy<br />
                                                    Email
                                                </th>
                                                <th className="wd-15p">Contact No</th>

                                                <th className="wd-15p">
                                                    Approve <br />
                                                    Status
                                                </th>
                                                <th className="wd-15p">
                                                    View <br />
                                                    Details
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.deliveryBoyDetails()}

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

export default viewDeliveryBoy
