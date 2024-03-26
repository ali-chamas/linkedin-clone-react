import React, { useEffect, useState } from "react";
import PostInput from "./components/PostInput";
import "./style.css";

import Post from "../../components/Post";

import SearchBar from "../../components/SearchBar";
import { apiURL } from "../../apiURL/apiURL";
const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch(`${apiURL}/posts/postsApi.php`);
    const data = await res.json();
    setPosts(data.posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <section className="flex column align-center gap home-section">
      <div className="mobile-searchBar">
        <SearchBar />
      </div>

      <PostInput fetchPosts={fetchPosts} />
      <div className="flex align-center">
        <div className="filter"></div>
        <select>
          <option value="top">top</option>
          <option value="recent">recent</option>
        </select>
      </div>
      {posts && posts.length > 0
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
