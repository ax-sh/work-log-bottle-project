import React from "react";
import api from "./api";
import TimeSheetPage from "./pages/TimeSheetPage";
import ReportPage from "./pages/ReportPage";
import LoginPage from "./pages/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Switch, Redirect } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link id="login-nav" to="/login">
        Login{" "}
      </Link>
      <Link className="auth-nav" to="/report">
        Report
      </Link>
      <Link className="auth-nav" to="/timesheet">
        TimeSheet
      </Link>
    </div>
  );
}

function PrivateRoute({ component: Component, authed, ...rest }) {
  // if (!authed) {
  //   alert("Please Login ");
  // }
  return (
    <Route
      {...rest}
      render={(props) =>
        authed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  React.useEffect(() => {
    const employees = api.getAllEmployees();
    dispatch({ type: "UPDATE_EMPLOYEES", employees });

    api.getLogs().then((logs) => {
      dispatch({ type: "UPDATE_LOGS", logs });
    });
  }, [dispatch]);

  React.useEffect(() => {
    if (state?.currentUser?.name) {
      document.querySelector("#login-nav").style.display = "none";
      document.querySelectorAll(".auth-nav").forEach((i) => {
        i.style.display = "inherit";
      });
    } else {
      document.querySelectorAll(".auth-nav").forEach((i) => {
        i.style.display = "none";
      });
      document.querySelector("#login-nav").style.display = "inherit";
    }
  }, [state]);
  return (
    <main>
      <Navbar />
      <div className="container">
        <Switch>
          {!state?.currentUser?.name && (
            <Route path="/login" component={LoginPage} exact />
          )}
          {/* <Route path="/timesheet" component={TimeSheetPage} /> */}
          {/* <Route path="/report" component={ReportPage} /> */}
          <PrivateRoute
            authed={state?.currentUser?.name}
            path="/timesheet"
            component={TimeSheetPage}
          />
          <PrivateRoute
            authed={state?.currentUser?.name}
            path="/report"
            component={ReportPage}
          />
        </Switch>
      </div>
    </main>
  );
};

export default App;
