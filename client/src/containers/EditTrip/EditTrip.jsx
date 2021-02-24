import React from "react";
import "./EditTrip.css";

const EditTrip = () => {
  // Make API request to prepopulate the data below
  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <h1 className="title">Edit Your Trip</h1>
          {/* Destination field */}
          <div className="field">
            <label className="label">Destination</label>
            <div className="control">
              <input className="input" type="text" placeholder="Destination" />
            </div>
          </div>

          {/* Calendar with date range selector */}

          {/* List of travelers */}

          {/* Invite others field */}
          <label className="label">Invite Others!</label>

          <div className="columns is-vcentered">
            <div className="column is-two-thirds">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="User email"
                  />
                </div>
              </div>
            </div>
            <div className="column is-one-third">
              <a href="">
                <i className="fas fa-plus"></i>
              </a>
            </div>
          </div>

          {/* Save button */}
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTrip;
