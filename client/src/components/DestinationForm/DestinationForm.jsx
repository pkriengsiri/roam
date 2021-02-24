import React from "react";
import "./DestinationForm.css";

const DestinationForm = () => {
  return (
    <div className="columns">
      <div className="column is-two-thirds">
        <div className="field mb-2">
          <label className="label">Destination</label>
          <div className="control">
            <input className="input" type="text" placeholder="Destination" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationForm;
