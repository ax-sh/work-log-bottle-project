import React from "react";
import api from "./api";
import TimeSheetPage from "./pages/TimeSheetPage";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const employees = api.getAllEmployees();
    dispatch({ type: "UPDATE_EMPLOYEES", employees });
  }, []);
  return (
    <div className="app">
      <TimeSheetPage />
    </div>
  );
};

export default App;
