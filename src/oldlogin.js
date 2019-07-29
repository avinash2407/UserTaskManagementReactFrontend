import React, { Component } from 'react';
import axios from 'axios';
import { Button, FormGroup, FormLabel, FormControl, ControlLabel } from 'react-bootstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  handleClick(event) {
    var apiBaseUrl = 'http://localhost:8000/api/';
    var self = this;
    var email = this.state.email;
    var payload = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post(apiBaseUrl + 'login', payload).then(function(response) {
      console.log(response);
      if (response.data.code == 200) {
        console.log('Login successfull');
      }
    });
  }

  render() {
    return (
      <div>
        <form>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              placeholder="Your email goes here"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder="Your password goes here"
            />
          </FormGroup>
          <Button bsSize="large" disabled={!this.validateForm()} onClick={event => this.handleClick(event)}>
            Login
          </Button>
        </form>
      </div>
    );
  }
}
