import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
const Profile = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramID = queryParams.get("id");

  const { user } = useContext(UserContext);

  const [signedinUser, setSignedinUser] = useState(false);

  useEffect(() => {
    if (user.id == paramID) {
      setSignedinUser(true);
    }
  }, []);

  return <div></div>;
};

export default Profile;
