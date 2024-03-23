import React, { useContext } from "react";

import { FaLinkedin } from "react-icons/fa6";

import { IoMdHome } from "react-icons/io";
import { HiUsers } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import { MdBusinessCenter } from "react-icons/md";
import { UserContext } from "../context/UserContext";
const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex align-center justify-evenly gap navbar bg-primary">
      <div className="flex gap align-center">
        <a href="/" className="logo">
          <FaLinkedin />
        </a>
        <SearchBar />
      </div>

      <div className="flex  align-center links-container">
        <a href="/" className="large-font ">
          <IoMdHome />
        </a>
        <a href="/" className="large-font">
          <HiUsers />
        </a>
        <a href="/" className="large-font">
          <MdBusinessCenter />
        </a>

        <a href={`/profile/?id=${user.id}`}>
          <img src={user.img} alt="" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
