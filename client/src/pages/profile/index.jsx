import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./style.css";
import { MdEdit } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import posts from "../../schemas/posts.json";
import jobs from "../../schemas/jobs.json";
import Post from "../../components/Post";
import { IoIosAdd } from "react-icons/io";
import Job from "../../components/Job";

const Profile = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramID = queryParams.get("id");

  const { user } = useContext(UserContext);

  const [signedinUser, setSignedinUser] = useState(false);
  const [isCompany, setIsCompany] = useState(false);

  useEffect(() => {
    if (user.id == paramID) {
      setSignedinUser(true);
    }
    if (user.role == "company") {
      setIsCompany(true);
    }
  }, []);

  return (
    <section className="flex column gap align-center profile-section">
      <div className="flex column gap profile-info border-radius bg-primary">
        <img src={user.cover_img} alt="" />
        {signedinUser && (
          <button className="edit-cover btn-style text-primary bg-primary flex center">
            <FaCamera />
          </button>
        )}
        <div className="profile-img flex column gap">
          <div className="flex w-full justify-between">
            <img src={user.img} alt="" />
            {signedinUser && (
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
            {signedinUser ? (
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
          {signedinUser && (
            <p className="text-gray large-font edit-img">
              <MdEdit />
            </p>
          )}
        </div>
        <p className="text-gray">{user.description}</p>
      </div>
      {!isCompany ? (
        <div className="flex column gap">
          {user.experience.length > 0 && (
            <div className="flex column gap border-radius bg-primary p ">
              <div className="flex justify-between">
                <h2>Experience:</h2>
              </div>
              <div className="flex column gap">
                {user.experience.map((ex, i) => (
                  <div className="flex jusfity-between">
                    <div className="flex column small-gap w-full" key={i}>
                      <h3>{ex.position}</h3>
                      <p>{ex.company}</p>
                      <small>
                        {ex.start_year}-{ex.end_year}
                      </small>
                      <small className="text-gray">{ex.description}</small>
                    </div>
                    {signedinUser && (
                      <p className="text-gray large-font edit-img">
                        <MdEdit />
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {user.skills.length > 0 && (
            <div className="flex column gap border-radius bg-primary p ">
              <div className="flex justify-between">
                <h2>Skills:</h2>
              </div>
              <div className="flex column gap">
                {user.skills.map((skill, i) => (
                  <div className="flex justify-between align-center">
                    <p className="w-full">{skill}</p>
                    {signedinUser && (
                      <p className="text-gray large-font edit-img">
                        <MdEdit />
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {user.education.length > 0 && (
            <div className="flex column gap border-radius bg-primary p ">
              <div className="flex justify-between">
                <h2>Education:</h2>
              </div>
              <div className="flex column gap">
                {user.education.map((ex, i) => (
                  <div className="flex justify-between">
                    <div className="flex column small-gap w-full" key={i}>
                      <h3>{ex.major}</h3>
                      <p>{ex.university}</p>
                      <small>
                        {ex.start_year}-{ex.end_year}
                      </small>
                      <small className="text-gray">{ex.description}</small>
                    </div>
                    {signedinUser && (
                      <p className="text-gray large-font edit-img">
                        <MdEdit />
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        jobs.length > 0 && (
          <div className="flex column gap border-radius bg-primary p ">
            <div className="flex justify-between">
              <h2>Posted jobs:</h2>
            </div>
            <div className="flex column gap">
              {jobs.map((job, i) => (
                <div className="flex justify-between">
                  <Job job={job} key={i} />
                  {signedinUser && (
                    <p className="text-gray large-font edit-img">
                      <MdEdit />
                    </p>
                  )}
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
