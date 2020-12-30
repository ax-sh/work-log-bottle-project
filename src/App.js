import React from "react";
import api from "./api";
import TimeSheetPage from "./pages/TimeSheetPage";
import ReportPage from "./pages/ReportPage";
import { useDispatch } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link to="/">Home </Link>
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
  }, []);
  return (
    <main>
      <Navbar />
      <Switch>
        <Route path="/" component={TimeSheetPage} exact />
        <Route path="/timesheet" component={TimeSheetPage} />
        <Route path="/report" component={ReportPage} />
      </Switch>
    </main>
  );
};

export default App;
