import React, { useContext, useState } from "react";
import img from "../../assets/login-img.svg";
import "./style.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { FaLinkedin } from "react-icons/fa6";
import { UserContext } from "../../context/UserContext";
const Auth = () => {
  const { user } = useContext(UserContext);
  if (user) {
    window.location.assign("/");
  }
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="flex column gap center auth">
      <div className="flex ">
        <h1>Linked</h1>
        <h3 className="text-primary">
          <FaLinkedin />
        </h3>
      </div>

      <div className="flex column gap center p auth-section">
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <Signup setIsLogin={setIsLogin} />
        )}

        <img src={img} alt="" />
      </div>
    </section>
  );
};

export default Auth;
