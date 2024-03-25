import React from "react";

const ProfileDropdown = ({ user }) => {
  return (
    <div className="profile-drop bg-primary p flex column gap">
      <h3>{user.name}</h3>
    </div>
  );
};

export default ProfileDropdown;
