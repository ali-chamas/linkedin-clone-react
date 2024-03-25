import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa6";

import { IoMdHome } from "react-icons/io";
import { HiUsers } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import { MdBusinessCenter } from "react-icons/md";
import { UserContext } from "../context/UserContext";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate(`/`);
  };

  const navigateFollowing = () => {
    navigate("/following");
  };

  const navigateJobs = () => {
    navigate("/jobs");
  };
  const { user } = useContext(UserContext);
  const path = window.location.pathname;

  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <div className="flex align-center justify-evenly gap navbar bg-primary">
      <div className="flex gap align-center">
        <p
          onClick={navigateHome}
          className={`logo cursor-pointer 
        `}
        >
          <FaLinkedin />
        </p>

        <div className="desktop-searchBar">
          <SearchBar />
        </div>
      </div>

      <div className="flex  align-center links-container">
        <p
          onClick={navigateHome}
          className={`large-font cursor-pointer ${
            path == "/" ? "text-black" : "text-gray"
          }`}
        >
          <IoMdHome />
        </p>
        <p
          onClick={navigateFollowing}
          className={`large-font cursor-pointer ${
            path == "/following" ? "text-black" : "text-gray"
          }`}
        >
          <HiUsers />
        </p>
        <p
          onClick={navigateJobs}
          className={`large-font cursor-pointer ${
            path == "/jobs" ? "text-black" : "text-gray"
          }`}
        >
          <MdBusinessCenter />
        </p>

        <div
          className="profile-dropdown-container flex column align-center"
          onClick={() => setOpenDropdown((open) => !open)}
        >
          <img src={user.image} alt="" />
          {openDropdown && <ProfileDropdown user={user} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
