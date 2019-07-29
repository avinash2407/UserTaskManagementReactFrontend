import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, FormGroup, FormLabel, FormControl, ControlLabel } from 'react-bootstrap';
import { userActions } from '../Actions';
import BeforeLoginNav from '../BeforeLoginNav';
import Cookies from 'js-cookie';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.props.dispatch(userActions.logout());
        Cookies.remove('tokencookie');
        Cookies.remove('role');
        Cookies.remove('userid');
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }
    render() {
        const { email, password } = this.state;
        return (
            <div>
                <div className="col text-center" style={{ padding: '0px 0px 0px 0px' }}>
                    <h2>Login</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div style={{ padding: '0px 300px 0px 300px' }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div style={{ padding: '0px 300px 0px 300px' }}>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login };
