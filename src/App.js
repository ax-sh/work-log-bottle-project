import React from "react";
import api from "./api";
import TimeSheetPage from "./pages/TimeSheetPage";
import ReportPage from "./pages/ReportPage";
import LoginPage from "./pages/LoginPage";
import { useDispatch } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link to="/login">Login </Link>
      <Link to="/report">Report</Link>
      <Link to="/timesheet">TimeSheet</Link>
    </div>
  );
}

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const employees = api.getAllEmployees();
    dispatch({ type: "UPDATE_EMPLOYEES", employees });

    api.getLogs().then((logs) => {
      console.log(logs);
      dispatch({ type: "UPDATE_LOGS", logs });
    });
  }, []);
  return (
    <main>
      <Navbar />
      <Switch>
        <Route path="/login" component={LoginPage} exact />
        <Route path="/timesheet" component={TimeSheetPage} />
        <Route path="/report" component={ReportPage} />
      </Switch>
    </main>
  );
};

export default App;
