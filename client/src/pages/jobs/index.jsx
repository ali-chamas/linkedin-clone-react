import React, { useContext, useEffect, useState } from "react";
import "./style.css";

import Job from "../../components/Job";
import { UserContext } from "../../context/UserContext";

import { apiURL } from "../../apiURL/apiURL";
const Jobs = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    window.location.assign("/auth");
  }
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${apiURL}/jobs/jobsApi.php`);
      const data = await res.json();
      if ((data.status = "success")) setJobs(data.jobs);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const [openJobPopup, setOpenJobPopup] = useState(false);
  return (
    <>
      <section className="flex column align-center jobs-section gap ">
        <div className="flex column bg-primary p border-radius gap">
          <h2>Available Jobs:</h2>

          {jobs.length > 0 &&
            jobs.map((job, i) => <Job job={job} key={job.id} />)}
        </div>
      </section>
      \
    </>
  );
};

export default Jobs;
