import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./EditTrip.css";
import { useHistory, useParams } from "react-router-dom";
import TripForm from "../../components/TripForm/TripForm";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import AlertContext from "../../contexts/AlertContext";
import API from "../../utils/API";

const EditTrip = () => {
  const { onDisplay, display, theme } = useContext(AlertContext);

  const history = useHistory();
  const { userId } = useParams();
  const { tripId } = useParams();
  const [deleteModalState, setDeleteModalState] = useState(false);

  const handleFormSubmit = (e, formObject) => {
    if (
      !formObject.tripCreator ||
      !formObject.destination ||
      !formObject.startDate ||
      !formObject.endDate ||
      !formObject.travelers
    ) {
      onDisplay(true, "error");
    } else {
      onDisplay(false);
      e.preventDefault();
      axios
        .put(`/api/trips/${tripId}`, formObject)
        .then((response) => {
          history.push(`/user/${userId}/trips`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const closeTripForm = () => {
    onDisplay(false);
  };

  const closeDeleteModal = (e) => {
    e.preventDefault();
    setDeleteModalState(false);
  };

  const togglesDeleteModal = (e) => {
    e.preventDefault();

    setDeleteModalState(true);
  };

  const handleDeleteClick = () => {

    API.deleteTrip(tripId)
      .then((response) => {
        console.log(response);
        history.push(`/user/${userId}/trips`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {deleteModalState && (
        <DeleteModal
          handleDeleteClick={handleDeleteClick}
          closeDeleteModal={closeDeleteModal}
          userId={userId}
          tripId={tripId}
        />
      )}
      <div className="container mt-6 pl-6 pr-6">
        <div className="columns is-centered">
          <div className="column is-half ">
            <div className="columns is-vcentered ">
              <div className="column is-6">
                <h1 className="title">Edit Your Trip</h1>
              </div>
              <div className="column is-1">
                <a onClick={togglesDeleteModal}>
                  <i className="far fa-trash-alt fa-lg"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <TripForm
          handleFormSubmit={handleFormSubmit}
          buttonText="Save"
          closeTripForm={closeTripForm}
        />
      </div>
    </>
  );
};

export default EditTrip;
