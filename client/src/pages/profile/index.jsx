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

import AddJobPopup from "./components/AddJobPopup.jsx";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [followings, setFollowings] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  if (!user) {
    window.location.assign("/auth");
  }
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramID = queryParams.get("id");

  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [posts, setPosts] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [profileUser, setProfileUser] = useState({});

  const fetchFollowers = async () => {
    try {
      const res = await fetch(
        `${apiURL}/followings/getFollowers.php?id=${profileUser.id}`
      );
      const data = await res.json();
      if (data.status == "success") {
        setFollowers(data.followers);
        getFollowersCount();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getFollowersCount = () => {
    setFollowersCount(followers.length);
  };

  const fetchFollowings = async () => {
    try {
      const res = await fetch(
        `${apiURL}/followings/getFollowings.php?id=${user.id}`
      );
      const data = await res.json();
      if (data.status == "success") {
        setFollowings(data.followings);
        checkFollowing();
      }
    } catch (error) {
      setFollowings([]);
      console.log(error);
    }
  };

  const checkFollowing = () => {
    for (let i = 0; i < followings.length; i++) {
      if (followings[i].following == profileUser.id) {
        setIsFollowed(true);
        break;
      } else {
        setIsFollowed(false);
      }
    }
  };

  const followUser = async () => {
    const follow = new FormData();
    follow.append("follower", user.id);
    follow.append("following", profileUser.id);
    try {
      const res = await fetch(`${apiURL}/followings/followUser.php`, {
        method: "POST",
        body: follow,
      });
      const data = await res.json();

      await fetchFollowings();
      checkFollowing();
    } catch (error) {
      console.log(error);
    }
  };
  const unfollowUser = async () => {
    try {
      const res = await fetch(
        `${apiURL}/followings/unfollowUser.php?follower=${user.id}&following=${profileUser.id}`
      );
      const data = await res.json();

      await fetchFollowings();
      checkFollowing();
    } catch (error) {
      console.log(error);
    }
  };

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
      setExperiences([]);
      console.log(error);
    }
  };
  const fetchEducations = async () => {
    try {
      const res = await fetch(
        `${apiURL}/educations/educationsApi.php?userID=${paramID}`
      );
      const data = await res.json();
      if (data.status == "success") {
        setEducations(data.educations);
      }
    } catch (error) {
      setEducations([]);
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
      setSkills([]);
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
      setPosts([]);
      console.log(error);
    }
  };
  const fetchJobs = async () => {
    if (isCompany)
      try {
        const res = await fetch(`${apiURL}/jobs/jobsApi.php?userID=${paramID}`);
        const data = await res.json();
        if (data.status == "success") {
          setJobs(data.jobs);
        }
      } catch (error) {
        setJobs([]);
        console.log(error);
      }
  };

  const deleteExp = async (id) => {
    try {
      const res = await fetch(
        `${apiURL}/experiences/experiencesApi.php?id=${id}`,
        {
          method: "DELETE",
        }
      );
      fetchExperience();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteSkill = async (id) => {
    try {
      const res = await fetch(`${apiURL}/skills/skillsApi.php?id=${id}`, {
        method: "DELETE",
      });
      fetchSkills();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteEdu = async (id) => {
    try {
      const res = await fetch(
        `${apiURL}/educations/educationsApi.php?id=${id}`,
        {
          method: "DELETE",
        }
      );
      fetchEducations();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteJob = async (id) => {
    try {
      const res = await fetch(`${apiURL}/jobs/jobsApi.php?id=${id}`, {
        method: "DELETE",
      });
      fetchJobs();
    } catch (error) {
      console.log(error);
    }
  };
  const deletePosts = async (id) => {
    try {
      const res = await fetch(`${apiURL}/posts/postsApi.php?id=${id}`, {
        method: "DELETE",
      });
      fetchPosts();
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
    fetchEducations();
  }, []);

  useEffect(() => {
    fetchFollowings();
    fetchFollowers();
  }, [followings.length, followers.length]);

  useEffect(() => {
    if (user.id == paramID) {
      setSignedinUser(true);
    }
    if (profileUser.role == "company") {
      setIsCompany(true);
    }
  }, [profileUser]);
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
              <h3 className="text-primary">{followersCount} Followers</h3>
            </div>
            <div className="flex gap align-center ">
              {signedinUser ? (
                <button className="btn-style bg-blue text-white">
                  Add profile section
                </button>
              ) : isFollowed ? (
                <button
                  className="btn-style bg-primary border-blue text-primary flex align-center small-gap"
                  onClick={unfollowUser}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="btn-style bg-blue text-white flex align-center small-gap"
                  onClick={followUser}
                >
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
                {experiences &&
                  experiences.length > 0 &&
                  experiences.map((ex, i) => (
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
                        <p
                          className="text-gray  edit-img"
                          onClick={() => deleteExp(ex.id)}
                        >
                          <FaTrash />
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            </div>

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
                {skills &&
                  skills.length > 0 &&
                  skills.map((skill, i) => (
                    <div className="flex justify-between align-center">
                      <p className="w-full">{skill.skill}</p>
                      {signedinUser && (
                        <p
                          className="text-gray  edit-img"
                          onClick={() => deleteSkill(skill.id)}
                        >
                          <FaTrash />
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            </div>

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
                {educations &&
                  educations.length > 0 &&
                  educations.map((ex, i) => (
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
                        <p
                          className="text-gray  edit-img"
                          onClick={() => deleteEdu(ex.id)}
                        >
                          <FaTrash />
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
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
              {jobs &&
                jobs.length > 0 &&
                jobs.map((job, i) => (
                  <div className="flex justify-between">
                    <Job job={job} key={i} />
                    {signedinUser && (
                      <p
                        className="text-gray  edit-img"
                        onClick={() => deleteJob(job.id)}
                      >
                        <FaTrash />
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
        {posts &&
          posts.length > 0 &&
          posts.map((post, i) => (
            <div className="posts-container">
              <Post post={post} key={i} />
              {signedinUser && (
                <p
                  className="text-gray  edit-img"
                  onClick={() => deletePosts(post.id)}
                >
                  <FaTrash />
                </p>
              )}
            </div>
          ))}
      </section>
      {openEditInfo && (
        <InfoPopup
          setOpen={setOpenEditInfo}
          user={user}
          fetchUser={fetchUser}
        />
      )}
      {openEditExperience && (
        <ExperiencePopup
          setOpen={setOpenEditExperience}
          user={user}
          fetchExp={fetchExperience}
        />
      )}
      {openEditSkill && (
        <SkillPopup
          setOpen={setOpenEditSkill}
          user={user}
          fetchSkills={fetchSkills}
        />
      )}
      {openEditEducation && (
        <EducationPopup
          setOpen={setOpenEditEducation}
          user={user}
          fetchEducations={fetchEducations}
        />
      )}
      {openEditJob && (
        <AddJobPopup
          setOpen={setOpenEditJob}
          user={user}
          fetchJobs={fetchJobs}
        />
      )}
    </>
  );
};

export default Profile;
