import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api";

const TimeSheetPage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [date, setDate] = React.useState(new Date());
  const [startTime, setStartTime] = React.useState(new Date());
  const [loading, setLoading] = React.useState(false);
  const [endTime, setEndTime] = React.useState(new Date());

  const createLog = (event) => {
    event.preventDefault();
    const target = event.target;
    const remarks = target.querySelector("[name=remarks]").value;

    const _date = dayjs(date).format("DD/MM/YYYY");
    const log = {
      date: _date,
      start_time: dayjs(startTime).format("HH:MM"),
      end_time: dayjs(endTime).format("HH:MM"),
      remarks,
      employeeId: state.currentUser.id,
    };

    setLoading(true);

    api
      .createLog(log)
      .then((x) => x.data)
      .then((log) => {
        dispatch({ type: "CREATE_LOG", log });
      })
      .catch(alert)
      .finally(() => {
        setLoading(false);
      });
  };

  const userLogMapper = (i) => (
    <div className="user-log">
      <div>{i.date}</div>
      <div>{i.remarks}</div>
      <div>{i.employeeId}</div>
      <div>{`${i.start_time} > ${i.end_time}`}</div>
    </div>
  );
  return (
    <div className="form-container">
      <div class="time-form-container">
        <form onSubmit={createLog}>
          <input name="remarks" type="text" placeholder="What are you doing?" />
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
          <DatePicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
          <DatePicker
            selected={endTime}
            onChange={(date) => setEndTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
          <input type="submit" value="Update" />
        </form>
      </div>
      <div>
        {loading && <div class="loading">loading...</div>}
        {state &&
          state.logs &&
          state.logs
            .filter((i) => i.employeeId === state?.currentUser?.id)
            .map(userLogMapper)}
        {/* <pre>{JSON.stringify(state, null, 4)}</pre> */}
      </div>
    </div>
  );
};

export default TimeSheetPage;
