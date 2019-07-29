import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../Actions';
import AfterLoginNav from '../AfterLoginNav';

export default class UserManagement extends Component {
	render() {
		return (
			<div className="col text-center">
				<h2> User Management </h2>
				<ul>
					<li>
						<h3>
							<Link to="/filterusers">FilterUsers </Link>
						</h3>
					</li>
					<li>
						<h3>
							<Link to="/createuser"> Create User </Link>
						</h3>
					</li>
				</ul>
			</div>
		);
	}
}
