import React, { useState } from "react";
import API from "../../utils/API";

const SignUpModal = ({ closeSignUpModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      // TODO: add alert component
      console.log("error");
    } else {
      API.createUser({
        email: email,
        password: password,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="modal is-active fade-in-modal">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Sign Up</p>
            <button
              className="delete"
              aria-label="close"
              onClick={closeSignUpModal}
            ></button>
          </header>

          <section className="modal-card-body">
            <form className="control">
              <strong>
                <p>Email</p>
              </strong>
              <input
                className="control input"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <strong>
                <p className="mt-4">Password</p>
              </strong>
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <footer className="modal-card-foot">
                <button
                  className="button is-primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
                <button className="button" onClick={closeSignUpModal}>
                  Cancel
                </button>
              </footer>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default SignUpModal;
