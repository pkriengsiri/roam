import React from "react";
import "./DeleteModal.css";


const DeleteModal = ({ closeDeleteModal, handleDeleteClick, }) => {


  return (
    <>
      <div className="modal is-active fade-in-modal">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              Are you sure you want to delete?
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
