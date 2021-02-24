import React from "react";

import API from "../../utils/API";
import "./CreateTrip.css";
import TripForm from "../../components/TripForm/TripForm";
import { useHistory,useParams } from "react-router-dom";

const CreateTrip = () => {
  // add trip button to send to server
  const history = useHistory();
  const { id } = useParams();

  const handleFormSubmit = (e, formObject) => {
    e.preventDefault();
    console.log("submit form");
    API.createTrip(formObject)
      //TODO: // use context to set signed in user as tripCreator

      .then((response) => {
        console.log(response.data)
      // TODO: route back to user dashboard
      history.push(`/dashboard/${response.data._id}`);
        
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half ">
          <h1 className="title">Create a Trip</h1>

          <TripForm buttonText="Add Trip" handleFormSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
