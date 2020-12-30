import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api";

const CreateLogPage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [date, setDate] = React.useState(new Date());
  const [startTime, setStartTime] = React.useState(new Date());
  const [loading, setLoading] = React.useState(false);
  const [endTime, setEndTime] = React.useState(new Date());

  const createLog = (event) => {
    event.preventDefault();
    const target = event.target;
    const remarks = target.querySelector("[name=remarks]").value.trim();

    if (!remarks) {
      alert("Remarks cant be left empty");
      return;
    }

    // TODO sanitize the data
    // make sure that the stat time is older than the end time

    const log = {
      date,
      start_time: startTime,
      end_time: endTime,
      remarks,
      employeeId: state.currentUser.id,
    };
    log.date = dayjs(log.date).format("DD/MM/YYYY");
    log.start_time = dayjs(log.start_time).format("HH:mm");
    log.end_time = dayjs(log.end_time).format("HH:mm");

    setLoading(true);

    api
      .createLog(log)
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
          <input
            className="remarks-text-box"
            name="remarks"
            type="text"
            placeholder="What ware you doing?"
          />
          <div className="time-picker-container">
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
          </div>

          <input type="submit" value="Update" />
        </form>
      </div>
      <div>
        {loading && <div class="loading">loading...</div>}
        {state &&
          state.logs &&
          state.logs
            .filter((i) => i.employeeId === state?.currentUser?.id) //not recommending to do this in real projects
            .map(userLogMapper)}
      </div>
    </div>
  );
};

export default CreateLogPage;
