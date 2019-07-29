import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../Actions";
import "../index.css";
const Highcharts = require("highcharts");

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: "this year"
    };
    this.highChartRender = this.highChartRender.bind(this);
  }
  highChartRender() {
    const { owntasks, piestats, barstats } = this.props;
    Highcharts.chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
        renderTo: "right"
      },
      title: {
        text: "Your Performance Analysis"
      },
      credits: {
        enabled: false
    },
      tooltip: {
        enabled: false,
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
      },
      plotOptions: {
        pie: {
          allowPointSelect: false,
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            style: {
              color:
                (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                "black"
            }
          },
        }
      },
      series: [
        {
          name: "Tasks",
          data: [
            {
              name: "CompOnTime",
              y: piestats[0].y,
              color: "green"
            },
            {
              name: "CompAfterTime",
              y: piestats[1].y,
              color: "darksalmon"
            },
            {
              name: "InProgress",
              y: piestats[2].y,
              color: "greenyellow"
            },
            {
              name: "Overdue",
              y: piestats[3].y,
              color: "#FF0000"
            },
            {
              name: "NoAction",
              y: piestats[4].y,
              color: "silver"
            }
          ]
        }
      ]
    });
  }
  componentDidMount() {
    this.reloadPage();
  }
  componentDidUpdate() {
    const { owntasks } = this.props;
    if (owntasks.length > 0) this.highChartRender();
  }
  reloadPage() {
    const { condition } = this.state;
    this.props.dispatch(userActions.getdashboard(condition));
    this.props.dispatch(userActions.getdashboardtasks());
  }
  render() {
    const { owntasks } = this.props;
    return (
      <div>
        <div>
          <div className="text-center">
            <p>Welcome to Vmock User and Task Management!!!!</p>
          </div>
          <div className="left">
            {owntasks.length > 0 && (
              <div>
                <table className="table table-striped table-bordered table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Assignor</th>
                      <th>Due_Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {owntasks.map((owntask, index) => (
                      <tr key={owntask.id}>
                        <td>{owntask.title}</td>
                        <td>{owntask.description}</td>
                        <td>{owntask.status}</td>
                        <td>{owntask.fromuser.name}</td>
                        <td>{owntask.due_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {owntasks.length === 0 && (
              <div>
                {" "}
                <p>You have no pending Tasks</p>{" "}
              </div>
            )}
          </div>
          {<div id="right"></div>}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { owntasks, piestats, barstats } = state;
  return {
    owntasks,
    piestats,
    barstats
  };
}
const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
