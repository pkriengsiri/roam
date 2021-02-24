import React, { useState } from "react";

import DestinationForm from "../../components/DestinationForm/DestinationForm";
import InviteForm from "../../components/InviteForm/InviteForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../../utils/API";
import "./CreateTrip.css";

const CreateTrip = () => {
  const [destination, setDestination] = useState("");
  const [travelers, setTravelers] = useState([]);
  const [traveler, setTraveler] = useState("");
  // TODO: Do we want travel start date initiated as today?
  const [travelStartDate, setTravelStartDate] = useState(new Date());
  const [travelEndDate, setTravelEndDate] = useState(null);

  const addTraveler = (e) => {
    e.preventDefault();
    console.log(e.target.traveler.value);
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

  // add trip button to send to server
  const addTrip = () => {
    API.createTrip({
        TODO: // use context to set signed in user as tripCreator
      tripCreator: "bill", //current user from context,
      destination: destination,
      travelStartDate: travelStartDate,
      travelEndDate: travelEndDate,
      travelers: travelers,
    })
      .then((res) => console.log(res.data))
      // TODO: route back to user dashboard
      .catch((err) => console.log(err));

  };

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half ">
          <h1 className="title">Create a Trip</h1>

          <DestinationForm
            destination={destination}
            handleInputChange={(e) => setDestination(e.target.value)}
          />
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
          <InviteForm
            addTraveler={addTraveler}
            traveler={traveler}
            handleInputChange={(e) => setTraveler(e.target.value)}
          />
          {/* Save button */}
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary" onClick={addTrip}>
                Add Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
