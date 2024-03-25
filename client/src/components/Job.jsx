import React, { useState } from "react";
import JobPopup from "./JobPopup";

const Job = ({ job }) => {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      {openPopup && <JobPopup job={job} setOpen={setOpenPopup} />}
      <div
        className="flex gap align-center job-card p"
        onClick={() => setOpenPopup(true)}
      >
        <img src={job.userImage} alt="" />
        <div className="flex column small-gap small-p">
          <h3 className="text-primary">{job.position}</h3>
          <b>{job.userName}</b>
          <p className="text-gray">{job.location}</p>
        </div>
      </div>
    </>
  );
};

export default Job;
