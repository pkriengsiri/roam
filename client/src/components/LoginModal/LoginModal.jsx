import React, { useState } from "react";
import "./LoginModal.css";
import ModalContext from "../../utils/ModalContext";

const LoginModal = (props) => {
  const [modalState, setModalState] = useState(true);

  const closeLoginModal = (e) => {
    e.preventDefault();
    setModalState(false);
  };
  return (
    <>
      <ModalContext.Provider value={modalState}>
        <div className={`modal ${modalState === false ? "" : "is-active"}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Login</p>
              <button className="delete" aria-label="close"></button>
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
              <button className="button" onClick={closeLoginModal}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </ModalContext.Provider>
    </>
  );
};

export default LoginModal;
