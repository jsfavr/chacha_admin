import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { authpost, DELETE, patch } from '../../utils/service'
import ReactPaginate from 'react-paginate';
import Moment from 'moment-js';
export default class ads extends Component {
    constructor(props) {
        super(props)
        document.title = 'ADS : Admin Dashboard - HardwareChacha';
        this.state = {
            content: [],
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 50,
            currentPage: 0,
            playingAds: 0
        }
    }
    componentDidMount() {
        this.getData()
    }
    getData = () => {
        authpost("/ads/video/adminViews/")
            .then((response) => {
                console.log(response.data)
                this.setState({
                    playingAds: response.data.filter(item => item.status == 1).length
                })
                var slice = response.data.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(response.data.length / this.state.perPage),
                    content: response.data,
                    orgtableData: response.data,
                    tableData: slice
                })

            })
            .catch(function (error) {
                console.log(error);

            });
    }
    statusChange = (status, id) => {
        const data = {
            status: status
        }
        patch("/ads/video/" + id, data)
            .then((response) => {
                console.log(response.data)
                this.getData()
            })
            .catch(function (error) {
                console.log(error);

            });
    }
    handleDelete = (id) => {
        DELETE("/ads/video/" + id)
            .then((response) => {
                console.log(response.data)
                this.getData()
            })
            .catch(function (error) {
                console.log(error);

            });
    }
    filter = (e) => {
        console.log(e.target.value)
        var status = e.target.value
        if (status == 5) {
            this.setState({
                tableData: this.state.content.slice(this.state.offset, this.state.offset + this.state.perPage),
                pagination: true

            })
        } else {
            this.setState({
                tableData: this.state.content.filter(item => item.status == status),
                pagination: false

            })
        }

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

    };
    loadMoreData() {
        const data = this.state.orgtableData;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            tableData: slice
        })

    }
    render() {
        return (
            <div>
                <div className="page-header mt-0 p-3">
                    <h3 className="mb-sm-0"> {

                        this.state.content.length != 0 ? <Link to="/adsCreate" className="btn btn-primary btn-sm" style={{ float: "right" }}>+ Create Short Video</Link> : <>Short Video Dashboard</>
                    }</h3>
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
                                <div className="card">
                                    <div className="card-body">

                                        {
                                            this.state.content.length == 0 ?


                                                <div style={{ padding: "10vh 0px" }}>
                                                    <center>
                                                        {/* <img src="/icon/Video-Production-icon.png" style={{height:"150px"}}/><br/> */}
                                                            No Video ADS Uploaded<br /><Link to="/adsCreate" className="btn btn-primary" style={{ marginTop: "15px" }}>Create Ads</Link></center>
                                                </div>

                                                :
                                                <><table id="basic-datatable" className="table dt-responsive nowrap">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: "10%" }}>Date</th>
                                                            <th style={{ width: "7%" }}>Video</th>
                                                            <th style={{ width: "8%" }}>Thumbnail</th>
                                                            {/* <th style={{ width: "25%" }}>Company Details</th> */}
                                                            {/* <th style={{width:"20%"}}>Plan Details</th>
                                                                    <th style={{width:"15%"}}>Payment Details</th>
                                                                    <th style={{width:"5%"}}>Views</th> */}
                                                            <th style={{ width: "10%" }}>Action</th>


                                                        </tr>
                                                    </thead>

                                                    <tbody>

                                                        {
                                                            this.state.tableData.map((obj, i) =>
                                                                <tr key={i}>
                                                                    <td>{Moment(obj.created_at).format("f")}</td>
                                                                    <td>
                                                                        <a href={process.env.REACT_APP_DEV_URL + obj.video} target='_blank'><img style={{ width: "40px" }} src="data:image/png;base64,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 " alt={this.src = "/icon/no_thumbnail-vfl4t3-4R.jpg"} title={obj.companyName} /></a>
                                                                    </td>
                                                                    <td>
                                                                        <a href={process.env.REACT_APP_DEV_URL + obj.companyLogo} target='_blank'><img src={process.env.REACT_APP_DEV_URL + obj.companyLogo} style={{ width: "80px", border: "solid 1px #a9b0b6" }} alt={this.src = "/icon/no_thumbnail-vfl4t3-4R.jpg"} title={obj.companyName} /></a>
                                                                    </td>
                                                                    {/* <td>
                                                                        <div style={{ padding: "0 10px" }}>
                                                                            <h5 style={{ margin: 0 }}>{obj.companyName}</h5>
                                                                            {obj.companyShortDescriptions}<br />
                                                                            <b>Domain : </b><a href={"https://." + obj.domainName} target="_blank">{obj.domainName}</a><br />
                                                                            <b>Redirect URL : </b><a href={obj.redirectURL} target="_blank">{obj.redirectURL}</a>
                                                                        </div>
                                                                    </td> */}
                                                                    {/* <td>{obj.planTitle}({obj.planPrice} rupees for {obj.planView} views)</td>
                                                                                <td><b>Payable Amount : {obj.payableAmount}</b><br/><span  style={{fontSize:"12px"}}><b>Trans ID : {obj.transID}</b></span></td>
                                                                                <td>{obj.views}</td> */}
                                                                    <td>
                                                                        {
                                                                            obj.status == 0 ?
                                                                                <><span style={{ fontSize: "17px", fontWeight: "700", color: "#FF8E15" }}>Pending...</span>
                                                                                    <br /><button className="btn btn-sm btn-success" onClick={() => this.statusChange(1, obj.id)}>Approve</button>
                                                                                    <button className="btn btn-sm btn-danger" onClick={() => this.statusChange(3, obj.id)}>Disapprove</button>
                                                                                </>
                                                                                : obj.status == 1 ?
                                                                                    <>
                                                                                        <span style={{ fontSize: "17px", fontWeight: "700", color: "#ACB334" }}>Playing...</span>
                                                                                        {
                                                                                            this.state.playingAds > 1 ?
                                                                                                <><br /><button className="btn btn-sm btn-primary" onClick={() => this.statusChange(4, obj.id)}>Stopped</button></>

                                                                                                : null
                                                                                        }

                                                                                    </>
                                                                                    : obj.status == 2 ?
                                                                                        <><span style={{ fontSize: "17px", fontWeight: "700", color: "#69B34C" }}>Completed</span>
                                                                                            <br />
                                                                                            <button className="btn btn-sm btn-success" onClick={() => this.statusChange(1, obj.id)}>Play</button></>
                                                                                        : obj.status == 3 ?
                                                                                            <span style={{ fontSize: "17px", fontWeight: "700", color: "#FF4E11" }}>Disapprove</span>
                                                                                            : obj.status == 4 ?
                                                                                                <><span style={{ fontSize: "17px", fontWeight: "700", color: "#FF0D0D" }}>Stopped</span>
                                                                                                    <br />
                                                                                                    <button className="btn btn-sm btn-success" onClick={() => this.statusChange(1, obj.id)}>Play</button></>
                                                                                                : null
                                                                        }
                                                                        <button className="btn btn-sm btn-danger" onClick={() => this.handleDelete(obj.id)}>Delete</button>

                                                                    </td>
                                                                </tr>
                                                            )
                                                        }





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
                                                </>

                                        }
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
