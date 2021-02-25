import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditTrip.css";
import API from "../../utils/API";
import { useHistory, useParams } from "react-router-dom";
import TripForm from "../../components/TripForm/TripForm";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

const EditTrip = () => {
  const history = useHistory();
  const { userId } = useParams();
  const { tripId } = useParams();
  const [deleteModalState, setDeleteModalState] = useState(false);

  const handleFormSubmit = (e, formObject) => {
    e.preventDefault();
    axios
      .put(`/api/trips/${tripId}`, formObject)
      .then((response) => {

        history.push(`/user/${userId}/trips`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeDeleteModal = (e) => {
    e.preventDefault();
    setDeleteModalState(false);
  };

  const togglesDeleteModal= (e) => {
    e.preventDefault();

    setDeleteModalState(true);
  };

  return (
    <>
    {deleteModalState && <DeleteModal closeDeleteModal={closeDeleteModal} userId={userId} tripId={tripId}/>} 
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half ">
          <div className="columns is-vcentered ">
            <div className="column is-5">
              <h1 className="title">Edit Your Trip</h1>
            </div>
            <div className="column is-1">
              <a onClick={togglesDeleteModal}><i className="far fa-trash-alt fa-lg"></i></a>
            </div>
          </div>
          
          <TripForm handleFormSubmit={handleFormSubmit} buttonText="Save" />
        </div>
      </div>
    </div>
    </>
  );
};

export default EditTrip;
