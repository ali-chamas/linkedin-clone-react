import React from "react";
import PostInput from "./components/PostInput";
import "./style.css";
import posts from "../../schemas/posts.json";
import Post from "../../components/Post";
import SearchBar from "../../components/SearchBar";

const Home = () => {
  return (
    <section className="flex column align-center gap home-section">
      <div className="mobile-searchBar">
        <SearchBar />
      </div>

      <PostInput />
      <div className="flex align-center">
        <div className="filter"></div>
        <select>
          <option value="top">top</option>
          <option value="recent">recent</option>
        </select>
      </div>
      {posts.length > 0
        ? posts.map((post, i) => (
            <div key={i} className="post-style">
              <Post post={post} key={i} />
            </div>
          ))
        : "No posts yet"}
    </section>
  );
};

export default Home;
