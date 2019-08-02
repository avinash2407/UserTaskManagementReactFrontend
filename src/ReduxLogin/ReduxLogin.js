import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
    Button,
    FormGroup,
    FormLabel,
    FormControl,
    ControlLabel
} from "react-bootstrap";
import { userActions } from "../Actions";
import BeforeLoginNav from "../BeforeLoginNav";
import Cookies from "js-cookie";
import SubmitValidationForm from "./SubmitValidationForm";
import { SubmissionError } from "redux-form";

export default class ReduxLogin extends Component {
    constructor(props) {
        super(props);
        this.loginSubmit = this.loginSubmit.bind(this);
    }
    loginSubmit(values) {
        const { dispatch } = this.props;
        return dispatch(userActions.reduxlogin(values.email, values.password))
            .then(response => {})
            .catch(error => {
                console.log(error.response);
                var erobj = new SubmissionError({
                    _error : 'Login Failed!'
                });
                console.log(erobj);
                throw erobj;
            });
    }
    render() {
        return (
            <div className="col text-center">
                <h2> Redux-form Login Page</h2>
                <SubmitValidationForm onSubmit={this.loginSubmit} />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {};
}

const connectedReduxLogin = connect(mapStateToProps)(ReduxLogin);
export { connectedReduxLogin as ReduxLogin };
