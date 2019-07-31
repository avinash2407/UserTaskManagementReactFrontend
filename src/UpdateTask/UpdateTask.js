import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../Actions";
import Cookies from "js-cookie";
import moment from "moment";

export default class UpdateTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.task.title,
            description: this.props.task.description,
            due_date: moment(this.props.task.due_date).format("YYYY-MM-DD"),
            due_time: moment(this.props.task.due_date).format("hh:mm")
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
        const { title, description, due_date, due_time } = this.state;
        var newdate = new Date();
        if (due_date !== null) {
            var temp = due_date;
            var selecteddate = Date.parse(temp);
        }
        const { task } = this.props;
        this.props.dispatch(
            userActions.updatetask1(
                task.id,
                title,
                description,
                due_date + " " + due_time
            )
        );
    }
    render() {
        const { title, description, due_date, due_time } = this.state;
        const { task } = this.props;
        return (
            <div
                className="col text-center"
                style={{ padding: "0px 0px 0px 0px" }}
            >
                <h2>Update Task</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <div style={{ padding: "0px 150px 0px 150px" }}>
                            <input
                                type="text"
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
                                roes="7"
                                type="text"
                                className="form-control"
                                name="description"
                                value={description}
                                onChange={this.handleChange}
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
                            due_time
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
                            Update Task{" "}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { task } = state;
    return {
        task
    };
}
const connectedUpdateTask = connect(mapStateToProps)(UpdateTask);
export { connectedUpdateTask as UpdateTask };
