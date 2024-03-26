import React, { useState } from "react";
import { apiURL } from "../../../apiURL/apiURL";
const ExperiencePopup = ({ setOpen, user, fetchExp }) => {
  const [newName, setNewName] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const addExp = async () => {
    try {
      const exp = new FormData();
      exp.append("position", newName);
      exp.append("company", newName);
      exp.append("start_year", newStartDate);
      exp.append("end_year", newEndDate);
      exp.append("description", newDesc);
      exp.append("userID", user.id);
      const res = await fetch(`${apiURL}/experiences/experiencesApi.php`, {
        method: "POST",
        body: exp,
      });
      const data = await res.json();
      await fetchExp();
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
            placeholder=" company"
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            placeholder=" position"
            onChange={(e) => setNewPosition(e.target.value)}
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

export default ExperiencePopup;
