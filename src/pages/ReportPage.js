import { useSelector, useDispatch } from "react-redux";
import React from "react";
import dayjs from "dayjs";

const ReportPage = () => {
  const state = useSelector((state) => state);
  // const dispatch = useDispatch();
  const [selected, setSelected] = React.useState("1D");

  const onClick = ({ target }) => {
    setSelected(target.value);
    console.log({ selected });
  };

  // makes the work log time to a much more manageable
  // formatted in hours
  const serializeLogs = (logs) => {
    const newLogs = {};
    logs.forEach((i) => {
      const e = state?.employees.find((x) => i.employeeId === x.id).name;
      // const e = i.employeeId;
      if (!newLogs[e]) {
        newLogs[e] = {};
      }
      if (!newLogs[e][i.date]) {
        newLogs[e][i.date] = 0;
      }

      const ft = dayjs(`2000-01-01 ${i.start_time}`);
      const tt = dayjs(`2000-01-01 ${i.end_time}`);
      const mins = tt.diff(ft, "minutes", true);
      const totalHours = parseFloat(mins / 60);

      newLogs[e][i.date] += totalHours;
    });
    return newLogs;
  };

  return (
    <div>
      <div className="time-interval-container">
        <input type="button" value="1D" onClick={onClick} />
        <input type="button" value="1W" onClick={onClick} />
        <input type="button" value="1M" onClick={onClick} />
      </div>
      {/* {JSON.stringify(state.logs)} */}
      {selected === "1D" && (
        <div>
          <h1>1D</h1>
          <pre>{JSON.stringify(serializeLogs(state?.logs), null, 4)}</pre>
          {/* {state?.logs.map((i) => (
            <div>{JSON.stringify(i)}</div>
          ))} */}
        </div>
      )}
      {selected === "1W" && (
        <div>
          <h1>1W</h1>
        </div>
      )}
      {selected === "1M" && (
        <div>
          <h1>1M</h1>
        </div>
      )}
    </div>
  );
};

export default ReportPage;
