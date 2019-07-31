import axios from "axios";
import { history } from "../BrowseHistory";
import Cookies from "js-cookie";

export const userActions = {
  login,
  signup,
  logout,
  createuser,
  rolechange,
  deleteuser,
  forgotpassword,
  resetpassword,
  filterusers,
  delayfilter,
  createtask,
  filtertasks,
  delaytaskfilter,
  deletetask,
  getdashboard,
  getdashboardtasks,
  makeadmin,
  updatetask,
  updatetask1,
  updatestatus,
  updatestatus1,
  saveUser
};

export function login(email, password) {
  return dispatch => {
    var apiBaseUrl = "http://localhost:8000/api/users/";
    var payload = {
      email: email,
      password: password
    };
    axios
      .post(apiBaseUrl + "login", payload, { withCredentials: true })
      .then(function(response) {
        if (response.status === 200) {
          var user = {
            token: Cookies.get("tokencookie")
          };
          dispatch({ type: "LoginSuccess", user });
          history.push("/");
        } else {
          alert(response.data.error);
        }
      })
      .catch(error => {
        if (error.response.status === 400 || error.response.status === 401)
          alert(error.response.data.error);
        else {
          alert(error.message);
          return false;
        }
      });
  };
}
export function signup(email, name, password) {
  return dispatch => {
    var apiBaseUrl = "http://localhost:8000/api/users/";
    var payload = {
      email: email,
      password: password,
      name: name
    };
    axios
      .post(apiBaseUrl + "signup", payload)
      .then(function(response) {
        if (response.status === 201) {
          alert("Registration successful");
          history.push("/login");
        } else {
          alert(response.data.error);
        }
      })
      .catch(error => {
        if (error.message.includes("422")) {
          var message = "";
          if (error.response.data.password)
            message += error.response.data.password;
          if (error.response.data.email) message += error.response.data.email;
          if (error.response.data.name) message += error.response.data.name;
          alert(message);
          return false;
        } else if (
          error.response.status === 400 ||
          error.response.status === 401
        ) {
          alert(error.response.data.error);
          return false;
        } else {
          alert(error.message);
          return false;
        }
      });
  };
}
export function logout() {
  return dispatch => {
    dispatch({ type: "Logout" });
  };
}
export function createuser(email, password, name) {
  var token = Cookies.get("tokencookie");
  if (token !== undefined) {
    var payload = {
      email: email,
      password: password,
      name: name
    };
    var apiBaseUrl = "http://localhost:8000/api/users/create";
    axios
      .post(apiBaseUrl, payload, { withCredentials: true })
      .then(function(response) {
        if (response.status === 201) {
          alert("User Created");
          history.push("/createuser");
        } else {
          alert(response.data.error);
        }
      })
      .catch(error => {
        if (error.message.includes("422")) {
          var message = "";
          if (error.response.data.password)
            message += error.response.data.password;
          if (error.response.data.email) message += error.response.data.email;
          if (error.response.data.name) message += error.response.data.name;
          alert(message);
          return false;
        } else if (
          error.response.status === 400 ||
          error.response.status === 401
        ) {
          alert(error.response.data.error);
          return false;
        } else {
          alert(error.message);
          return false;
        }
      });
  }
}
export function saveUser(userId, name) {
  return dispatch => {
    var token = Cookies.get("tokencookie");
    if (token !== undefined) {
      var assigneeuser = {
        id: userId,
        name: name
      };
      dispatch({ type: "AssigneeStore", assigneeuser });
      history.push("/createtask");
    }
  };
}
export function createtask(title, description, assignee, due_date) {
  var token = Cookies.get("tokencookie");
  if (token !== undefined) {
    var payload = {
      title: title,
      description: description,
      assignee: assignee,
      due_date: due_date
    };
    var apiBaseUrl = "http://localhost:8000/api/tasks/create";
    axios
      .post(apiBaseUrl, payload, { withCredentials: true })
      .then(function(response) {
        if (response.status === 201) {
          alert("task Created");
          history.push("/filterusers");
        } else {
          alert(response.data.error);
        }
      })
      .catch(error => {
        if (error.message.includes("422")) {
          var message = "";
          if (error.response.data.title) message += error.response.data.title;
          if (error.response.data.assignee)
            message += error.response.data.assignee;
          if (error.response.data.due_date)
            message += error.response.data.due_date;
          alert(message);
          return false;
        } else if (
          error.response.status === 400 ||
          error.response.status === 401
        ) {
          alert(error.response.data.error);
          return false;
        } else {
          alert(error.message);
          return false;
        }
      });
  } else alert("login to karo beta");
}
export function makeadmin(email, email1, name, role, createdby, currentPage) {
  return dispatch => {
    var token = Cookies.get("tokencookie");
    if (token !== undefined) {
      var payload = {
        email: email,
        role: "Admin"
      };
      var apiBaseUrl = "http://localhost:8000/api/users/rolechange";
      axios
        .post(apiBaseUrl, payload, { withCredentials: true })
        .then(function(response) {
          if (response.status === 200) {
            alert("Role Change Successful");
            dispatch(delayfilter(email1, name, role, createdby, currentPage));
          } else alert(response.data.error);
        })
        .catch(error => {
          if (error.response.status === 400 || error.response.status === 401)
            alert(error.response.data.error);
          else alert(error.message);
        });
    }
  };
}
export function rolechange(email, role) {
  var token = Cookies.get("tokencookie");
  if (token !== undefined) {
    var payload = {
      email: email,
      role: role
    };
    var apiBaseUrl = "http://localhost:8000/api/users/rolechange";
    axios
      .post(apiBaseUrl, payload, { withCredentials: true })
      .then(function(response) {
        if (response.status === 200) {
          alert("Role Change successful");
          history.push("/rolechange");
        } else alert(response.data.error);
      })
      .catch(error => {
        if (error.message.includes("422")) alert("Incorrect Role");
        else {
          alert(error.message);
        }
      });
  }
}
export function updatetask(taskId, title, description, due_date) {
  return dispatch => {
    var task = {
      id: taskId,
      title: title,
      description: description,
      due_date: due_date
    };
    dispatch({ type: "GetTaskId", task });
    history.push("/updatetask");
  };
}
export function updatetask1(taskId, title, description, due_date) {
  return dispatch => {
    var token = Cookies.get("tokencookie");
    if (token !== undefined) {
      var payload = {
        taskId: taskId,
        title: title,
        description: description,
        due_date: due_date
      };
      var apiBaseUrl = "http://localhost:8000/api/tasks/update";
      axios
        .post(apiBaseUrl, payload, { withCredentials: true })
        .then(function(response) {
          if (response.status === 200) {
            alert("Task Updated");
            history.push("/filtertasks");
          } else alert(response.data.error);
        })
        .catch(error => {
          if (error.response.status === 400 || error.response.status === 401) {
            alert(error.response.data.error);
            return false;
          } else if (error.response.status === 422) {
            var message = "";
            if (error.response.data.title) message += error.response.data.title;
            if (error.response.data.taskId)
              message += error.response.data.taskId;
            if (error.response.data.due_date)
              message += error.response.data.due_date;
            alert(message);
            return false;
          } else {
            alert(error.message);
            return false;
          }
        });
    }
  };
}
export function updatestatus(taskId, title, description, assignor, status) {
  return dispatch => {
    var statustask = {
      id: taskId,
      title: title,
      description: description,
      assignor: assignor,
      status: status
    };
    dispatch({ type: "GetStatusTaskId", statustask });
    history.push("/updatestatus");
  };
}
export function updatestatus1(taskId, status) {
  return dispatch => {
    var token = Cookies.get("tokencookie");
    if (token !== undefined) {
      var payload = {
        taskId: taskId,
        status: status
      };
      var apiBaseUrl = "http://localhost:8000/api/tasks/updatestatus";
      axios
        .post(apiBaseUrl, payload, { withCredentials: true })
        .then(function(response) {
          if (response.status === 200) {
            alert("Status Updated");
            history.push("/filtertasks");
          } else alert(response.data.error);
        })
        .catch(error => {
          if (error.response.status === 400 || error.response.status === 401) {
            alert(error.response.data.error);
            return false;
          } else if (error.response.status === 422) {
            var message = "";
            if (error.response.data.taskId)
              message += error.response.data.taskId;
            if (error.response.data.status)
              message += error.response.data.status;
            alert(message);
            return false;
          } else {
            alert(error.message);
            return false;
          }
        });
    }
  };
}
export function deleteuser(email, email1, name, role, createdby, currentPage) {
  return dispatch => {
    var token = Cookies.get("tokencookie");
    if (token !== undefined) {
      var payload = {
        email: email
      };
      var apiBaseUrl = "http://localhost:8000/api/users/delete";
      axios
        .post(apiBaseUrl, payload, { withCredentials: true })
        .then(function(response) {
          if (response.status === 200) {
            alert("User Deleted");
            dispatch(delayfilter(email1, name, role, createdby, currentPage));
          } else alert(response.data.error);
        })
        .catch(error => {
          if (error.response.status === 400 || error.response.status === 401) {
            alert(error.response.data.error);
            return false;
          } else {
            alert(error.message);
            return false;
          }
        });
    }
  };
}
export function deletetask(
  taskId,
  title,
  assignee,
  assignor,
  status,
  currentPage,
  start_date,
  end_date
) {
  return dispatch => {
    var token = Cookies.get("tokencookie");
    if (token !== undefined) {
      var payload = {
        taskId: taskId
      };
      var apiBaseUrl = "http://localhost:8000/api/tasks/delete";
      axios
        .post(apiBaseUrl, payload, { withCredentials: true })
        .then(function(response) {
          if (response.status === 200) {
            alert("Task Deleted");
            dispatch(
              delaytaskfilter(
                title,
                assignee,
                assignor,
                status,
                currentPage,
                start_date,
                end_date
              )
            );
          } else alert(response.data.error);
        })
        .catch(error => {
          if (error.response.status === 400 || error.response.status === 401)
            alert(error.response.data.error);
          else alert(error.message);
        });
    }
  };
}
export function forgotpassword(email) {
  var payload = {
    email: email
  };
  var apiBaseUrl = "http://localhost:8000/api/users/forgotpassword/?email=";
  axios
    .get(apiBaseUrl + email, { withCredentials: true })
    .then(function(response) {
      if (response.status === 200) {
        history.push("/login");
        alert("A mail has been sent with a reset link");
      } else alert(response.data.error);
    })
    .catch(error => {
      if (error.message.includes("422")) alert("Incorrect Mail Format");
      else if (error.response.status === 400 || error.response.status === 401)
        alert(error.response.data.error);
      else {
        alert(error.message);
      }
    });
}
export function resetpassword(email, password, confirmpassword, token) {
  if (token) {
    var payload = {
      email: email,
      newpassword: password,
      confirmpassword: confirmpassword,
      token: token
    };
    var apiBaseUrl = "http://localhost:8000/api/users/passwordreset";
    axios
      .post(apiBaseUrl, payload, { withCredentials: true })
      .then(function(response) {
        if (response.status === 200) {
          alert("Password reset successful");
          history.push("/login");
        } else alert(response.data.error);
      })
      .catch(error => {
        if (error.response.status === 400 || error.response.status === 401) {
          alert(error.response.data.error);
          return false;
        } else if (error.message.includes("422")) {
          var message = "";
          if (error.response.data.email) message += error.response.data.email;
          if (error.response.data.newpassword)
            message += error.response.data.newpassword;
          if (error.response.data.confirmpassword)
            message += error.response.data.confirmpassword;
          alert(message);
          return false;
        } else {
          alert(error.message);
          return false;
        }
      });
  } else {
    history.push("/forgotpassword");
  }
}

