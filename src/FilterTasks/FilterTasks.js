import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../Actions";
import Loader from "react-loader-spinner";
import Cookies from "js-cookie";

export default class FilterTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      assignee: "",
      assignor: "",
      status: "",
      currentPage: 1,
      start_date: "",
      end_date: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdateStatus = this.handleUpdateStatus.bind(this);
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  handleClear() {
    let title = this.state.title;
    let assignee = this.state.assignee;
    let assignor = this.state.assignor;
    let status = this.state.status;
    let currentPage = parseInt(this.state.currentPage);
    let start_date = this.state.start_date;
    let end_date = this.state.end_date;
    title = "";
    assignee = "";
    assignor = "";
    status = "";
    currentPage = 1;
    start_date = "";
    end_date = "";
    this.setState({
      title,
      assignee,
      assignor,
      status,
      currentPage,
      start_date,
      end_date
    });
    this.props.dispatch(
      userActions.delaytaskfilter(
        title,
        assignee,
        assignor,
        status,
        currentPage,
        start_date,
        end_date
      )
    );
  }
  handleChange(e) {
    let title = this.state.title;
    let assignee = this.state.assignee;
    let assignor = this.state.assignor;
    let status = this.state.status;
    let currentPage = parseInt(this.state.currentPage);
    let start_date = this.state.start_date;
    let end_date = this.state.end_date;
    if (e.target.name === "title") {
      title = e.target.value;
      this.setState({
        title
      });
    }
    if (e.target.name === "assignee") {
      assignee = e.target.value;
      this.setState({
        assignee
      });
    }
    if (e.target.name === "assignor") {
      assignor = e.target.value;
      this.setState({
        assignor
      });
    }
    if (e.target.name === "status") {
      status = e.target.value;
      this.setState({
        status
      });
    }
    currentPage = 1;
    this.setState({
      currentPage
    });
    if (e.target.name === "start_date") {
      start_date = e.target.value;
      this.setState({
        start_date
      });
    }
    if (e.target.name === "end_date") {
      end_date = e.target.value;
      this.setState({
        end_date
      });
    }
    this.props.dispatch(
      userActions.delaytaskfilter(
        title,
        assignee,
        assignor,
        status,
        currentPage,
        start_date,
        end_date
      )
    );
  }
  handlePageChange(e) {
    let currentPage = parseInt(this.state.currentPage);
    var lasttaskpage = parseInt(this.props.taskpagenumber.taskpagenum);
    if (e.target.name === "currentPage") {
      currentPage = e.target.value;
      this.setState({
        currentPage
      });
    }
    const { title, assignee, assignor, status } = this.state;
    if (currentPage !== null && currentPage > 0 && currentPage <= lasttaskpage)
      this.props.dispatch(
        userActions.delaytaskfilter(
          title,
          assignee,
          assignor,
          status,
          currentPage,
          this.state.start_date,
          this.state.end_date
        )
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
    const { title, assignee, assignor, status } = this.state;
    this.props.dispatch(
      userActions.delaytaskfilter(
        title,
        assignee,
        assignor,
        status,
        currentPage,
        this.state.start_date,
        this.state.end_date
      )
    );
  }
  handleNext() {
    let currentPage = parseInt(this.state.currentPage);
    var lastpage = parseInt(this.props.taskpagenumber.taskpagenum);
    if (currentPage < lastpage) {
      currentPage = currentPage + 1;
      this.setState({
        currentPage
      });
      const { title, assignee, assignor, status } = this.state;
      this.props.dispatch(
        userActions.delaytaskfilter(
          title,
          assignee,
          assignor,
          status,
          currentPage,
          this.state.start_date,
          this.state.end_date
        )
      );
    }
  }
  handleDelete(
    taskId,
    title,
    assignee,
    assignor,
    status,
    currentPage,
    start_date,
    end_date,
    created_by
  ) {
    return e =>
      this.props.dispatch(
        userActions.deletetask(
          taskId,
          title,
          assignee,
          assignor,
          status,
          currentPage,
          start_date,
          end_date
        )
      );
  }
  handleUpdateStatus(taskId, title, description, assignor, status) {
    return e =>
      this.props.dispatch(
        userActions.updatestatus(taskId, title, description, assignor, status)
      );
  }
  handleUpdateTask(taskId, title, description, due_date) {
    return e =>
      this.props.dispatch(
        userActions.updatetask(taskId, title, description, due_date)
      );
  }
  componentWillMount() {
    this.dispatchTasks();
  }
  dispatchTasks() {
    const {
      title,
      assignee,
      assignor,
      status,
      currentPage,
      start_date,
      end_date
    } = this.state;
    this.props.dispatch(
      userActions.delaytaskfilter(
        title,
        assignee,
        assignor,
        status,
        currentPage,
        start_date,
        end_date
      )
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    let currentPage = parseInt(this.state.currentPage);
    currentPage = 1;
    this.setState({
      currentPage
    });
    const { title, assignee, assignor, status } = this.state;
    this.props.dispatch(
      userActions.delaytaskfilter(
        title,
        assignee,
        assignor,
        status,
        currentPage,
        this.state.start_date,
        this.state.end_date
      )
    );
  }
  render() {
    const { tasks, taskpagenumber, loader } = this.props;
    var tasklastpage = taskpagenumber.taskpagenum;
    const {
      title,
      assignee,
      assignor,
      status,
      currentPage,
      start_date,
      end_date
    } = this.state;
    var idofuser = Cookies.get("userid");
    return (
      <div>
        <div className="text-center" style={{ padding: "0px 0px 0px 0px" }}>
          <div className="col text-center">
            <h2>FilterTasks</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-row" style={{ padding: "0px 0px 0px 0px" }}>
                <div className="col col-sm-6  form-group">
                  <label htmlFor="title">Keyword</label>
                  <textarea
                    rows="2"
                    cols="50"
                    type="text"
                    className="form-control"
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col form-group">
                  <label htmlFor="assignee">assignee</label>
                  <input
                    type="text"
                    className="form-control"
                    name="assignee"
                    value={assignee}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col form-group">
                  <label htmlFor="assignor">assignor</label>
                  <input
                    type="text"
                    className="form-control"
                    name="assignor"
                    value={assignor}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col form-group">
                  <label htmlFor="status">status</label>
                  <input
                    type="text"
                    className="form-control"
                    name="status"
                    value={status}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-sm-6 form-group">
                  <label htmlFor="start_date">start_date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="start_date"
                    value={start_date}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-sm-6 form-group">
                  <label htmlFor="end_date">end_date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="end_date"
                    value={end_date}
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
                min="1"
                max={tasklastpage}
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
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Assignor</th>
                    <th>Assignee</th>
                    <th>Due_date</th>
                    <th>Delete</th>
                    <th>Update Status</th>
                    <th>Update Task</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={index}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.status}</td>
                      <td>{task.fromuser.name}</td>
                      <td>{task.touser.name}</td>
                      <td>{task.due_date}</td>
                      <td>
                        {idofuser == task.created_by && (
                          <button
                            className="btn btn-primary"
                            onClick={this.handleDelete(
                              task.id,
                              title,
                              assignee,
                              assignor,
                              status,
                              currentPage,
                              start_date,
                              end_date,
                              task.created_by
                            )}
                          >
                            Delete <i className="fa fa-user-times"></i>
                          </button>
                        )}
                        {idofuser != task.created_by && (
                          <button className="btn btn-secondary disabled">
                            Not Allowed
                          </button>
                        )}
                      </td>
                      <td>
                        {idofuser == task.assigned_to && (
                          <button
                            className="btn btn-primary"
                            onClick={this.handleUpdateStatus(
                              task.id,
                              task.title,
                              task.description,
                              task.fromuser.name,
                              task.status
                            )}
                          >
                            Update Status
                          </button>
                        )}
                        {idofuser != task.assigned_to && (
                          <button className="btn btn-secondary disabled">
                            Not Allowed
                          </button>
                        )}
                      </td>
                      <td>
                        {idofuser == task.created_by && (
                          <button
                            className="btn btn-primary"
                            onClick={this.handleUpdateTask(
                              task.id,
                              task.title,
                              task.description,
                              task.due_date
                            )}
                          >
                            Update Task
                          </button>
                        )}
                        {idofuser != task.created_by && (
                          <button className="btn btn-secondary disabled">
                            Not Allowed
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {!loader.isLoading && (
          <div className="text-center" style={{ padding: "0px 0px 0px 100px" }}>
            {currentPage > 1 && currentPage <= tasklastpage && (
              <button onClick={this.handlePrev} className="btn btn-secondary">
                Prev<span className="badge">{parseInt(currentPage) - 1}</span>
              </button>
            )}
            {currentPage < 2 && (
              <button type="button" className="btn btn-secondary disabled">
                Prev
              </button>
            )}
            {tasklastpage > currentPage && currentPage >= 0 && (
              <button onClick={this.handleNext} className="btn btn-primary">
                Next<span className="badge">{parseInt(currentPage) + 1}</span>
              </button>
            )}
            {tasklastpage <= currentPage && (
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
  const { tasks, taskpagenumber, loader } = state;
  return {
    tasks,
    taskpagenumber,
    loader
  };
}
const connectedFilterTasks = connect(mapStateToProps)(FilterTasks);
export { connectedFilterTasks as FilterTasks };
