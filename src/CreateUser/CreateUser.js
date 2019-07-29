import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../Actions";
import AfterLoginNav from "../AfterLoginNav";

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: ""
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
            const { email, password, name } = this.state;
            if (email && password && name) {
                userActions.createuser(email, password, name);
            }
            this.setState({
                email: "",
                password: "",
                name: ""
            });
    }
    render() {
        const { email, password, name } = this.state;
        return (
            <div
                className="col text-center"
                style={{ padding: "0px 0px 0px 0px" }}
            >
                <h2>Create User</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div style={{ padding: "0px 150px 0px 150px" }}>
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
                        <label htmlFor="name">Name</label>
                        <div style={{ padding: "0px 150px 0px 150px" }}>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={this.handleChange}
                            />
                            <p className="text-muted">
                                Your name must be atleast 3 characters long
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <div style={{ padding: "0px 150px 0px 150px" }}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                            />
                            <p className="text-muted">
                                Password must be atleast 8 characters long ,
                                with atleast one each of an uppercase letter, a
                                lowercase letter , a number and a special
                                character
                            </p>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-group btn-primary">
                            Create <i className="fa fa-user-plus"></i>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