export function delayfilter(email, name, role, createdby, currentPage) {
  return dispatch => {
    dispatch({ type: "loading" });
    setTimeout(() => {
      dispatch(filterusers(email, name, role, createdby, currentPage));
    }, 1500);
  };
}
export function setloading() {
  return dispatch => {
    dispatch({ type: "searching" });
  };
}
export function filterusers(email, name, role, createdby, currentPage) {
  return dispatch => {
    var token = Cookies.get("tokencookie");
    if (token !== undefined) {
      var query = {
        keymail: email,
        keyname: name,
        keycreatedby: createdby,
        keyrole: role
      };
      var apiBaseUrl = "http://localhost:8000/api/users/userlist/?";
      axios
        .get(
          apiBaseUrl +
            "keymail=" +
            email +
            "&keyname=" +
            name +
            "&keyrole=" +
            role +
            "&keycreatedby=" +
            createdby +
            "&page=" +
            currentPage,
          { withCredentials: true }
        )
        .then(function(response) {
          if (response.status === 200) {
            var users = [];
            users = response.data.listofusers.data;
            dispatch({ type: "GetUsersSuccess", users });
            var pagenumber = response.data.listofusers.last_page;
            dispatch({ type: "GetUsersSucesspage", pagenumber });
            dispatch({ type: "loadfinished" });
          } else {
            var error = "FetchFailed";
            history.push("/");
          }
        })
        .catch(error => {
          if (error.response.status === 400 || error.response.status === 401)
            alert(error.response.data.error);
          else alert(error.message);
        });
    }
  };
}
export function delaytaskfilter(
  title,
  assignee,
  assignor,
  status,
  currentPage,
  start_date,
  end_date
) {
  return dispatch => {
    dispatch({ type: "loading" });
    setTimeout(() => {
      dispatch(
        filtertasks(
          title,
          assignee,
          assignor,
          status,
          currentPage,
          start_date,
          end_date
        )
      );
    }, 1500);
  };
}
export function filtertasks(
  title,
  assignee,
  assignor,
  status,
  currentPage,
  start_date,
  end_date
) {
  return dispatch => {
    var token = Cookies.get("tokencookie");
    if (token !== undefined) {
      var query = {
        title: title,
        assignee: assignee,
        assignor: assignor,
        status: status,
        currentPage: currentPage,
        start_date: start_date,
        end_date: end_date
      };
      var apiBaseUrl = "http://localhost:8000/api/tasks/list/?";
      axios
        .get(
          apiBaseUrl +
            "keytitle=" +
            title +
            "&keyassignee=" +
            assignee +
            "&keyassignor=" +
            assignor +
            "&keystatus=" +
            status +
            "&page=" +
            currentPage +
            "&start_date=" +
            start_date +
            "&last_date=" +
            end_date,
          { withCredentials: true }
        )
        .then(function(response) {
          if (response.status === 200) {
            var tasks = [];
            tasks = response.data.listoftasks.data;
            dispatch({ type: "GetTasksSuccess", tasks });
            var taskpagenumber = response.data.listoftasks.last_page;
            dispatch({ type: "GetTasksSucesspage", taskpagenumber });
            dispatch({ type: "loadfinished" });
          } else {
            var error = "FetchFailed";
            history.push("/");
          }
        })
        .catch(error => {
          if (error.response.status === 400 || error.response.status === 401)
            alert(error.response.data.error);
          else alert(error.message);
        });
    }
  };
}
export function getdashboard(condition) {
  return dispatch => {
    var token = Cookies.get("tokencookie");
    if (token !== undefined) {
      var apiBaseUrl = "http://localhost:8000/api/tasks/dashboardstats/?";

      axios
        .get(apiBaseUrl + "condition=this year", { withCredentials: true })
        .then(function(response) {
          if (response.status === 200) {
            var barstats = [];
            barstats = response.data.barstats;
            var piestats = [];
            piestats = response.data.piestats;
            var series = response.data.piestats;
            dispatch({ type: "GetPieStats", piestats });
            dispatch({ type: "GetBarStats", barstats });
          } else {
            var error = "FetchFailed";
            history.push("/");
          }
        })
        .catch(error => {
          if (error.response.status === 400 || error.response.status === 401)
            alert(error.response.data.error);
          else alert(error.message);
        });
    }
  };
}
export function getdashboardtasks() {
  return dispatch => {
    var token = Cookies.get("tokencookie");
    if (token !== undefined) {
      var apiBaseUrl = "http://localhost:8000/api/tasks/tasksondashboard/?";

      axios
        .get(apiBaseUrl, { withCredentials: true })
        .then(function(response) {
          if (response.status === 200) {
            var owntasks = [];
            owntasks = response.data.tasks.data;
            dispatch({ type: "GetOwnTasks", owntasks });
          } else {
            var error = "FetchFailed";
            history.push("/");
          }
        })
        .catch(error => {
          if (error.response.status === 400 || error.response.status === 401)
            alert(error.response.data.error);
          else alert(error.message);
        });
    }
  };
}
