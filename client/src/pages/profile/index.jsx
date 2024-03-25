import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./style.css";
import { MdEdit } from "react-icons/md";
import { FaCamera } from "react-icons/fa";

import Post from "../../components/Post";
import { IoIosAdd } from "react-icons/io";
import Job from "../../components/Job";
import InfoPopup from "./components/InfoPopup";
import ExperiencePopup from "./components/ExperiencePopup";
import SkillPopup from "./components/SkillPopup";
import EducationPopup from "./components/EducationPopup";
import { FaTrash } from "react-icons/fa";
import { apiURL } from "../../apiURL/apiURL";

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    window.location.assign("/auth");
  }
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramID = queryParams.get("id");

  useEffect(() => {
    if (user.id == paramID) {
      setSignedinUser(true);
    }
    if (user.role == "company") {
      setIsCompany(true);
    }
  }, []);

  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [posts, setPosts] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [profileUser, setProfileUser] = useState({});

  const fetchUser = async () => {
    try {
      const res = await fetch(`${apiURL}/users/getUser.php?id=${paramID}`);
      const data = await res.json();
      if (data.status == "success") {
        setProfileUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExperience = async () => {
    try {
      const res = await fetch(
        `${apiURL}/experiences/experiencesApi.php?userID=${paramID}`
      );
      const data = await res.json();
      if (data.status == "success") {
        setExperiences(data.experiences);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fethEducations = async () => {
    try {
      const res = await fetch(
        `${apiURL}/educations/educationsApi.php?userID=${paramID}`
      );
      const data = await res.json();
      if (data.status == "success") {
        setEducations(data.educations);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSkills = async () => {
    try {
      const res = await fetch(
        `${apiURL}/skills/skillsApi.php?userID=${paramID}`
      );
      const data = await res.json();
      if (data.status == "success") {
        setSkills(data.skills);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPosts = async () => {
    try {
      const res = await fetch(`${apiURL}/posts/postsApi.php?userID=${paramID}`);
      const data = await res.json();
      if (data.status == "success") {
        setPosts(data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchJobs = async () => {
    try {
      const res = await fetch(`${apiURL}/jobs/jobsApi.php?userID=${paramID}`);
      const data = await res.json();
      if (data.status == "success") {
        setJobs(data.jobs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchExperience();
    fetchJobs();
    fetchPosts();
    fetchSkills();
    fethEducations();
  }, []);

  const [signedinUser, setSignedinUser] = useState(false);
  const [isCompany, setIsCompany] = useState(false);

  //popups
  const [openEditInfo, setOpenEditInfo] = useState(false);
  const [openEditExperience, setOpenEditExperience] = useState(false);
  const [openEditSkill, setOpenEditSkill] = useState(false);
  const [openEditEducation, setOpenEditEducation] = useState(false);
  const [openEditJob, setOpenEditJob] = useState(false);

  return (
    <>
      <section className="flex column gap align-center profile-section">
        <div className="flex column gap profile-info border-radius bg-primary">
          <img src={profileUser.cover} alt="" />
          {signedinUser && (
            <div>
              <label
                htmlFor="cover-input"
                className="edit-cover btn-style text-primary bg-primary flex center"
              >
                <FaCamera />
              </label>
              <input type="file" style={{ display: "none" }} id="cover-input" />
            </div>
          )}
          <div className="profile-img flex column gap">
            <div className="flex w-full justify-between">
              <img src={profileUser.image} alt="" />
              {signedinUser && (
                <span
                  className="text-gray large-font edit-img"
                  onClick={() => setOpenEditInfo(true)}
                >
                  <MdEdit />
                </span>
              )}
            </div>
            <div className="flex column  small-gap">
              <h2>{profileUser.name}</h2>
              <p>{profileUser.position}</p>
              <p className="text-gray">{profileUser.location}</p>
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
          </div>
          <p className="text-gray">{profileUser.bio}</p>
        </div>
        {!isCompany ? (
          <div className="flex column gap">
            {experiences.length > 0 && (
              <div className="flex column gap border-radius bg-primary p ">
                <div className="flex justify-between">
                  <h2>Experience:</h2>
                  {signedinUser && (
                    <p
                      className="text-gray large-font edit-img"
                      onClick={() => setOpenEditExperience(true)}
                    >
                      +
                    </p>
                  )}
                </div>

                <div className="flex column gap">
                  {experiences.map((ex, i) => (
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
                        <p className="text-gray  edit-img">
                          <FaTrash />
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {skills.length > 0 && (
              <div className="flex column gap border-radius bg-primary p ">
                <div className="flex justify-between">
                  <h2>Skills:</h2>
                  {signedinUser && (
                    <p
                      className="text-gray large-font edit-img"
                      onClick={() => setOpenEditSkill(true)}
                    >
                      +
                    </p>
                  )}
                </div>
                <div className="flex column gap">
                  {skills.map((skill, i) => (
                    <div className="flex justify-between align-center">
                      <p className="w-full">{skill.skill}</p>
                      {signedinUser && (
                        <p className="text-gray  edit-img">
                          <FaTrash />
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {educations.length > 0 && (
              <div className="flex column gap border-radius bg-primary p ">
                <div className="flex justify-between">
                  <h2>Education:</h2>
                  {signedinUser && (
                    <p
                      className="text-gray large-font edit-img"
                      onClick={() => setOpenEditEducation(true)}
                    >
                      +
                    </p>
                  )}
                </div>
                <div className="flex column gap">
                  {educations.map((ex, i) => (
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
                        <p className="text-gray  edit-img">
                          <FaTrash />
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
                {signedinUser && (
                  <p
                    className="text-gray large-font edit-img"
                    onClick={() => setOpenEditJob(true)}
                  >
                    +
                  </p>
                )}
              </div>
              <div className="flex column gap">
                {jobs.map((job, i) => (
                  <div className="flex justify-between">
                    <Job job={job} key={i} />
                    {signedinUser && (
                      <p className="text-gray  edit-img">
                        <FaTrash />
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
      {openEditInfo && <InfoPopup setOpen={setOpenEditInfo} user={user} />}
      {openEditExperience && (
        <ExperiencePopup setOpen={setOpenEditExperience} user={user} />
      )}
      {openEditSkill && <SkillPopup setOpen={setOpenEditSkill} user={user} />}
      {openEditEducation && (
        <EducationPopup setOpen={setOpenEditEducation} user={user} />
      )}
    </>
  );
};

export default Profile;
