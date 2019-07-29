import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './index.css';

export default class AfterLoginNav extends Component {
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
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Services
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="nav-link" to="/usermanagement">
                  User Management
                </Link>
                <Link className="nav-link" to="/filtertasks">
                  Task Management
                </Link>
              </div>
            </li>
          </ul>
          <Link to="/login" className="btn btn-danger">
            Logout
          </Link>
        </div>
      </nav>
    );
  }
}
