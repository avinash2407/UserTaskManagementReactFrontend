import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export default class BeforeLoginNav extends Component {
  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-md navbar-light bg-secondary">
        <Link className="navbar-brand" to="/">
          Vmock User Task Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                SignUp
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/forgotpassword">
                Forgot Password ?
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
