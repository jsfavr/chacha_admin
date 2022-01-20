import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {get} from '../../utils/service';
import { Chart } from "react-google-charts";

export default class Dashboard extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			topSelling:[],
			mostView:[],
			mostRatting:[],
			mostReview:[],
			total:[]
		}
	}
componentDidMount() {
		document.title = 'Admin Dashboard : Crowd';
		
		document.getElementById("global-loader").style.display = "block";
	 	setTimeout(()=>{
			document.getElementById("global-loader").style.display = "none";
		 },500)
			get("/other/AdminHome/")
			.then((response) => {
				this.setState({ 
					topSelling: response.data.topSelling, 
					mostRatting: response.data.mostRatting, 
					mostView: response.data.mostView, 
					mostReview: response.data.mostReview, 
					total: response.data.total, 


				
				
				});
			})
			.catch(function (error) {
				console.log(error);
			});
		
	
	  }
	render() {
		return (
			<>
			 
				<div className="page-header mt-0 p-3">
						<h3 className="mb-sm-0">Admin Dashboard</h3>
						

					</div>
					<div className="row finance-content">
						<div className="col-sm-6 col-lg-6 col-xl-3 ">
							<div className="card shadow text-center">
								<div className="card-body">
									<div className="text-center mx-auto server">
											<i className="fas fa-business-time  icon text-primary"></i>
									</div>
									<div className="text mt-2">
										<h1 className="mb-0">{this.state.topSelling.count}</h1>
										<h3 className="mb-0" style={{margin:0,fontSize: "initial"}}>{this.state.topSelling.name}</h3>
										<label className="text-muted">Top Selling Product</label>
									</div>
									<div className="options mt-3">
										<Link to="sellingProduct" className="btn btn-primary btn-sm"><i className="glyphicon glyphicon-search"></i> View Details</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-6 col-lg-6 col-xl-3 ">
							<div className="card shadow text-center">
								<div className="card-body">
									<div className="text-center mx-auto server">
											<i className="fas fa-star  icon text-primary"></i>
									</div>
									<div className="text mt-2">
										<h1 className="mb-0">{this.state.mostRatting.rate}</h1>
										<h3 className="mb-0" style={{margin:0,fontSize: "initial"}}>Average Ratting</h3>
										<label className="text-muted">Customer Retting and Review</label>
									</div>
									<div className="options mt-3">
										<Link to="review" className="btn btn-primary btn-sm"><i className="glyphicon glyphicon-search"></i> View Details</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-6 col-lg-6 col-xl-3 ">
							<div className="card shadow text-center">
								<div className="card-body">
									<div className="text-center mx-auto server">
											<i className="fas fa-eye icon text-primary"></i>
									</div>
									<div className="text mt-2">
										<h1 className="mb-0">{this.state.mostView.count}</h1>
										<h3 className="mb-0" style={{margin:0,fontSize: "initial"}}>{this.state.mostView.name}</h3>
										<label className="text-muted">Most Viewed Product</label>
									</div>
									<div className="options mt-3">
										<Link to="mostView" className="btn btn-primary btn-sm"><i className="glyphicon glyphicon-search"></i> View Details</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-6 col-lg-6 col-xl-3 ">
							<div className="card shadow text-center">
								<div className="card-body">
									<div className="text-center mx-auto server">
											<i className="fas fa-star icon text-primary"></i>
									</div>
									<div className="text mt-2">
										<h1 className="mb-0">{this.state.mostReview.count}</h1>
										<h3 className="mb-0" style={{margin:0,fontSize: "initial"}}>{this.state.mostView.name}</h3>
										<label className="text-muted">Most Ratted Product</label>
									</div>
									<div className="options mt-3">
									<Link to="mostReview" className="btn btn-primary btn-sm"><i className="glyphicon glyphicon-search"></i> View Details</Link>
									</div>
								</div>
							</div>
						</div>
						
					</div>
					<div className="row">
						<div className="col-xl-9">
							<div className="card  shadow">
								<div className="card-header bg-transparent">
									<div className="row align-items-center">
										<div className="col">
											<h6 className="text-uppercase text-light ls-1 mb-1">Overview</h6>
											<h2 className="mb-0">Monthly Net Profit</h2>
										</div>
									</div>
								</div>
								<div className="card-body" style={{height: "541px"}}>
									<div className={"my-pretty-chart-container chart-dropshadow h-315"}>
									<Chart
										// width={'100'}
										height={'500'}
										chartType="Line"
										loader={<div>Loading Chart</div>}
										data={[
											[
											{ type: 'date', label: 'Month' },
											'Total Sales',
											'Total Tex',
										
											],
											[new Date(2020, 0), -0.5, 5.7],
											[new Date(2020, 1), 0.4, 8.7],
											[new Date(2020, 2), 0.5, 12],
											[new Date(2020, 3), 2.9, 15.3],
											[new Date(2020, 4), 6.3, 18.6],
											[new Date(2020, 5), 9, 20.9],
											[new Date(2020, 6), 10.6, 19.8],
											[new Date(2020, 7), 10.3, 16.6],
											[new Date(2020, 8), 7.4, 13.3],
											[new Date(2020, 9), 4.4, 9.9],
											[new Date(2020, 10), 1.1, 6.6],
											[new Date(2020, 11), -0.2, 4.5],
											
										]}
										options={{
											chart: {
			
											},
											// width: 900,
											height: 500,
										
										}}
										rootProps={{ 'data-testid': '4' }}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-3">
							<div className="">
								<div className="">
									<div className="row">
										<div className="col-xl-12">
											<div className="card shadow bg-gradient-primary">
												<div className="card-body">
													<div className="widget text-center">
														<small className="text-white h3">Total Product</small>
														<h2 className="text-xxl text-white mb-0">{this.state.total.product}</h2>
													</div>
												</div>
											</div>
											<div className="card shadow bg-gradient-info">
												<div className="card-body">
													<div className="widget text-center">
														<small className="text-white h3">Total Vendor</small>
														<h2 className="text-xxl text-white mb-0">{this.state.total.vendor}</h2>
													</div>
												</div>
											</div>
											<div className="card shadow bg-gradient-success">
												<div className="card-body">
													<div className="widget text-center">
														<small className="text-white h3">Total Booking</small>
														<h2 className="text-xxl text-white mb-0">{this.state.total.booking}</h2>
													</div>
												</div>
											</div>
											<div className="card shadow bg-gradient-secondary">
												<div className="card-body">
													<div className="widget text-center">
														<small className="text-white h3">Total Subscriber</small>
														<h2 className="text-xxl text-white mb-0">{this.state.total.delivary}</h2>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				
					
			</>				
		)
	}
}
