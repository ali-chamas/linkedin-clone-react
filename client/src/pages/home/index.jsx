import React from "react";
import PostInput from "./components/PostInput";
import "./style.css";
import posts from "../../schemas/posts.json";
import Post from "../../components/Post";

const Home = () => {
  return (
    <div className="flex column align-center gap">
      <PostInput />
      <div className="flex align-center">
        <div className="filter"></div>
        <select>
          <option value="top">top</option>
          <option value="recent">recent</option>
        </select>
      </div>
      {posts.length > 0
        ? posts.map((post, i) => <Post post={post} key={i} />)
        : "No posts yet"}
    </div>
  );
};

export default Home;
