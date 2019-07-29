import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../Actions';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            newpassword: '',
            confirmpassword: ''
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
        const { email, newpassword, confirmpassword } = this.state;
        var query = this.props.location.search;
        var pieces = query.split('=');
        var token = pieces[1];
        if (email) {
            userActions.resetpassword(email, newpassword, confirmpassword,token);
        }
    }
    render() {
        const { email, newpassword, confirmpassword } = this.state;
        return (
            <div>
                <div className="col text-center" style={{ padding: '0px 150px 0px 150px' }}>
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
                        <div className="form-group">
                            <label htmlFor="newpassword">New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="newpassword"
                                value={newpassword}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmpassword">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="confirmpassword"
                                value={confirmpassword}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <button className="btn btn-primary">
                                Reset <i className="fa fa-refresh"></i>
                            </button>
                        </div>
                        <div>
                            <Link to="/signup"> Signup </Link>
                        </div>
                        <div>
                            <Link to="/login"> Login </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
