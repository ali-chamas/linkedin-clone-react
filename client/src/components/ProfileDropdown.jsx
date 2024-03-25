import React from "react";
import { useNavigate } from "react-router-dom";
const ProfileDropdown = ({ user }) => {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/profile?id=${user.id}`);
  };
  return (
    <div className="profile-drop p flex column gap">
      <h3>{user.name}</h3>
      <p
        onClick={navigateToProfile}
        className="btn-style border-blue text-primary bg-primary"
      >
        View Profile
      </p>
      <button type="button" className="btn-style bg-danger text-white">
        SignOut
      </button>
    </div>
  );
};

export default ProfileDropdown;
