import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const ProfileDropdown = ({ user }) => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/profile?id=${user.id}`);
  };

  const handleLogout = () => {
    logout();
    window.location.assign("/auth");
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
      <button
        type="button"
        className="btn-style bg-danger text-white"
        onClick={logout}
      >
        logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
