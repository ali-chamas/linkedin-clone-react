import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./style.css";
import { MdEdit } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import posts from "../../schemas/posts.json";
import Post from "../../components/Post";
import { IoIosAdd } from "react-icons/io";

const Profile = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramID = queryParams.get("id");

  const { user } = useContext(UserContext);

  const [signedinUser, setSignedinUser] = useState(false);

  useEffect(() => {
    if (user.id == paramID) {
      setSignedinUser(true);
    }
  }, []);

  return (
    <section className="flex column gap align-center profile-section">
      <div className="flex column gap profile-info border-radius bg-primary">
        <img src={user.cover_img} alt="" />
        {user.id == paramID && (
          <button className="edit-cover btn-style text-primary bg-primary flex center">
            <FaCamera />
          </button>
        )}
        <div className="profile-img flex column gap">
          <div className="flex w-full justify-between">
            <img src={user.img} alt="" />
            {user.id == paramID && (
              <span className="text-gray large-font edit-img">
                <MdEdit />
              </span>
            )}
          </div>
          <div className="flex column  small-gap">
            <h2>{user.name}</h2>
            <p>{user.position}</p>
            <p className="text-gray">{user.location}</p>
            <h3 className="text-primary">440 followers</h3>
          </div>
          <div className="flex gap align-center ">
            {user.id == paramID ? (
              <button className="btn-style bg-blue text-white">
                Add profile section
              </button>
            ) : (
              <button className="btn-style bg-blue text-white flex align-center small-gap">
                Follow <IoIosAdd />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex column gap border-radius bg-primary p ">
        <div className="flex justify-between">
          <h2>Bio:</h2>
          {user.id == paramID && (
            <p className="text-gray large-font edit-img">
              <MdEdit />
            </p>
          )}
        </div>
        <p className="text-gray">{user.description}</p>
      </div>
      {user.role == "user" ? (
        <div className="flex column gap">
          {user.experience.length > 0 && (
            <div className="flex column gap border-radius bg-primary p ">
              <div className="flex justify-between">
                <h2>Experience:</h2>
                {user.id == paramID && (
                  <p className="text-gray large-font edit-img">
                    <MdEdit />
                  </p>
                )}
              </div>
              <div className="flex column gap">
                {user.experience.map((ex, i) => (
                  <div className="flex column small-gap" key={i}>
                    <h3>{ex.position}</h3>
                    <p>{ex.company}</p>
                    <small>
                      {ex.start_year}-{ex.end_year}
                    </small>
                    <small className="text-gray">{ex.description}</small>
                  </div>
                ))}
              </div>
            </div>
          )}
          {user.skills.length > 0 && (
            <div className="flex column gap border-radius bg-primary p ">
              <div className="flex justify-between">
                <h2>Skills:</h2>
                {user.id == paramID && (
                  <p className="text-gray large-font edit-img">
                    <MdEdit />
                  </p>
                )}
              </div>
              <div className="flex column gap">
                {user.skills.map((skill, i) => (
                  <p>{skill}</p>
                ))}
              </div>
            </div>
          )}
          {user.education.length > 0 && (
            <div className="flex column gap border-radius bg-primary p ">
              <div className="flex justify-between">
                <h2>Education:</h2>
                {user.id == paramID && (
                  <p className="text-gray large-font edit-img">
                    <MdEdit />
                  </p>
                )}
              </div>
              <div className="flex column gap">
                {user.education.map((ex, i) => (
                  <div className="flex column small-gap" key={i}>
                    <h3>{ex.major}</h3>
                    <p>{ex.university}</p>
                    <small>
                      {ex.start_year}-{ex.end_year}
                    </small>
                    <small className="text-gray">{ex.description}</small>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        user.jobs.length > 0 && (
          <div className="flex column gap border-radius bg-primary p ">
            <div className="flex justify-between">
              <h2>Experience:</h2>
              {user.id == paramID && (
                <p className="text-gray large-font edit-img">
                  <MdEdit />
                </p>
              )}
            </div>
            <div className="flex column gap">
              {user.experience.map((ex, i) => (
                <div className="flex column small-gap" key={i}>
                  <h3>{ex.position}</h3>
                  <p>{ex.company}</p>
                  <small>
                    {ex.start_year}-{ex.end_year}
                  </small>
                  <small className="text-gray">{ex.description}</small>
                </div>
              ))}
            </div>
          </div>
        )
      )}
      {posts.length > 0 &&
        posts.map((post, i) => (
          <div className="posts-container">
            <Post post={post} key={i} />
          </div>
        ))}
    </section>
  );
};

export default Profile;
