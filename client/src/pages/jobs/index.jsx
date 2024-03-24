import React, { useContext } from "react";
import "./style.css";
import jobs from "../../schemas/jobs.json";
import Job from "../../components/Job";
import { UserContext } from "../../context/UserContext";
const Jobs = () => {
  const { user } = useContext(UserContext);
  return (
    <section className="flex column align-center jobs-section gap">
      <h2>Available Jobs:</h2>
      <div className="flex column bg-primary p border-radius gap">
        {user.role == "company" && (
          <button className="btn-style bg-blue text-white">Add +</button>
        )}
        {jobs.length > 0 && jobs.map((job, i) => <Job job={job} key={job} />)}
      </div>
    </section>
  );
};

export default Jobs;
