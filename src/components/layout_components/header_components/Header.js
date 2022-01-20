import React, { Component } from 'react'
import { checkAuth } from '../../../utils/auth';
export default class Header extends Component {

	signout = () => {
		checkAuth.signout();
		localStorage.removeItem('hcbAdminToken');
		window.location.href = '/login';
	}
	render() {
		return (
			<>
				<nav className="navbar navbar-top  navbar-expand-md navbar-dark" id="navbar-main">
					<div className="container-fluid">
						<a aria-label="Hide Sidebar" className="app-sidebar__toggle" data-toggle="sidebar" href="#"></a>

						<a className="navbar-brand pt-0 d-md-none" href="">
							<img src="../admin_assets/img/brand/logo-dark.png" className="navbar-brand-img" alt="..." />
						</a>


						<ul className="navbar-nav align-items-center ">
							<li className="nav-item dropdown">
								<a aria-expanded="false" aria-haspopup="true" className="nav-link pr-md-0 mr-md-2 pl-1" data-toggle="dropdown" href="#" role="button">
									<div className="media align-items-center">
										<span className="avatar avatar-sm rounded-circle"><img alt="Image placeholder" src="http://simpleicon.com/wp-content/uploads/user1.svg" /></span>

									</div>
								</a>
								<div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
									<div className=" dropdown-header noti-title text-center border-bottom pb-3">
										<h4 className="text-dark mb-2"> {localStorage.getItem('hcbAdminEmail')} </h4>
										<h6 className="text-overflow m-0">Administrator<br />HCB Enterprise</h6>
									</div>



									<a className="dropdown-item" href="javascript:void(0)" onClick={this.signout}><i className="ni ni-user-run"></i> <span>Logout</span></a>



								</div>

							</li>
							<li className="nav-item dropdown">

							</li>
							<li className="nav-item d-none d-md-flex">
								<div className="dropdown d-none d-md-flex mt-2 ">
									<a className="nav-link full-screen-link  pr-0"><i className="fe fe-maximize-2 floating " id="fullscreen-button"></i></a>
								</div>
							</li>

						</ul>
					</div>
				</nav>
			</>
		)
	}
}
