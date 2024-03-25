import React, { useState } from "react";

const AddJobPopup = ({ setOpen, user }) => {
  const [newPosition, setNewPosition] = useState("");

  const [newDesc, setNewDesc] = useState("");
  return (
    <div className="popup">
      <div className="bg-primary align-center border-radius flex column gap job-popup popup-child">
        <h3 className="text-primary">Add Job</h3>
        <div className="flex column gap">
          <input
            type="text"
            placeholder=" position"
            onChange={(e) => setNewPosition(e.target.value)}
          />

          <textarea
            type="text"
            placeholder=" description"
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

export default AddJobPopup;
