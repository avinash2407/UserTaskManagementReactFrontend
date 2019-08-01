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

export default class ReduxSignUp extends Component {
  constructor(props) {
    super(props);
    this.registerSubmit = this.registerSubmit.bind(this);
  }
  registerSubmit(values) {
    const { dispatch } = this.props;
    dispatch(
      userActions.signup(values.email, values.username, values.password)
    );
  }
  render() {
    return (
      <div className="col text-center">
        <h2> Redux-form SignUp Page</h2>
        <FieldLevelValidationForm onSubmit={this.registerSubmit} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {};
}

const connectedReduxSignUp = connect(mapStateToProps)(ReduxSignUp);
export { connectedReduxSignUp as ReduxSignUp };
