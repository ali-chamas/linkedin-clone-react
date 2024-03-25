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

  const [activeFilter, setActiveFilter] = useState("requests");
  return (
    <section className="flex column gap align-center following-section">
      <div className="flex p bg-primary gap justify-evenly border-radius">
        <p
          className={`btn-style ${
            activeFilter == "requests"
              ? "bg-blue text-white"
              : "bg-white border-blue text-primary"
          }`}
          onClick={() => setActiveFilter("requests")}
        >
          Requests
        </p>
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

      {activeFilter == "requests" && requests.length > 0
        ? requests.map((req, i) => (
            <div className="bg-primary p flex column gap border-radius" key={i}>
              <Request request={req} />
            </div>
          ))
        : "No Requests"}
      {}
      {}
    </section>
  );
};

export default Following;
