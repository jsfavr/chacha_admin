import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import { authget, authpost, post, formpost, get, formpostuplode } from '../../utils/service';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import * as CONSTANT from '../../utils/constant';
export default class addVideo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            videoName: '',
            video: '',
            videoCategory: '',
            thumbnail: '',
            videoDescription: '',
            feature: [],
            categoryArr: [],
            uploadPercentage: 0,
            uploadByte: 0,
            totalByte: 0,
            Loading: false





        }
        this.validator = new SimpleReactValidator();
    }
    componentDidMount() {
        document.title = 'Add Power Video : Admin Dashboard - Crowd';
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
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            Loading: true,
        })
        var data1 = [];
        var array = [];

        this.state.feature.map((feature, sidx) => {
            data1 = feature.feature
            if (String(array).length > 0) {
                array = array + '125458' + data1
            } else {
                array = data1
            }
        });

        if (this.validator.allValid()) {

            var fs = require('fs');

            var formdata = new FormData(e.target);
            formdata.append('feature', array);
            formdata.append('videoCategory', this.state.videoCategory);
            console.log([...formdata])

            const options = {
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    let percent = Math.floor((loaded * 100) / total)
                    console.log(`${loaded}kb of ${total}kb | ${percent}%`);

                    if (percent < 100) {
                        this.setState({ uploadPercentage: percent, uploadByte: loaded, totalByte: total })
                    }
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('hcbAdminToken')
                }
            }
            // formpostuplode('/ads/power/video/add/', formdata, options)
            axios.put(CONSTANT.URL + '/ads/power/video/add/', formdata, options)
                .then((data) => {
                    console.log(data);


                    toast.dark('Power Video Add Successfully.', {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(() => {
                        console.log('hhh')
                        this.props.history.push('/powerVideo')
                        this.setState({
                            Loading: false,
                        })
                    }, 2000);



                }).catch(function (error) {

                    console.log(error);
                });
        } else {
            this.setState({
                Loading: false,
            })
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }
    handleVideoChange = e => {
        e.preventDefault();

        if (e.target.files[0]['type'] == 'video/mp4') {
            if (e.target.files[0]['size'] < 5e+7) {
                this.setState({ [e.target.name]: e.target.files[0] });
                this.setState({ videoError: '' });
            } else {
                this.setState({ videoError: 'Video too large, Video must be in 50 MB' });
                return false;
            }

        } else {
            this.setState({ videoError: 'Select only MP4 video file.' });
            return false;
        }

    }
    handleShareholderFeatureChange = (idx) => (evt) => {
        const newShareholders = this.state.feature.map((feature, sidx) => {
            if (idx !== sidx) return feature;
            return { ...feature, feature: evt.target.value };
        });

        this.setState({ feature: newShareholders });
        //console.log(this.state.feature)
    };



    handleAddFeatureShareholder = () => {
        this.setState({ feature: this.state.feature.concat([{ feature: "" }]) });
    };

    handleRemoveFeatureShareholder = (idx) => () => {
        this.setState({ feature: this.state.feature.filter((s, sidx) => idx !== sidx) });
    };
    handleCategoryChange = (e) => {
        console.log(e.target.value)
        if (e.target.value != 0) {
            this.setState({
                videoCategory: e.target.value
            })
        } else {
            this.setState({
                videoCategory: ''
            })
        }
    }
    handleImageChange = (e) => {
        var formData = new FormData();
        var id = e.target.id
        var file = document.getElementById(id).files[0];
        formData.append("Filedata", file);
        var t = file.type.split('/').pop().toLowerCase();
        if (t != "jpeg" && t != "jpg" && t != "png" && t != "bmp" && t != "gif") {
            toast.error('Please Select an Image File', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            document.getElementById(id).value = '';
            return false;
        }
        if (file.size > 1024000) {
            toast.error('Image Size must be in 1MB.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            document.getElementById(id).value = '';
            return false;
        }
        this.setState({
            thumbnail: file
        })
        return true;
    }
    handleVideoChange = (e) => {
        var formData = new FormData();
        var id = e.target.id
        var file = document.getElementById(id).files[0];
        formData.append("Filedata", file);
        var t = file.type.split('/').pop().toLowerCase();
        if (t != "mp4") {
            toast.error('Please Select an MP4 Video File', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            document.getElementById(id).value = '';
            return false;
        }
        if (file.size > 102400000) {
            toast.error('Image Size must be in 100MB.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            document.getElementById(id).value = '';
            return false;
        }
        this.setState({
            video: file
        })
        return true;
    }
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Add Power Video</h3>
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
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Video Name</label>
                                                <input type="text" class="form-control" name="videoName" placeholder="Enter Video Name" style={{ margin: 0 }} onChange={this.handleChange} autoComplete="off" />
                                                <small id="" className="form-text text-muted">{this.validator.message('videoName', this.state.videoName, 'required', { className: 'text-danger' })}</small>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label">Choose Video</label><span style={{ fontSize: "12px" }}>(Dimension 1280 x 720)</span>
                                                <input type="file" class="form-control" name="video" placeholder="Name" id="video" style={{ margin: 0 }} onChange={this.handleVideoChange} accept="video/mp4" />
                                                <small id="" className="form-text text-muted">{this.validator.message('video', this.state.video, 'required', { className: 'text-danger' })}<span className='text-danger'>{this.state.videoError}</span></small>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Power Category</label>
                                                <select class="form-control" onChange={this.handleCategoryChange}>
                                                    <option value="0">Select Category</option>
                                                    {
                                                        this.state.categoryArr.map((obj, i) =>
                                                            <option value={obj.catID}>{obj.catName}</option>
                                                        )
                                                    }
                                                </select>
                                                <small id="" className="form-text text-muted">{this.validator.message('videoCategory', this.state.videoCategory, 'required', { className: 'text-danger' })}</small>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label">Choose Thumbnail</label><span style={{ fontSize: "12px" }}>(Dimension 1280 x 720)</span>
                                                <input type="file" class="form-control" name="thumbnail" placeholder="Name" id="image" style={{ margin: 0 }} onChange={this.handleImageChange} accept="image/*" />
                                                <small id="" className="form-text text-muted"><span>{this.validator.message('thumbnail', this.state.thumbnail, 'required', { className: 'text-danger' })}</span></small>
                                            </div>

                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group mb-0">
                                                <label class="form-label">Video Description</label><span style={{ fontSize: "12px" }}>(Maximum 500 words)</span>
                                                <textarea class="form-control" name="videoDescription" rows="4" placeholder="Enter Video Description" onChange={this.handleChange}></textarea>
                                                <small id="" className="form-text text-muted">{this.validator.message('videoDescription', this.state.videoDescription, 'required|min:100|max:500', { className: 'text-danger' })}</small>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <table className="table table-bordered" id="dynamic_field2">
                                                <tbody>
                                                    <tr>
                                                        <td align="center">
                                                            <h3 style={{ marginTop: 0 }}>
                                                                Video Key Point
                                                                            <span style={{ color: 'red' }}>*</span>
                                                            </h3>
                                                        </td>

                                                        <td><a style={{ color: "white" }} name="add2" id="add2" className="btn btn-primary  btn-sm" onClick={this.handleAddFeatureShareholder}>Add More</a></td>
                                                    </tr>

                                                    {this.state.feature.map((obj, idx) => (
                                                        <>
                                                            <tr key={idx}>
                                                                <td align="center">
                                                                    <input type="text" className="form-control" autoComplete="off" required name="feat[]" placeholder={`Key Point #${idx + 1}`} defaultValue={obj.feature} onChange={this.handleShareholderFeatureChange(idx)} />
                                                                </td>


                                                                <td><a style={{ color: "white" }} className="btn btn-danger" onClick={this.handleRemoveFeatureShareholder(idx)}>X</a></td>
                                                            </tr>

                                                        </>
                                                    ))}
                                                    <small id="" className="form-text text-muted">{this.validator.message('Key Point', this.state.feature, 'required', { className: 'text-danger' })}</small>
                                                </tbody>

                                            </table>
                                        </div>
                                        <div class="col-md-12">
                                            <br />{
                                                this.state.Loading ?
                                                    <center>{this.state.uploadByte} of {this.state.totalByte} | {this.state.uploadPercentage}%<br /></center>
                                                    : null
                                            }

                                            <center><button className="btn btn-primary" type="submit" style={{ width: "150px", paddingBottom: "32px" }} disabled={this.state.Loading}>{this.state.Loading == false ? <>Add Video</> : <>Loading...</>}</button></center>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }
}
