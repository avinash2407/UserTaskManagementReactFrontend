import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../Actions";

export default class CreateTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            assignee: this.props.assigneeuser.name,
            due_date: "",
            due_time : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit(e) {
        e.preventDefault();
        var newdate = new Date();
        const { title, description, assignee, due_date, due_time} = this.state;
        var temp = due_date;
        var selecteddate = Date.parse(temp);
        const { assigneeuser } = this.props;
        var userid = assigneeuser.id;
        if (title && userid && due_date ) {
            userActions.createtask(title, description, userid, due_date+' '+due_time);
        }
    }
    render() {
        const { title, description, assignee, due_date, due_time } = this.state;
        return (
            <div
                className="col text-center"
                style={{ padding: "0px 0px 0px 0px" }}
            >
                <h2>Assign Task</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <div style={{ padding: "0px 150px 0px 150px" }}>
                            <textarea
                                rows="2"
                                type="textarea"
                                className="form-control"
                                name="title"
                                value={title}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Desrciption</label>
                        <div style={{ padding: "0px 150px 0px 150px" }}>
                            <textarea
                                rows="7"
                                type="text"
                                className="form-control"
                                name="description"
                                value={description}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="assignee">Assignee</label>
                        <div style={{ padding: "0px 150px 0px 150px" }}>
                            <input
                                type="text"
                                className="form-control"
                                name="assignee"
                                value={assignee}
                                onChange={this.handleChange}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label
                            className="control-label col-sm-2"
                            htmlFor="due_date"
                        >
                            due_date
                        </label>
                        <div style={{ padding: "0px 150px 0px 150px" }}>
                            <input
                                type="date"
                                className="form-control"
                                name="due_date"
                                value={due_date}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label
                            className="control-label col-sm-2"
                            htmlFor="due_time"
                        >
                            due_date
                        </label>
                        <div style={{ padding: "0px 150px 0px 150px" }}>
                            <input
                                type="time"
                                className="form-control"
                                name="due_time"
                                value={due_time}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-group btn-primary">
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { assigneeuser } = state;
    return {
        assigneeuser
    };
}
const connectedCreateTask = connect(mapStateToProps)(CreateTask);
export { connectedCreateTask as CreateTask };
