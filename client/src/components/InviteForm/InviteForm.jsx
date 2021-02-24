import React, { useState } from "react";
import "./InviteForm.css";

const InviteForm = ({addTraveler,traveler,handleInputChange }) => {
  // const [traveler, setTraveler] = useState([]);

  return (
    <form className="invite" onSubmit={addTraveler}>
      <label className="label">Invite Others!</label>
      <div className="columns is-vcentered">
        <div className="column is-two-thirds">
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="User email"
                name="traveler"
                value={traveler}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="column is-one-third pl-0">
          <button type="submit" className="">
            <i className="fas fa-plus fa-lg"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default InviteForm;
