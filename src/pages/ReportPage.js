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

  const dailyLogs = React.useMemo(() => serializeLogs(state?.logs), [
    state?.logs,
  ]);

  const chunker = (arr, size) =>
    arr.reduce(
      (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
      []
    );

  const batchLogsForIntervalOf = (logs, size) => {
    const o = {};
    Object.keys(logs).forEach((i) => {
      const batches = chunker(Object.entries(logs[i]), size).map((k, v) => {
        return {
          [v + 1]: k.reduce((state, [date, hours]) => hours + state, 0),
        };
      });
      o[i] = batches;
    });

    return o;
  };

  const batchLogsForAWeek = (logs) => {
    return batchLogsForIntervalOf(logs, 7);
  };

  const batchLogsForAMonth = (logs) => {
    return batchLogsForIntervalOf(logs, 30);
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
          <pre>{JSON.stringify(dailyLogs, null, 4)}</pre>
        </div>
      )}
      {selected === "1W" && (
        <div>
          <h1>1W</h1>
          <pre>{JSON.stringify(batchLogsForAWeek(dailyLogs), null, 4)}</pre>
        </div>
      )}
      {selected === "1M" && (
        <div>
          <h1>1M</h1>
          <pre>{JSON.stringify(batchLogsForAMonth(dailyLogs), null, 4)}</pre>
        </div>
      )}
    </div>
  );
};

export default ReportPage;
