import { useSelector, useDispatch } from "react-redux";
import ProfileWrapper from "../components/ProfileWrapper";
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
        <ProfileWrapper {...i} onClick={onClick} />
      ))}
    </div>
  );
};

export default LoginPage;
