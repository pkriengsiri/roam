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
          <div className="columns is-vcentered">
            <div className="column is-5">
              <h1 className="title">Edit Your Trip</h1>
            </div>
            <div className="column is-1">
              <a><i class="far fa-trash-alt"></i></a>
            </div>
          </div>
          
          <TripForm handleFormSubmit={handleFormSubmit} buttonText="Save" />
        </div>
      </div>
    </div>
  );
};

export default EditTrip;
