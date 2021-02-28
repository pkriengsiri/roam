import React, { useState, useContext } from "react";
import API from "../../utils/API";
import "./SignUpModal.css";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import AlertContext from "../../contexts/AlertContext";
import UserContext from "../../contexts/UserContext";
import Alert from "../Alert/Alert";
import useEmail from "../../hooks/useEmail";
import Cookies from "js-cookie";

const SignUpModal = ({ closeSignUpModal, setSignupModalState}) => {
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [email,handleEmailChange,emailStatus,emailStatusMessage] = useEmail("");

  const { onDisplay, display, theme } = useContext(AlertContext);
  const { setUserContext } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check to see if email or password are valid
    if (!emailStatus || !password) {
      // Display error message if email or password are note valid
      onDisplay(true, "error");
    } else {
      // Clear error message
      onDisplay(false);
      // Make API call
      let preStoreEmail = email;
      API.createUser({
        email: preStoreEmail.toLowerCase(),
        password: password,
      })
        .then((response) => {
          // Validate response then redirect
          const token = Cookies.get('token');
          jwt.verify(
            token,
            process.env.REACT_APP_SECRET,
            (err, data) => {
              if (err) {
                // TODO:  display an error message to the user stating that the sign-up failed (use global alert)
                console.log(err);
              } else {
                setUserContext({ userId: data._id, email: data.email });
                history.push(`/user/${data._id}/edit`);
                setSignupModalState(false);
              }
            }
          );
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
            <form className="control" onSubmit={handleSubmit}>
              <strong>
                <p>Email</p>
              </strong>
              <div className="field">
                <div className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      handleEmailChange(e.target.value);
                    }}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
              </div>

              {/* {!emailStatus && (
                <Alert
                  color={"error"}
                >
                  {emailStatusMessage}
                </Alert>
              )} */}
              <strong>
                <p className="mt-4">Password</p>
              </strong>
              <div className="field">
                <div className="control has-icons-left">
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
                    <i className="fas fa-key"></i>
                  </span>
                </div>
              </div>
              <input type="submit" className="is-hidden" />

              {display && (
                <Alert
                  color={theme}
                >
                  Please enter a valid email and password before submitting
                </Alert>
              )}
            </form>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-primary" onClick={handleSubmit}>
              Sign Up
            </button>
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
