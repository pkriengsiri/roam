import React, { useContext, useState } from "react";
import API from "../../utils/API";
import "./CreateTrip.css";
import TripForm from "../../components/TripForm/TripForm";
import { useHistory, useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import AlertContext from "../../contexts/AlertContext";



const CreateTrip = () => {
  const { onDisplay, display, theme } = useContext(AlertContext);

  // add trip button to send to server
  const history = useHistory();
  const { userId } = useParams();
  const { email, _id } = useContext(UserContext);
  const [loadingState, setLoadingState] = useState("");

  const handleFormSubmit = (e, formObject) => {
    e.preventDefault();
    if (
      !formObject.tripCreator ||
      !formObject.destination ||
      !formObject.startDate ||
      !formObject.endDate ||
      !formObject.travelers
    ) {
      console.log(formObject);
      const destinationArray = formObject.destination.split(",");
      const destinationParsed = `${destinationArray[0]}, ${destinationArray[1]}`;
      formObject.destination = destinationParsed;
      onDisplay(true, "error");
    } else {
      onDisplay(false);
      setLoadingState("is-loading");
      API.createTrip(formObject)
        //TODO: // use context to set signed in user as tripCreator

        .then((response) => {
          history.push(`/user/${userId}/trips`);
        })
        .catch((err) => console.log(err));
    }
  };

  const closeTripForm =() =>{
    onDisplay(false);
  }

  return (
    <div className="container mt-6 pl-6 pr-6">
      <div className="columns is-centered">
        <div className="column is-half ">
          <h1 className="title">Create a Trip</h1>
        </div>
      </div>
      <TripForm
        tripCreatorId={userId}
        tripCreatorEmail={email}
        buttonText="Add Trip"
        handleFormSubmit={handleFormSubmit}
        closeTripForm={closeTripForm}
        loadingState={loadingState}
      />

    </div>
  );
};

export default CreateTrip;
