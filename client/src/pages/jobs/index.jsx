import React, { useContext, useState } from "react";
import "./style.css";
import jobs from "../../schemas/jobs.json";
import Job from "../../components/Job";
import { UserContext } from "../../context/UserContext";
import AddJobPopup from "./components/AddJobPopup";
const Jobs = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    window.location.assign("/auth");
  }
  const [openJobPopup, setOpenJobPopup] = useState(false);
  return (
    <>
      <section className="flex column align-center jobs-section gap ">
        <div className="flex column bg-primary p border-radius gap">
          <h2>Available Jobs:</h2>
          {user.role == "company" && (
            <button
              className="btn-style bg-blue text-white"
              onClick={() => setOpenJobPopup(true)}
            >
              Add +
            </button>
          )}
          {jobs.length > 0 && jobs.map((job, i) => <Job job={job} key={job} />)}
        </div>
      </section>
      {openJobPopup && <AddJobPopup setOpen={setOpenJobPopup} user={user} />}
    </>
  );
};

export default Jobs;
