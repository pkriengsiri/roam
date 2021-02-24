import React from "react";
import "./DeleteModal.css";

const DeleteModal = ({ closeDeleteModal }) => {
  return (
    
      <>
        <div className="modal is-active fade-in-modal">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Login</p>
              <button
                className="delete"
                aria-label="close"
                onClick={closeDeleteModal}
              ></button>
            </header>
            <section className="modal-card-body">
              <strong>
                <p>Email</p>
              </strong>
              <input className="input" type="text" placeholder="Email" />
              <strong>
                <p className="mt-4">Password</p>
              </strong>
              <input className="input" type="text" placeholder="Password" />
            </section>
            <footer className="modal-card-foot">
              <button className="button is-primary">Login</button>
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
