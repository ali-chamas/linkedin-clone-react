import React, { useState } from "react";
import { apiURL } from "../../../apiURL/apiURL";

const SkillPopup = ({ setOpen, user, fetchSkills }) => {
  const [skill, setSkill] = useState("");

  const addSkill = async () => {
    try {
      const skillData = new FormData();
      skillData.append("skill", skill);

      skillData.append("userID", user.id);
      const res = await fetch(`${apiURL}/skills/skillsApi.php`, {
        method: "POST",
        body: skillData,
      });
      const data = await res.json();
      await fetchSkills();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="popup">
      <h3 className="text-primary">Add Skill</h3>
      <div className="bg-primary align-center border-radius flex column gap job-popup popup-child">
        <div className="flex column gap">
          <input
            type="text"
            placeholder="new skill"
            onChange={(e) => setSkill(e.target.value)}
          />
        </div>

        <div className="flex gap">
          <button
            className="flex align-center btn-style bg-blue text-white small-gap"
            onClick={addSkill}
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

export default SkillPopup;
