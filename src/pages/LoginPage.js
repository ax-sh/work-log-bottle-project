import { useSelector, useDispatch } from "react-redux";
// import { SET_CURRENT_USER } from "../redux/actionTypes";

const LoginPage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const onClick = (currentUser) => {
    dispatch({ type: "SET_CURRENT_USER", currentUser });
  };
  return (
    <div className="login-container">
      {state?.employees.map((i) => (
        <div>
          <img src={i.image} alt="image" />
          <button onClick={() => onClick(i)}>{i.name + " "}</button>
          {i.isAdmin ? "admin" : "user"}
        </div>
      ))}
    </div>
  );
};

export default LoginPage;
