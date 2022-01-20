import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DELETE, get, patch, post } from '../../utils/service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { FaPlay } from "react-icons/fa";
import { ImImage } from "react-icons/im";

export default class powerVideo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            videoArr: [],
            id: 0,
            name: '',
            modalStatus: false,
            detailsArr: [],
            feaArr: [],

        }
    }
    componentDidMount() {
        document.title = 'Power Video : Admin Dashboard - Crowd';
        this.getData()
    }
    getData = () => {
        get("/ads/power/video/get/")
            .then((response) => {
                this.setState({
                    videoArr: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }
    onCloseModal = () => {
        this.setState({
            modalStatus: false,
            id: 0,
            name: ''
        })
    }
    openModal = (id) => {
        get("/ads/power/video/get/" + id)
            .then((response) => {
                this.setState({
                    modalStatus: true,
                    detailsArr: response.data,
                    feaArr: response.data.features
                })
            })
            .catch(function (error) {
                console.log(error);
            });

        if (id != 0) {
            this.setState({ id: id })
        } else {
            this.setState({ id: 0 })
        }
    }
    // handleModalSubmit = () => {
    //     console.log(this.state.name)
    //     if (String(this.state.name).length > 1) {
    //         if (this.state.id == 0) {
    //             const data = {
    //                 'name': this.state.name
    //             }
    //             post("/ads/power/video/category/", data)
    //                 .then((response) => {
    //                     toast.dark('Power Category add successfully.', {
    //                         position: "bottom-center",
    //                         autoClose: 5000,
    //                         hideProgressBar: false,
    //                         closeOnClick: true,
    //                         pauseOnHover: true,
    //                         draggable: true,
    //                         progress: undefined,
    //                     });
    //                     this.setState({
    //                         modalStatus: false
    //                     })
    //                     this.getData()
    //                 })
    //                 .catch(function (error) {
    //                     console.log(error);
    //                 });
    //         } else {
    //             const data = {
    //                 'name': this.state.name
    //             }
    //             patch("/ads/power/video/category/" + this.state.id, data)
    //                 .then((response) => {
    //                     toast.dark('Power Category update successfully.', {
    //                         position: "bottom-center",
    //                         autoClose: 5000,
    //                         hideProgressBar: false,
    //                         closeOnClick: true,
    //                         pauseOnHover: true,
    //                         draggable: true,
    //                         progress: undefined,
    //                     });
    //                     this.setState({
    //                         modalStatus: false
    //                     })
    //                     this.getData()
    //                 })
    //                 .catch(function (error) {
    //                     console.log(error);
    //                 });
    //         }

    //     } else {
    //         toast.error('Please Enter Category Name.', {
    //             position: "bottom-center",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //         });
    //     }
    // }
    handleStatusChange = (id, status) => {
        const data = {
            'status': status
        }
        patch("/ads/power/video/" + id, data)
            .then((response) => {
                toast.dark('Status update successfully.', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                this.getData()
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    handleDelete = (id) => {
        DELETE("/ads/power/video/" + id)
            .then((response) => {
                toast.dark('Power Category Delete successfully.', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                this.getData()
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Power Video</h3>
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <a href="/"><i className="fe fe-home"></i></a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Admin Dashboard</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow">
                            <div className="card-header">
                                <h2 className="mb-0">All Videos<Link to='/addVideo' className="btn btn-primary btn-sm" style={{ float: "right" }}>+ Add New Video</Link></h2>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table
                                        id="example"
                                        className="table table-striped table-bordered w-100 text-nowrap"
                                    >
                                        <thead>
                                            <tr>
                                                <th className="wd-15p">Video Name</th>
                                                <th className="wd-15p">Video Category</th>
                                                <th className="wd-15p">Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.videoArr.length > 0 ?
                                                    <>
                                                        {

                                                            this.state.videoArr.map((object, i) => (
                                                                <tr key={i}>
                                                                    <td>{object.name}</td>
                                                                    <td>{object.videoCategory}</td>
                                                                    <td>
                                                                        {
                                                                            object.status ?
                                                                                <button className="btn btn-info btn-sm" onClick={() => this.handleStatusChange(object.videoID, 0)}>Active</button>
                                                                                : <button className="btn btn-danger btn-sm" onClick={() => this.handleStatusChange(object.videoID, 1)}>Non-Active</button>
                                                                        }
                                                                        {/* <button className="btn btn-primary btn-sm" onClick={() => this.openModal(object.videoID)}>Edit</button> */}
                                                                        <button className="btn btn-primary btn-sm" onClick={() => this.openModal(object.videoID)}>View Details</button>
                                                                        <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(object.videoID)}>Delete</button>

                                                                    </td>

                                                                </tr>
                                                            ))
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        <tr>
                                                            <td colSpan="3"><center><h3>No Video Found</h3></center></td>
                                                        </tr>
                                                    </>
                                            }
                                            {/* {

                                                this.state.category.map((object, i) => (
                                                    <tr key={i}>
                                                        <td>{object.cat_name}</td>
                                                        <td><a target="_blank" href={object.cat_icon}><img src={object.cat_icon} style={{ height: "50px" }} /></a></td>
                                                        <td><Link to={"subCategory?id=" + object.id} type="button" className="btn btn-icon btn-pill btn-primary mt-1 mb-1 btn-sm">View Sub Category</Link></td>
                                                        <td><Link to={"updateCategory?id=" + object.id} type="button" className="btn btn-icon btn-pill btn-info mt-1 mb-1 btn-sm">Update</Link>
                                                            <button type="button" onClick={() => this.deleteCategory(object.id)} className="btn btn-icon btn-pill btn-danger mt-1 mb-1 btn-sm">Delete</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            } */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <Modal open={this.state.modalStatus} onClose={this.onCloseModal} center closeOnEsc={false} closeOnOverlayClick={false}>
                    <div class="card-body" style={{ width: "780px" }}>
                        <h3>{this.state.detailsArr.name}</h3><br />
                        Category Name : {this.state.detailsArr.videoCategory}<br />
                        <br /><b>Description</b><br />{this.state.detailsArr.videoDescription}<br />
                        <br />
                        <div className="row">
                            <div style={{ width: "70%" }}>
                                <b>Key Point</b><br />
                                <ul>
                                    {
                                        this.state.feaArr.map((obj, i) =>

                                            <li>{obj.name}</li>

                                        )
                                    }
                                </ul>
                            </div>
                            <div style={{ width: "30%", float: "right" }}>
                                <br />
                                <table style={{ width: "100%" }}>
                                    <tr>
                                        <td style={{ width: "50%", textAlign: "center" }}>
                                            <span style={{ fontSize: "12px" }}>
                                                <a target="_blank" href={process.env.REACT_APP_DEV_URL + "/NWxctXUSLz1Gg/" + this.state.detailsArr.video} style={{ fontSize: "30px" }}><FaPlay /></a><br />
                                                <b>Watch Video</b>

                                            </span>
                                        </td>
                                        <td style={{ width: "50%", textAlign: "center" }}>
                                            <span style={{ fontSize: "12px" }}>
                                                <a target="_blank" href={process.env.REACT_APP_DEV_URL + "/NWxctXUSLz1Gg/" + this.state.detailsArr.thumbnail} style={{ fontSize: "30px" }}><ImImage /></a><br />
                                                <b>Watch Thumbnail</b>

                                            </span>
                                        </td>
                                    </tr>
                                </table>

                            </div>
                        </div>


                    </div>

                </Modal>

                <ToastContainer />
            </div>
        )
    }
}
