import React, { useContext } from "react";
import { MdPermMedia } from "react-icons/md";
import { UserContext } from "../../../context/UserContext";
const PostInput = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-primary  p flex column border-radius  post-input gap">
      <div className="flex gap">
        <img src={user.image} alt="" className="posts-profile-img" />
        <input
          type="text"
          placeholder="What's on your mind "
          className="w-full input-style "
        />
      </div>
      <div className="flex justify-between ">
        <label
          htmlFor="image-input"
          className="flex gap align-center media-input "
        >
          <p className="text-primary ">
            <MdPermMedia />
          </p>

          <p className="text-primary">Media</p>
          <input type="file" style={{ display: "none" }} id="image-input" />
        </label>
        <button className="btn-style bg-blue text-white ">Post</button>
      </div>
    </div>
  );
};

export default PostInput;
