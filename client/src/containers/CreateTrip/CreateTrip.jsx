import React from "react";


import API from "../../utils/API";
import "./CreateTrip.css";
import TripForm from "../../components/TripForm/TripForm";

const CreateTrip = () => {
  // add trip button to send to server
  const handleFormSubmit = (e, formObject) => {
    e.preventDefault();
    console.log("submit form");
    API.createTrip(formObject)
      //TODO: // use context to set signed in user as tripCreator
     
    
      .then((res) => console.log(res.data))
      // TODO: route back to user dashboard
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half ">
          <h1 className="title">Create a Trip</h1>

          <TripForm handleFormSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
