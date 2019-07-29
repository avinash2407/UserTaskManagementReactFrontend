import React, { Component } from 'react';
import { Button, FormGroup, FormLabel, FormControl, ControlLabel } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { userActions } from '../Actions';
import { connect } from 'react-redux';
import BeforeLoginNav from '../BeforeLoginNav';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 && this.state.name.length > 0;
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { dispatch } = this.props;
    const { email, password, name } = this.state;
    if (email && name && password) {
      dispatch(userActions.signup(email, name, password));
    }
  }
  render() {
    const { email, password, name } = this.state;
    return (
      <div>
        <div className="col text-center">
          <h2>SignUp</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group" style={{ padding: '0px 150px 0px 150px' }}>
              <label htmlFor="emil">Email</label>
              <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
            </div>
            <div className="form-group" style={{ padding: '0px 150px 0px 150px' }}>
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange} />
              <p className="text-muted"> Your name must be atleast 3 characters long</p>
            </div>
            <div className="form-group" style={{ padding: '0px 150px 0px 150px' }}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              <p className="text-muted">
                Password must be atleast 8 characters long , with atleast one each of an uppercase letter, a lowercase
                letter , a number and a special character{' '}
              </p>
            </div>
            <div>
              <button className="btn btn-primary">
                SignUp
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
const connectedSignup = connect(mapStateToProps)(Signup);
export { connectedSignup as Signup };
