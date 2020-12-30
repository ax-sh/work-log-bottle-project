const LoginPage = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <div>
      <form id="login-form" onSubmit={onSubmit}>
        <div>
          <input type="text" placeholder="username" />
        </div>
        <div>
          <input type="password" placeholder="password" />
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
