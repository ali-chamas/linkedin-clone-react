import React, { useContext, useState } from "react";
import { apiURL } from "../../../apiURL/apiURL";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
const Signup = ({ setIsLogin }) => {
  const { login } = useContext(UserContext);
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const signup = async () => {
    if (email == "" || password == "" || name == "" || role == "") {
      setError("please fill all fields");
    } else {
      const user = new FormData();
      user.append("name", name);
      user.append("email", email);
      user.append("password", password);
      user.append("role", role);

      try {
        const res = await fetch(`${apiURL}/users/signup.php`, {
          method: "POST",
          body: user,
        });
        const data = await res.json();
        if (data.status == "success") {
          login(data.user);
          nav("/");
        } else {
          setError("email already taken");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-primary p flex column gap auth-card align-center">
      <h3 className="text-primary">Hello there</h3>
      <div className="flex column">
        <label>Name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="flex column">
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="flex column">
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <select
        className=" bg-secondary"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="company">Company</option>
      </select>
      <button className="btn-style bg-blue text-white" onClick={signup}>
        Signup
      </button>
      <small className="text-danger">{error}</small>
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
