import React, { useContext } from "react";

import { FaLinkedin } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
const JobPopup = ({ job, setOpen }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="popup">
      <div className="bg-primary align-center border-radius flex column gap job-popup popup-child ">
        <div className="flex justfy-start gap w-full">
          <img src={job.userImage} alt="" />
          <div className="flex column ">
            <h3 className="text-primary">{job.position}</h3>
            <b>{job.userName}</b>
            <p>{job.location}</p>
          </div>
        </div>
        <p className="text-gray">{job.description}</p>
        <div className="flex gap">
          {user.role == "user" && (
            <button className="flex align-center btn-style bg-blue text-white small-gap">
              Apply <FaLinkedin />
            </button>
          )}
          <button
            className=" btn-style bg-primary text-primary border-blue"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPopup;
