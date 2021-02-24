import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../../utils/API";
import "./TripForm.css";

const TripForm = (props) => {
  const [destination, setDestination] = useState("");
  const [travelStartDate, setTravelStartDate] = useState(new Date());
  const [travelEndDate, setTravelEndDate] = useState(null);
  const [traveler, setTraveler] = useState("");
  const [travelers, setTravelers] = useState([]);
  // TODO: Do we want travel start date initiated as today?

  const addTraveler = (e) => {
    e.preventDefault();

    const newInvite = e.target.traveler.value;
    setTravelers([...travelers, newInvite]);
    setTraveler("");
    // TODO: "Invite Sent" alert or message
  };

  // set calendar dates
  const onChange = (dates) => {
    const [start, end] = dates;
    setTravelStartDate(start);
    setTravelEndDate(end);
  };

  return (
    <>
      <form
        className="trip-form"
        onSubmit={(e) =>
          props.handleFormSubmit(e, {
            tripCreator: "logged in user",
            destination,
            travelStartDate,
            travelEndDate,
            travelers,
          })
        }
      >
        {/* destination section  */}
        <div className="columns">
          <div className="column is-two-thirds">
            <div className="field mb-2">
              <label className="label">Destination</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Destination"
                  name="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* date picker section  */}
        <div className="mb-5">
          <label className="label">Dates</label>
          <DatePicker
            selected={travelStartDate}
            onChange={onChange}
            startDate={travelStartDate}
            endDate={travelEndDate}
            selectsRange
            inline
          />
        </div>
        </form>
        {/* invite travelers section  */}

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
                    onChange={(e) => setTraveler(e.target.value)}
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



        {/* Save button */}
        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-primary"
              type="submit"
              onClick={(e) =>
                props.handleFormSubmit(e, {
                  tripCreator: "logged in user",
                  destination,
                  travelStartDate,
                  travelEndDate,
                  travelers,
                })}
            >
              Add Trip
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default TripForm;
