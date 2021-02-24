import React from "react";
import "./DestinationForm.css";

const DestinationForm = ({destination,handleInputChange}) => {
  return (
    <div className="columns">
      <div className="column is-two-thirds">
        <div className="field mb-2">
          <label className="label">Destination</label>
          <div className="control">
            <input className="input" type="text" placeholder="Destination" name="destination" value={destination} onChange={handleInputChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationForm;
