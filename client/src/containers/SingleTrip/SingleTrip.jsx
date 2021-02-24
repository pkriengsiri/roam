import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// populate page with info from the database about a single trip

const SingleTrip = () => {
  return (
    <div className="container">
      <h1 className="title has-text-centered">Your Trip to Scotland!</h1>

      <div className="columns is-centered">
        <div className="column is-3">
          <p><div className="mb-5">
          
          <DatePicker
            // selected={startDate}
            // onChange={onChange}
            // startDate={startDate}
            // endDate={endDate}
            // selectsRange
            inline
          />
        </div></p>
        </div>
        <div className="column is-2">
        <h2 className="subtitle">Travel Companions:</h2>
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
