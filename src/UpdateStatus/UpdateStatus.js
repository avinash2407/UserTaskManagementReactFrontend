import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../Actions";

export default class UpdateStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.statustask.title,
            description: this.props.statustask.description,
            assignor: this.props.statustask.assignor,
            status: this.props.statustask.status
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        console.log(e);
        console.log(e.target);
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit(e) {
        e.preventDefault();
        const { title, description, assignor, status } = this.state;
        const { statustask } = this.props;
        if (title && status) {
            this.props.dispatch(
                userActions.updatestatus1(statustask.id, status)
            );
        }
    }
    render() {
        const { title, description, assignor, status } = this.state;
        const { statustask } = this.props;
        console.log(status);
        return (
            <div
                className="col text-center"
                style={{ padding: "0px 0px 0px 0px" }}
            >
                <h2>Update Status</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label
                            className="control-label col-sm-2"
                            htmlFor="title"
                        >
                            Title
                        </label>
                        <div style={{ padding: "0px 150px 0px 150px" }}>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={title}
                                onChange={this.handleChange}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label
                            className="control-label col-sm-2"
                            htmlFor="description"
                        >
                            Desrciption
                        </label>
                        <div style={{ padding: "0px 150px 0px 150px" }}>
                            <textarea
                                rows="7"
                                type="text"
                                className="form-control"
                                name="description"
                                value={description}
                                onChange={this.handleChange}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label
                            className="control-label col-sm-2"
                            htmlFor="assignor"
                        >
                            assignor
                        </label>
                        <div style={{ padding: "0px 150px 0px 150px" }}>
                            <input
                                type="text"
                                className="form-control"
                                name="assignor"
                                value={assignor}
                                onChange={this.handleChange}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label
                            className="control-label col-sm-2"
                            htmlFor="status"
                        >
                            status
                        </label>
                        <div style={{ padding: "0px 150px 0px 150px" }}>
                            <select className="form-control" value={status} name='status' onChange={this.handleChange}>
                                <option value="completed">completed</option>
                                <option value="inProgress">inProgress</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-group btn-primary">
                            Update status{" "}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { statustask } = state;
    return {
        statustask
    };
}
const connectedUpdateStatus = connect(mapStateToProps)(UpdateStatus);
export { connectedUpdateStatus as UpdateStatus };
