import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SingleTrip = () => {
  return (
    <div className="container">
      <h1 className="title has-text-centered">Your Trip to Scotland!</h1>

      <div className="columns is-vcentered is-centered">
        <div className="column is-3">
          <p>calendar goes here</p>
        </div>
        <div className="column is-2">
          <ul>
            <li>Charlie</li>
            <li>Elsie</li>
            <li>Kip</li>
            <li>Moose</li>
            <li>Penny</li>
            <li>Taz</li>
            <li>Wilbur</li>
          </ul>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-1">
          <button className="button is-primary mr-4 is-size-5">
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTrip;
