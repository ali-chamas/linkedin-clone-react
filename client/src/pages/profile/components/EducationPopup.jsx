import React, { useState } from "react";
import { apiURL } from "../../../apiURL/apiURL";

const EducationPopup = ({ setOpen, user, fetchEducations }) => {
  const [newName, setNewName] = useState("");
  const [newDegree, setNewDegree] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const addEdu = async () => {
    try {
      const edu = new FormData();
      edu.append("major", newDegree);
      edu.append("start_year", newStartDate);
      edu.append("end_year", newEndDate);
      edu.append("description", newDesc);
      edu.append("userID", user.id);
      edu.append("university", newName);
      const res = await fetch(`${apiURL}/educations/educationsApi.php`, {
        method: "POST",
        body: edu,
      });
      const data = await res.json();
      await fetchEducations();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="popup">
      <div className="bg-primary align-center border-radius flex column gap job-popup popup-child">
        <h3 className="text-primary">Add education</h3>
        <div className="flex column gap">
          <input
            type="text"
            placeholder="university"
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            placeholder="degree"
            onChange={(e) => setNewDegree(e.target.value)}
          />
          <input
            type="text"
            placeholder="start date"
            onChange={(e) => setNewStartDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="end date"
            onChange={(e) => setNewEndDate(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="desc"
            onChange={(e) => setNewDesc(e.target.value)}
          />
        </div>

        <div className="flex gap">
          <button
            className="flex align-center btn-style bg-blue text-white small-gap"
            onClick={addEdu}
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

export default EducationPopup;
