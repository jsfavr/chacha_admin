import React, { Component } from 'react'
import ToastServive from 'react-material-toast';
import { imageValid } from '../../utils/imageValid'
import ImageSelectPreview from 'react-image-select-pv';
import { authpost, formpost, formpostuplode, get } from '../../utils/service'
import LoadingProgress from 'react-js-loading-progress-bar';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import * as CONSTANT from '../../utils/constant';
const toast = ToastServive.new({
    place: 'topRight',
    duration: 2,
    maxCount: 8
});
export default class adsCreate extends Component {
    constructor(props) {
        super(props)
        let url = this.props.location.search;

        this.state = {
            Loading: false,
            playlist: [],
            episode: [],
            filterEpisode: [],
            episode_id: '',
            playlist_id: '',
            videoLength: '',
            videoError: '',
            video: [],
            uploadPercentage: 0,
            uploadByte: 0,
            totalByte: 0,
            CompanyName: '',
            domainName: '',
            redirectURL: '',
            companyShortDescriptions: '',
            companyLogo: null,
            videos: null,
            videoPlan: [],




        }
        this.validator = new SimpleReactValidator();
    }
    componentDidMount() {
        document.title = 'Create Video ADS - VESDOC';
    }


    handleContantChange = (e) => {
        e.preventDefault();
        if (e.target.files.length > 0) {
            if (e.target.files[0]['type'] == 'video/mp4') {
                //  if(e.target.files[0]['size']<5e+7){
                this.setState({ [e.target.name]: e.target.files[0] });
                this.setState({ videoError: '' });
                //  }else{
                //     this.setState({videoError:'Video too large, Video must be in 50 MB'});
                //     return false;
                // }

            } else {
                this.setState({ videoError: 'Select only MP4 video file.' });
                return false;
            }
        }
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }
    onFile1Change = (event) => {
        // imageValid(event);
        console.log(event.target.files[0])
        this.setState({
            videos: event.target.files[0],
        });
    };
    onFile2Change = (event) => {
        // imageValid(event);
        console.log(event[0]['blob'])
        this.setState({
            companyLogo: event[0]['blob'],
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        // var formdata = new FormData(e.target);
        // formdata.append('companyLogo', this.state.banner);
        this.setState({
            Loading: true,
        })
        if (this.validator.allValid()) {
            const fd = new FormData();
            fd.append("CompanyName", this.state.CompanyName);
            fd.append("companyLogo", this.state.companyLogo);
            fd.append("companyShortDescriptions", this.state.companyShortDescriptions);
            fd.append("domainName", this.state.domainName);
            fd.append("redirectURL", this.state.redirectURL);
            fd.append("video", this.state.videos);
            console.log(...fd)
            // formdata.append('video', this.state.videoLength);

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
                    'Authorization': 'Bearer ' + localStorage.getItem('hcbAdminToken'),

                }
            }

            // axios.post(CONSTANT.URL+"/video/addvideo/", formdata, options)

            console.log(...fd)
            axios.put(CONSTANT.URL + '/ads/video/add/', fd, options)
                .then((data) => {
                    console.log(data);
                    if (data.data.msg == "Video Ads add Successfully") {
                        this.setState({
                            Loading: false,
                        })
                        this.props.history.push(`/ads`)
                        toast.success('ADS Successfully Created.');

                    } else {
                        this.setState({
                            Loading: false,
                        })
                        toast.error(data.data.msg);
                    }

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
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0">Create Short Video</h3>
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
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="card-body row" style={{ paddingBottom: 0 }}>

                                        <div className="col-xl-6 row" style={{ padding: "16px 16px 16px 16px" }}>
                                            <div className="form-group col-md-12">
                                                <label htmlFor="">Video Title</label>
                                                <input type="text" className="form-control" name="companyShortDescriptions" onChange={this.handleChange} value={this.state.companyShortDescriptions} placeholder="Enter ADS Title" />
                                                <small id="" className="form-text text-muted">{this.validator.message('companyShortDescriptions', this.state.companyShortDescriptions, 'required', { className: 'text-danger' })}</small>
                                            </div>
                                            {/* <div className="form-group col-md-12">
                                                <label htmlFor="">Company Name</label>
                                                <input type="text" className="form-control" name="CompanyName" onChange={this.handleChange} value={this.state.CompanyName} placeholder="Enter name of the company" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                <small id="" className="form-text text-muted">Please Enter the company name(Example : Crowd)<br />{this.validator.message('CompanyName', this.state.CompanyName, 'required', { className: 'text-danger' })}</small>
                                            </div> */}


                                            {/* <div className="form-group col-md-12">
                                                <label htmlFor="">Domain Name</label>
                                                <input type="text" className="form-control" name="domainName" onChange={this.handleChange} value={this.state.domainName} placeholder="Enter Domain Name" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                <small id="" className="form-text text-muted">Please Enter Domain Name(Example : crowdindia.co.in)<br />{this.validator.message('domainName', this.state.domainName, 'required', { className: 'text-danger' })}</small>
                                            </div> */}
                                            <div className="form-group col-md-12">
                                                <label htmlFor="">Video</label>
                                                <input type="file" className="form-control" name="videos" onChange={this.onFile1Change} accept="video/mp4" />
                                                <small id="" className="form-text text-muted">Please select short MP4 Video. <br />{this.validator.message('videos  ', this.state.videos, 'required', { className: 'text-danger' })}<span className='text-danger'>{this.state.videoError}</span></small>
                                            </div>
                                            {/* <div className="form-group col-md-12">
                                                            <label htmlFor="">ADS Duration</label>
                                                            <input type="text" className="form-control" name="videoLength" onChange={this.handleChange} value={this.state.videoLength}  placeholder="Enter ADS Duration" id="exampleInputEmail1" aria-describedby="emailHelp"  />
                                                            <small id="" className="form-text text-muted">Please Enter Original ads Duration (Example-00:15)<br/>{this.validator.message('videoLength', this.state.videoLength, 'required',{ className: 'text-danger' })}</small>
                                                        </div> */}

                                        </div>
                                        <div className="col-xl-6 row" style={{ padding: "16px 16px 16px 16px" }}>

                                            {/* <div className="form-group col-md-12">
                                                <label htmlFor="">Redirect URL</label>
                                                <input type="url" className="form-control" name="redirectURL" onChange={this.handleChange} value={this.state.redirectURL} placeholder="Enter ADS Redirect URL" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                <small id="" className="form-text text-muted">Please Enter ADS Redirect URL (Example : https://crowdindia.co.in/ads)<br />{this.validator.message('redirectURL', this.state.redirectURL, 'required', { className: 'text-danger' })}</small>
                                            </div> */}

                                            <div className="form-group col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Video Thumbnail</label>
                                                    <ImageSelectPreview
                                                        max={1}
                                                        imageTypes="png|jpg|jpeg"
                                                        maxImageSize={1000000}
                                                        onChange={(data) => this.onFile2Change(data)}
                                                    />
                                                    <small id="" className="form-text text-muted">Select Only One Image. Maximum image size 1MB. Dimension 1280 X 720.<br /><span>{this.validator.message('companyLogo', this.state.companyLogo, 'required', { className: 'text-danger' })}</span></small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12" style={{ padding: "0px 16px 16px 20px" }}>
                                        {
                                            this.state.uploadByte > 0 ?
                                                <>
                                                    <center>
                                                        <b>{`${(this.state.uploadByte / 2098548).toFixed(2)} MB of ${(this.state.totalByte / 2098548).toFixed(2)} MB`}</b>
                                                        <LoadingProgress

                                                            active={true}
                                                            total={100}
                                                            current={this.state.uploadPercentage}
                                                            hideTimeRemaining
                                                        /></center>
                                                </>
                                                : null
                                        }



                                        <button type="submit" className="btn btn-primary" style={{ float: "right" }} disabled={this.state.Loading}>{this.state.Loading ? 'Loading...' : 'Create'}</button>
                                    </div>




                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
