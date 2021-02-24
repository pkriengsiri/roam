import React, { useEffect } from "react";
import axios from "axios";
import "./EditTrip.css";
import API from "../../utils/API";
import { useHistory, useParams } from "react-router-dom";
import TripForm from "../../components/TripForm/TripForm";

const EditTrip = () => {
  const history = useHistory();
  const { id } = useParams();

  const handleFormSubmit = (e, formObject) => {
    e.preventDefault();
    axios
      .put(`/api/trips/${id}`, formObject)
      .then((response) => {
        console.log(response.data);
        history.push(`/dashboard/${response.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half ">
          <h1 className="title">Edit Your Trip</h1>
          <TripForm handleFormSubmit={handleFormSubmit} buttonText="Save" />
        </div>
      </div>
    </div>
  );
};

export default EditTrip;
