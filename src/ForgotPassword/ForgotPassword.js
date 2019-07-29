import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../Actions';
import BeforeLoginNav from '../BeforeLoginNav';

export default class ForgotPassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}
	handleSubmit(e) {
		e.preventDefault();

		const { email } = this.state;
		if (email) {
			userActions.forgotpassword(email);
		}
	}
	render() {
		const { email } = this.state;
		return (
			<div>
				<div className="col-md-6 col-md-offset-3">
					<h2>Reset Your Password</h2>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								type="text"
								className="form-control"
								name="email"
								value={email}
								onChange={this.handleChange}
							/>
						</div>
						<div>
							<button className="btn btn-primary">
								SendMail <i className="fa fa-send"></i>
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
