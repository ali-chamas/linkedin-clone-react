import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { apiURL } from "../../apiURL/apiURL";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Following = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  if (!user) {
    window.location.assign("/auth");
  }
  const [allUsers, setAllUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${apiURL}/users/getAllUsers.php`);
      const data = await res.json();
      setAllUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className="flex column gap align-center following-section ">
      <div className="flex column p bg-primary gap justify-evenly border-radius">
        {allUsers &&
          allUsers.length &&
          allUsers.map(
            (u, i) =>
              u.id != user.id && (
                <div
                  className="flex gap w-full justify-between align-center p cursor-pointer user-card"
                  key={i}
                  onClick={() => navigate(`/profile?id=${u.id}`)}
                >
                  <div className="flex gap">
                    <img src={u.image} className="" alt="" />
                    <div className="flex column small-gap">
                      <h3>{u.name}</h3>
                      <p>{u.position}</p>
                    </div>
                  </div>
                </div>
              )
          )}
      </div>
    </section>
  );
};

export default Following;
