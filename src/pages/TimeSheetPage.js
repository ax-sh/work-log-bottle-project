import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TimeSheetPage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const logRef = React.useRef({});
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());

  const createLog = (event) => {
    event.preventDefault();
    const target = event.target;
    const remarks = target.querySelector("[name=remarks]").value;
    console.log(logRef.current);

    const date = dayjs().format("DD/MM/YYYY");
    const log = {
      date,
      start_time: dayjs(startTime).format("HH:MM"),
      end_time: dayjs(endTime).format("HH:MM"),
      remarks,
    };
    dispatch({ type: "CREATE_LOG", log });
  };

  const userLogMapper = (i) => (
    <div className="user-log">
      <div>{i.date}</div>
      <div>{i.remarks}</div>
      <div>{`${i.start_time} > ${i.end_time}`}</div>
    </div>
  );
  return (
    <div className="form-container">
      <div class="time-form-container">
        <form onSubmit={createLog}>
          <input name="remarks" type="text" placeholder="What are you doing?" />
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
        {state && state.logs && state.logs.map(userLogMapper)}
        <pre>{JSON.stringify(state, null, 4)}</pre>
      </div>
    </div>
  );
};

export default TimeSheetPage;