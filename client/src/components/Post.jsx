import React from "react";

const Post = ({ post }) => {
  return (
    <div className="flex column bg-primary border-radius p gap ">
      <div className="flex align-center gap">
        <img src={post.userImage} alt="" className="posts-profile-img" />
        <div className="flex column">
          <h2>{post.userName}</h2>
          <small className="text-gray">{post.userInfo}</small>
          <small className="text-gray">{post.createdAt}</small>
        </div>
      </div>
      <p>{post.description}</p>
      <img src={post.img} alt="" />
    </div>
  );
};

export default Post;
