import { useState } from "react";
import { apiURL } from "../../../apiURL/apiURL";
const AddJobPopup = ({ setOpen, user, fetchJobs }) => {
  const [newPosition, setNewPosition] = useState("");

  const [newDesc, setNewDesc] = useState("");
  const [location, setLocation] = useState("");

  const addExp = async () => {
    try {
      const job = new FormData();
      job.append("position", newPosition);
      job.append("description", newDesc);
      job.append("location", location);
      job.append("userID", user.id);
      const res = await fetch(`${apiURL}/jobs/jobsApi.php`, {
        method: "POST",
        body: job,
      });
      const data = await res.json();
      await fetchJobs();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="popup">
      <div className="bg-primary align-center border-radius flex column gap job-popup popup-child">
        <h3 className="text-primary">Add experience</h3>
        <div className="flex column gap">
          <input
            type="text"
            placeholder=" position"
            onChange={(e) => setNewPosition(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
          <textarea
            type="text"
            placeholder=" description"
            onChange={(e) => setNewDesc(e.target.value)}
          />
        </div>

        <div className="flex gap">
          <button
            className="flex align-center btn-style bg-blue text-white small-gap"
            onClick={addExp}
          >
            Save
          </button>

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

export default AddJobPopup;
