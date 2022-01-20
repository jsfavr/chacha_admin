import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DELETE, get, patch, post } from '../../utils/service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
export default class videoCategory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categoryArr: [],
            id: 0,
            name: '',
            modalStatus: false,
        }
    }
    componentDidMount() {
        document.title = 'Power Video Category : Admin Dashboard - Crowd';
        this.getData()
    }
    getData = () => {
        get("/ads/power/category/get/")
            .then((response) => {
                this.setState({
                    categoryArr: response.data
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
    openModal = (id, name) => {
        this.setState({
            modalStatus: true
        })
        if (id != 0) {
            this.setState({ id: id, name: name })
        } else {
            this.setState({ id: 0, name: '' })
        }
    }
    handleModalSubmit = () => {
        console.log(this.state.name)
        if (String(this.state.name).length > 1) {
            if (this.state.id == 0) {
                const data = {
                    'name': this.state.name
                }
                post("/ads/power/video/category/", data)
                    .then((response) => {
                        toast.dark('Power Category add successfully.', {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        this.setState({
                            modalStatus: false
                        })
                        this.getData()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                const data = {
                    'name': this.state.name
                }
                patch("/ads/power/video/category/" + this.state.id, data)
                    .then((response) => {
                        toast.dark('Power Category update successfully.', {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        this.setState({
                            modalStatus: false
                        })
                        this.getData()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

        } else {
            toast.error('Please Enter Category Name.', {
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
    handleStatusChange = (id, status) => {
        const data = {
            'status': status
        }
        patch("/ads/power/video/category/" + id, data)
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
        DELETE("/ads/power/video/category/" + id)
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
                    <h3 className="mb-sm-0">Power Video Category</h3>
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
                                <h2 className="mb-0">All Category<button className="btn btn-primary btn-sm" style={{ float: "right" }} onClick={() => this.openModal(0, '')}>+ Add New Category</button></h2>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table
                                        id="example"
                                        className="table table-striped table-bordered w-100 text-nowrap"
                                    >
                                        <thead>
                                            <tr>
                                                <th className="wd-15p">Category Name</th>
                                                <th className="wd-15p">Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.categoryArr.length > 0 ?
                                                    <>
                                                        {

                                                            this.state.categoryArr.map((object, i) => (
                                                                <tr key={i}>
                                                                    <td>{object.catName}</td>
                                                                    <td>
                                                                        {
                                                                            object.catStatus ?
                                                                                <button className="btn btn-info btn-sm" onClick={() => this.handleStatusChange(object.catID, 0)}>Active</button>
                                                                                : <button className="btn btn-danger btn-sm" onClick={() => this.handleStatusChange(object.catID, 1)}>Non-Active</button>
                                                                        }
                                                                        <button className="btn btn-primary btn-sm" onClick={() => this.openModal(object.catID, object.catName)}>Edit</button>
                                                                        {
                                                                            object.hasChild == false ?
                                                                                <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(object.catID)}>Delete</button>
                                                                                : null
                                                                        }
                                                                    </td>

                                                                </tr>
                                                            ))
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        <tr>
                                                            <td colSpan="2"><center><h3>No Category Found</h3></center></td>
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
                    <div style={{ width: "250px" }}>
                        <h2>Enter Category Name</h2>
                        <hr style={{ margin: "10px" }} />
                        <input type="text" name="name" className="form-control " autoComplete="off" value={this.state.name} onChange={this.handleChange} placeholder='Enter Category Name' style={{ borderColor: "black" }} /><br />
                        <span style={{ fontSize: "12px", color: "red" }}>{this.referError}</span>
                        <button className="btn btn-primary btn-sm" onClick={this.handleModalSubmit} style={{ float: "right" }}>Save</button>
                    </div>
                </Modal>
                <ToastContainer />
            </div>
        )
    }
}
