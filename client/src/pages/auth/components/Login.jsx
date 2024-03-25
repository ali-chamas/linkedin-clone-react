import React, { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiURL } from "../../../apiURL/apiURL";

const Login = ({ setIsLogin }) => {
  const { login } = useContext(UserContext);
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (email == "" || password == "") {
      setError("please fill all fields");
    } else {
      const user = new FormData();

      user.append("email", email);
      user.append("password", password);

      try {
        const res = await fetch(`${apiURL}/users/login.php`, {
          method: "POST",
          body: user,
        });
        const data = await res.json();
        if (data.status == "success") {
          login(data.user);
          nav("/");
        } else {
          setError("wrong email or password");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-primary p flex column gap auth-card align-center">
      <h3 className="text-primary">Welcome back</h3>
      <div className="flex column">
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="flex column">
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button
        type="button"
        className="btn-style bg-blue text-white"
        onClick={handleLogin}
      >
        Login
      </button>
      <small className="text-danger">{error}</small>
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
