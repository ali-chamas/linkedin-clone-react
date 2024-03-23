import React, { useContext } from "react";
import { MdPermMedia } from "react-icons/md";
import { UserContext } from "../../../context/UserContext";
const PostInput = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-primary  p flex column border-radius  post-input gap">
      <div className="flex gap">
        <img src={user.img} alt="" className="profile-img" />
        <input
          type="text"
          placeholder="What's on your mind "
          className="w-full input-style "
        />
      </div>
      <div className="flex justify-between align-center">
        <div className="flex gap align-center media-input">
          <p className="text-primary">
            <MdPermMedia />
          </p>
          <p className="text-primary">Media</p>
        </div>
        <button className="btn-style bg-blue text-white ">Post</button>
      </div>
    </div>
  );
};

export default PostInput;
