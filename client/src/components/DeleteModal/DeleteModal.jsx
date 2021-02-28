import React, { useEffect } from "react";
import API from "../../utils/API";
import "./DeleteModal.css";
import { useParams, useHistory } from "react-router-dom";

const DeleteModal = ({ closeDeleteModal, userId, tripId, handleDeleteClick }) => {
  const history = useHistory();

  // const handleDeleteClick = () => {

  //   API.deleteTrip(tripId)
  //     .then((response) => {

  //       history.push(`/user/${userId}/trips`);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <div className="modal is-active fade-in-modal">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              Are you sure you want to delete your trip?
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={closeDeleteModal}
            ></button>
          </header>
          <footer className="modal-card-foot">
            <button onClick={handleDeleteClick} className="button is-primary">
              Delete
            </button>
            <button className="button" onClick={closeDeleteModal}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
