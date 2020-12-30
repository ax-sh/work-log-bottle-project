import React from "react";
import api from "./api";
import TimeSheetPage from "./pages/TimeSheetPage";
import ReportPage from "./pages/ReportPage";
import LoginPage from "./pages/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Switch, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      exact
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
        i.style.display = "inline-block";
      });
    } else {
      document.querySelectorAll(".auth-nav").forEach((i) => {
        i.style.display = "none";
      });
      document.querySelector("#login-nav").style.display = "inline-block";
    }
  }, [state]);

  const Navbar = () => (
    <nav>
      <Link id="login-nav" to="/login">
        Login
      </Link>
      <Link className="auth-nav" to="/report">
        Show All Users Time Logs
      </Link>
      <Link className="auth-nav" to="/timesheet">
        Create New Log
      </Link>
      <a
        id="logout-button"
        href="#"
        className="auth-nav"
        onClick={() => {
          dispatch({ type: "CLEAR_CURRENT_USER" });
        }}
      >
        Logout
      </a>
    </nav>
  );

  return (
    <main>
      <Navbar />
      {state?.currentUser?.name && (
        <div className="nav-profile-wrapper">
          <img src={state?.currentUser?.image} />
          <h1>
            Logged in as {state?.currentUser?.name}{" "}
            <span>({state?.currentUser?.isAdmin ? "admin" : "user"})</span>
          </h1>
        </div>
      )}
      <div className="container">
        <Switch>
          {!state?.currentUser?.name && (
            <Route path="/login" component={LoginPage} exact />
          )}
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
