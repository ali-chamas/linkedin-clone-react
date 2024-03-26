import React, { useContext, useState } from "react";
import { MdPermMedia } from "react-icons/md";
import { UserContext } from "../../../context/UserContext";
import { apiURL } from "../../../apiURL/apiURL";
const PostInput = ({ fetchPosts }) => {
  const { user } = useContext(UserContext);

  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [base64Img, setBase64IMG] = useState("");

  const handleChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64Image = e.target.result;

      setImg(base64Image);
    };

    reader.readAsDataURL(file);
  };
  console.log(img);
  const handleUpload = async () => {
    const post = new FormData();
    post.append("description", desc);
    post.append("image", img);
    post.append("userID", user.id);
    try {
      const res = await fetch(`${apiURL}/posts/postsApi.php`, {
        method: "POST",
        body: post,
      });
      const data = await res.json();
      console.log(data);
      await fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-primary  p flex column border-radius  post-input gap">
      <div className="flex gap">
        <img src={user.image} alt="" className="posts-profile-img" />
        <input
          type="text"
          placeholder="What's on your mind "
          className="w-full input-style "
          onChange={(e) => setDesc(e.target.value)}
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
          <input
            type="file"
            style={{ display: "none" }}
            id="image-input"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </label>
        <button
          className="btn-style bg-blue text-white "
          onClick={handleUpload}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostInput;
