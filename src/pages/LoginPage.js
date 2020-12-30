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
        <div className="profile-wrapper">
          <img src={i.image} alt="image" />
          <span>{i.isAdmin ? "admin" : "user"}</span>
          <button onClick={() => onClick(i)}>Login as {i.name}</button>
        </div>
      ))}
    </div>
  );
};

export default LoginPage;
