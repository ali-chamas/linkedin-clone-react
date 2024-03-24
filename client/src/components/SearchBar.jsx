import React from "react";
import { FaSearch } from "react-icons/fa";
const SearchBar = () => {
  return (
    <div className=" bg-secondary  align-center gap search-bar ">
      <p className="nav-search">
        <FaSearch />
      </p>
      <input className=" text-gray" placeholder="Search" />
    </div>
  );
};

export default SearchBar;
