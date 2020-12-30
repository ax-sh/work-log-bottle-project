import { useSelector, useDispatch } from "react-redux";
import React from "react";

const ReportPage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState("1D");

  const onClick = ({ target }) => {
    setSelected(target.value);
    console.log({ selected });
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
          {state?.logs.map((i) => (
            <div>{JSON.stringify(i)}</div>
          ))}
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
