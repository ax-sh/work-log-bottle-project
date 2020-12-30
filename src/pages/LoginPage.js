import { useSelector, useDispatch } from "react-redux";
import ProfileWrapper from "../components/ProfileWrapper";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  let history = useHistory();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const onClick = (currentUser) => {
    dispatch({ type: "SET_CURRENT_USER", currentUser });
    history.push("/");
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
