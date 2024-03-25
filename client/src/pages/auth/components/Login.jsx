import React from "react";

const Login = ({ setIsLogin }) => {
  return (
    <div className="bg-primary p flex column gap auth-card align-center">
      <h3 className="text-primary">Welcome back</h3>
      <div className="flex column">
        <label>Email</label>
        <input type="email" />
      </div>
      <div className="flex column">
        <label>Password</label>
        <input type="password" />
      </div>
      <button className="btn-style bg-blue text-white">Login</button>
      <small className="text-gray">
        new here?
        <span
          className="text-primary cursor-pointer"
          onClick={() => setIsLogin(false)}
        >
          Signup
        </span>
      </small>
    </div>
  );
};

export default Login;
