import React, { useState } from "react";

const EducationPopup = ({ setOpen, user }) => {
  const [newName, setNewName] = useState("");
  const [newDegree, setNewDegree] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [newDesc, setNewDesc] = useState("");
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
          <button className="flex align-center btn-style bg-blue text-white small-gap">
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
