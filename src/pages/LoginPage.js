import { useSelector, useDispatch } from "react-redux";

const LoginPage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  const onClick = (currentUser) => {
    // console.log(user);
    dispatch({ type: "SET_CURRENT_USER", currentUser });
  };

  // React.use
  return (
    <div className="login-container container">
      {/* <form id="login-form" onSubmit={onSubmit}>
        <div>
          <input type="text" placeholder="username" />
        </div>
        <div>
          <input type="password" placeholder="password" />
          <input type="submit" value="Login" />
        </div>
      </form> */}
      {console.log(state)}
      {state?.employees.map((i) => (
        <div>
          <button onClick={() => onClick(i)}>{i.name + " "}</button>
          {i.isAdmin ? "admin" : "user"}
        </div>
      ))}
    </div>
  );
};

export default LoginPage;
