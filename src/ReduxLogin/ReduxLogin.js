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
import FieldLevelValidationForm from "./FieldLevelValidationForm";

export default class ReduxLogin extends Component {
    constructor(props) {
        super(props);
        this.loginSubmit = this.loginSubmit.bind(this);
    }
    loginSubmit(values) {
        const { dispatch } = this.props;
        dispatch(userActions.login(values.email, values.password));
    }
    render() {
        return (
            <div className="col text-center">
                <h2> Redux-form Login Page</h2>
                <FieldLevelValidationForm onSubmit={this.loginSubmit} />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {};
}

const connectedReduxLogin = connect(mapStateToProps)(ReduxLogin);
export { connectedReduxLogin as ReduxLogin };
