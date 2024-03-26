import React, { useContext, useState } from "react";
import "./style.css";
import requests from "../../schemas/requests.json";
import Request from "./components/Request";
import { UserContext } from "../../context/UserContext";

const Following = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    window.location.assign("/auth");
  }

  const [activeFilter, setActiveFilter] = useState("followers");
  return (
    <section className="flex column gap align-center following-section">
      <div className="flex p bg-primary gap justify-evenly border-radius">
        <p
          className={`btn-style ${
            activeFilter == "followings"
              ? "bg-blue text-white"
              : "bg-white border-blue text-primary"
          }`}
          onClick={() => setActiveFilter("followings")}
        >
          Folowings
        </p>
        <p
          className={`btn-style ${
            activeFilter == "followers"
              ? "bg-blue text-white"
              : "bg-white border-blue text-primary"
          }`}
          onClick={() => setActiveFilter("followers")}
        >
          Followers
        </p>
      </div>

      {}
      {}
    </section>
  );
};

export default Following;
