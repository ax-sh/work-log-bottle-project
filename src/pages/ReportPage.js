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
      {selected === "1D" && <div>1D</div>}
      {selected === "1W" && <div>1W</div>}
      {selected === "1M" && <div>1M</div>}
    </div>
  );
};

export default ReportPage;
