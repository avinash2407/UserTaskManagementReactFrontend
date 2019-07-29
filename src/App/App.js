import React, { Component } from 'react';
import { Login } from '../Login';
import { Signup } from '../Signup';
import { connect } from 'react-redux';
import { history } from '../BrowseHistory';
import { Router, Route, Link } from 'react-router-dom';
import { HomePage } from '../HomePage';
import CreateUser from '../CreateUser/CreateUser';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import ResetPassword from '../ResetPassword/ResetPassword';
import { FilterUsers } from '../FilterUsers';
import { ValidateRoute } from '../ValidateRoute';
import { FilterTasks } from '../FilterTasks';
import { UpdateTask } from '../UpdateTask';
import UserManagement from '../UserManagement/UserManagement';
import AfterLoginNav from '../AfterLoginNav';
import BeforeLoginNav from '../BeforeLoginNav';
import { UpdateStatus } from '../UpdateStatus';
import { CreateTask } from '../CreateTask';
import Cookies from 'js-cookie';
import '../App.css';
import '../index.css';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {auth} = this.props;
    return (
      <Router history={history}>
        <div className="jumbotron jumbotron-fluid" style={{ height: 1000 }}>
          <div className="container-fluid">
            {(Cookies.get('tokencookie')===undefined) && <BeforeLoginNav />}
            {(Cookies.get('tokencookie')!==undefined) && <AfterLoginNav />}
            <ValidateRoute exact path="/" component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/resetpassword" component={ResetPassword} />
            <ValidateRoute path="/filterusers" component={FilterUsers} />
            <ValidateRoute path="/filtertasks" component={FilterTasks} />
            <ValidateRoute path="/usermanagement" component={UserManagement} />
            <ValidateRoute path="/createuser" component={CreateUser} />
            <ValidateRoute path="/createtask" component={CreateTask} />
            <ValidateRoute path="/updatetask" component={UpdateTask} />
            <ValidateRoute path="/updatestatus" component={UpdateStatus} />
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };