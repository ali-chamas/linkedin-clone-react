import React from "react";

const Signup = ({ setIsLogin }) => {
  return (
    <div className="bg-primary p flex column gap auth-card align-center">
      <h3 className="text-primary">Hello there</h3>
      <div className="flex column">
        <label>Name</label>
        <input type="password" />
      </div>
      <div className="flex column">
        <label>Email</label>
        <input type="email" />
      </div>
      <div className="flex column">
        <label>Password</label>
        <input type="password" />
      </div>
      <select className=" bg-secondary">
        <option value="user">User</option>
        <option value="company">Company</option>
      </select>
      <button className="btn-style bg-blue text-white">Signup</button>
      <small className="text-gray">
        Already have an account?
        <span
          className="text-primary cursor-pointer"
          onClick={() => setIsLogin(true)}
        >
          Login
        </span>
      </small>
    </div>
  );
};

export default Signup;
