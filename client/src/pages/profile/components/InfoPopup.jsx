import React, { useState } from "react";
import { MdPermMedia } from "react-icons/md";

const InfoPopup = ({ setOpen, user }) => {
  const [newName, setNewName] = useState(user.name);
  const [newPosition, setNewPosition] = useState(user.position);
  const [newLocation, setNewLocation] = useState(user.location);
  const [newBio, setNewBio] = useState(user.description);
  const [newImage, setNewImage] = useState(user.img);

  console.log(newImage);

  return (
    <div className="popup">
      <div className="bg-primary align-center border-radius flex column gap job-popup popup-child">
        <h3 className="text-primary">Edit info</h3>
        <div className="flex column gap">
          <input
            type="text"
            placeholder="new name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            placeholder="new position"
            value={newPosition}
            onChange={(e) => setNewPosition(e.target.value)}
          />
          <input
            type="text"
            placeholder="new location"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="new bio"
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
          />
          <div>
            <label
              htmlFor="image-input"
              className="flex gap align-center media-input "
            >
              <p className="text-primary ">
                <MdPermMedia />
              </p>

              <p className="text-primary">profile</p>
            </label>
            <input
              type="file"
              onChange={(e) => setNewImage(e.target.files[0])}
              id="image-input"
              style={{ display: "none" }}
            />
          </div>
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

export default InfoPopup;
