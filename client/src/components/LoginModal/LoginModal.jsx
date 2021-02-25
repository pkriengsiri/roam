import React, { useState } from "react";
import API from "../../utils/API";
import "./LoginModal.css";
import UserContext from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";

const LoginModal = ({ closeLoginModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { email } = useContext(UserContext);
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
              onClick={closeLoginModal}
            ></button>
          </header>

          <section className="modal-card-body">
            <form className="control">
              <strong>
                <p>Email</p>
              </strong>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
              </div>
              <strong>
                <p className="mt-4">Password</p>
              </strong>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <span className="icon is-small is-left">
                    <i class="fas fa-key"></i>
                  </span>
                </div>
              </div>
              <input type="submit" className="is-hidden" />
              <p id="signup-error" className="mt-2 ml-2 is-hidden">
                Please complete both fields before submitting
              </p>
            </form>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-primary" onClick={handleSubmit}>
              Sign Up
            </button>
            <button className="button" onClick={closeLoginModal}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
