import React from "react";
import "./InviteForm.css";

const InviteForm = ({travelers,handleInputChange}) => {
  return (
    <>
      <label className="label">Invite Others!</label>
      <div className="columns is-vcentered">
        <div className="column is-two-thirds">
          <div className="field">
            <div className="control">
              <input className="input" type="text" placeholder="User email" />
            </div>
          </div>
        </div>
        <div className="column is-one-third pl-0">
          <a href="/">
            <i className="fas fa-plus fa-lg"></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default InviteForm;
