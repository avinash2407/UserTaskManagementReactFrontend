import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../Actions";
import Loader from "react-loader-spinner";
import Cookies from "js-cookie";

export default class FilterUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      role: "",
      createdby: "",
      currentPage: 1,
      page: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handlenewtask = this.handlenewtask.bind(this);
  }
  handleClear() {
    let email = this.state.email;
    let name = this.state.name;
    let role = this.state.role;
    let createdby = this.state.createdby;
    let currentPage = parseInt(this.state.currentPage);
    email = "";
    name = "";
    role = "";
    createdby = "";
    currentPage = 1;
    this.setState({
      email,
      name,
      role,
      createdby,
      currentPage
    });
    this.props.dispatch(
      userActions.delayfilter(email, name, role, createdby, currentPage)
    );
  }
  handleChange(e) {
    let email = this.state.email;
    let name = this.state.name;
    let role = this.state.role;
    let createdby = this.state.createdby;
    let currentPage = parseInt(this.state.currentPage);
    if (e.target.name === "email") {
      email = e.target.value;
      this.setState({
        email
      });
    }
    if (e.target.name === "name") {
      name = e.target.value;
      this.setState({
        name
      });
    }
    if (e.target.name === "role") {
      role = e.target.value;
      this.setState({
        role
      });
    }
    if (e.target.name === "createdby") {
      createdby = e.target.value;
      this.setState({
        createdby
      });
    }
    currentPage = 1;
    this.setState({
      currentPage
    });
    this.props.dispatch(
      userActions.delayfilter(email, name, role, createdby, currentPage)
    );
  }
  handlePageChange(e) {
    let currentPage = parseInt(this.state.currentPage);
    var lastpage = parseInt(this.props.pagenumber.pagenum);
    if (e.target.name === "currentPage") {
      currentPage = e.target.value;
      this.setState({
        currentPage
      });
    }
    const { email, name, role, createdby } = this.state;
    if (currentPage !== null && currentPage > 0 && currentPage <= lastpage)
      this.props.dispatch(
        userActions.delayfilter(email, name, role, createdby, currentPage)
      );
  }
  handlePrev() {
    let currentPage = parseInt(this.state.currentPage);
    if (currentPage !== 1) {
      currentPage = currentPage - 1;
      this.setState({
        currentPage
      });
    }
    const { email, name, role, createdby } = this.state;
    this.props.dispatch(
      userActions.delayfilter(email, name, role, createdby, currentPage)
    );
  }
  handleNext() {
    let currentPage = parseInt(this.state.currentPage);
    var lastpage = parseInt(this.props.pagenumber.pagenum);
    if (currentPage < lastpage) {
      currentPage = currentPage + 1;
      this.setState({
        currentPage
      });
      const { email, name, role, createdby } = this.state;
      this.props.dispatch(
        userActions.delayfilter(email, name, role, createdby, currentPage)
      );
    }
  }
  handleDelete(email, email1, name, role, createdby, currentPage) {
    if (email)
      return e =>
        this.props.dispatch(
          userActions.deleteuser(
            email,
            email1,
            name,
            role,
            createdby,
            currentPage
          )
        );
  }
  handleRoleChange(email, email1, name, role, createdby, currentPage) {
    if (email)
      return e =>
        this.props.dispatch(
          userActions.makeadmin(
            email,
            email1,
            name,
            role,
            createdby,
            currentPage
          )
        );
  }
  handlenewtask(userId, name) {
    return e => this.props.dispatch(userActions.saveUser(userId, name));
  }
  componentWillMount() {
    this.reloadPage();
  }
  reloadPage() {
    const { email, name, role, createdby, currentPage } = this.state;
    this.props.dispatch(
      userActions.delayfilter(email, name, role, createdby, currentPage)
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    let currentPage = parseInt(this.state.currentPage);
    currentPage = 1;
    this.setState({
      currentPage
    });
    const { email, name, role, createdby } = this.state;
    this.props.dispatch(
      userActions.delayfilter(email, name, role, createdby, currentPage)
    );
  }
  render() {
    const { users, deletecheck, pagenumber, loader } = this.props;
    var lastpage = pagenumber.pagenum;
    const { email, name, role, createdby, currentPage } = this.state;
    var userrole = Cookies.get("role");
    return (
      <div>
        <div>
          {userrole && userrole === "Admin" && (
            <div className="text-center" style={{ padding: "0px 0px 0px 0px" }}>
              <div className="col text-center">
                <h2>FilterUsers</h2>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-row">
                    <div className="col  form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col  form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col  form-group">
                      <label htmlFor="role">Role</label>
                      <input
                        type="text"
                        className="form-control"
                        name="role"
                        value={role}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col  form-group">
                      <label htmlFor="createdby">Createdby</label>
                      <input
                        type="text"
                        className="form-control"
                        name="createdby"
                        value={createdby}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="col text-center">
                <button className="btn btn-primary" onClick={this.handleClear}>
                  Reset Filter <i className="fa fa-refresh"></i>
                </button>
              </div>
              {!loader.isLoading && (
                <div style={{ padding: "0px 500px 0px 500px" }}>
                  <h2>Navigate</h2>
                  <input
                    type="number"
                    min = "1"
                    max = {lastpage}
                    className="form-control"
                    name="currentPage"
                    value={currentPage}
                    onChange={this.handlePageChange}
                  />
                </div>
              )}
              {loader.isLoading && (
                <Loader
                  type="Ball-Triangle"
                  color="#00BFFF"
                  height="100"
                  width="100"
                />
              )}
              {!loader.isLoading && (
                <div>
                  <table className="table table-striped table-bordered table-hover">
                    <thead className="thead-dark">
                      <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Createdby</th>
                        <th>UserActions</th>
                        <th>RoleActions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{user.email}</td>
                          <td>{user.name}</td>
                          <td>{user.role}</td>
                          <td>{user.created_by}</td>
                          <td>
                            {user.role !== "Admin" && (
                              <button
                                className="btn btn-primary"
                                onClick={this.handleDelete(
                                  user.email,
                                  email,
                                  name,
                                  role,
                                  createdby,
                                  currentPage
                                )}
                              >
                                Delete <i className="fa fa-user-times"></i>
                              </button>
                            )}
                            {user.role === "Admin" && (
                              <button className="btn btn-secondary disabled">
                                Not Allowed
                              </button>
                            )}
                          </td>
                          <td>
                            {user.role !== "Admin" && (
                              <button
                                className="btn btn-primary"
                                onClick={this.handleRoleChange(
                                  user.email,
                                  email,
                                  name,
                                  role,
                                  createdby,
                                  currentPage
                                )}
                              >
                                Make Admin
                              </button>
                            )}
                            {user.role === "Admin" && (
                              <button className="btn btn-secondary disabled">
                                Not Allowed
                              </button>
                            )}
                          </td>
                          <td>
                            {
                              <button
                                className="btn btn-primary"
                                onClick={this.handlenewtask(user.id, user.name)}
                              >
                                Assign Task
                              </button>
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          {userrole && userrole === "Normal" && (
            <div className="text-center" style={{ padding: "0px 0px 0px 0px" }}>
              <div className="col text-center">
                <h2>FilterUsers</h2>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-row">
                    <div className="col form-group">
                      <label htmlFor="name">name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col form-group">
                      <label htmlFor="role">role</label>
                      <input
                        type="text"
                        className="form-control"
                        name="role"
                        value={role}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="col text-center">
                <button className="btn btn-primary" onClick={this.handleClear}>
                  Reset Filter <i className="fa fa-refresh"></i>
                </button>
              </div>
              {!loader.isLoading && (
                <div style={{ padding: "0px 500px 0px 500px" }}>
                  <h2>Navigate</h2>
                  <input
                    type="number"
                    min = "1"
                    max = {lastpage}
                    className="form-control"
                    name="currentPage"
                    value={currentPage}
                    onChange={this.handlePageChange}
                  />
                </div>
              )}
              {loader.isLoading && (
                <Loader
                  type="Ball-Triangle"
                  color="#00BFFF"
                  height="100"
                  width="100"
                />
              )}
              {!loader.isLoading && (
                <div>
                  <table className="table table-striped table-hover table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th>Name</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index}>
                          <td>{user.name}</td>
                          <td>{user.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {!loader.isLoading && (
          <div
            className="col text-center"
            style={{ padding: "0px 0px 0px 100px" }}
          >
            {currentPage > 1 && currentPage <= lastpage && (
              <button onClick={this.handlePrev} className="btn btn-secondary">
                Prev<span className="badge">{parseInt(currentPage) - 1}</span>
              </button>
            )}
            {currentPage < 2 && (
              <button type="button" className="btn btn-secondary disabled">
                Prev
              </button>
            )}
            {lastpage > currentPage && currentPage >= 0 && (
              <button onClick={this.handleNext} className="btn btn-primary">
                Next<span className="badge">{parseInt(currentPage) + 1}</span>
              </button>
            )}
            {lastpage <= currentPage && (
              <button type="button" className="btn btn-primary disabled">
                Next
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { users, deletecheck, pagenumber, loader } = state;
  return {
    users,
    deletecheck,
    pagenumber,
    loader
  };
}
const connectedFilterUsers = connect(mapStateToProps)(FilterUsers);
export { connectedFilterUsers as FilterUsers };
