import React, { useState } from "react";
import Calendar from "../../components/Calendar/Calendar";
import DestinationForm from "../../components/DestinationForm/DestinationForm";
import InviteForm from "../../components/InviteForm/InviteForm";
import API from "../../utils/API";

const CreateTrip = () => {
  const [tripFormInput, setTripFormInput] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripFormInput({...tripFormInput,[name]:value});
    console.log(tripFormInput.destination)
  };

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half ">
          <h1 className="title">Create a Trip</h1>

          <DestinationForm
            destination={tripFormInput.destination}
            handleInputChange={handleInputChange}
          />
          <div className="mb-5">
            <label className="label">Dates</label>
            <Calendar  />
          </div>
          <InviteForm handleInputChange={handleInputChange} />
          {/* Save button */}
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary">Add Trip</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
