import React from "react";
// import "./SignUpModal.css";

const SignUpModal = ({closeSignUpModal}) => {
  return (
    <>
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Sign Up</p>
              <button className="delete" aria-label="close" onClick={closeSignUpModal}></button>
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
              <button className="button is-primary">Sign Up</button>
              <button className="button" onClick={closeSignUpModal}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
    </>
  );
};

export default SignUpModal;
