import React, { useState, useContext } from "react";
import API from "../../utils/API";
import "./LoginModal.css";
import UserContext from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import AlertContext from "../../contexts/AlertContext";
import Alert from "../Alert/Alert";
import useEmail from "../../hooks/useEmail";

const LoginModal = ({ closeLoginModal, setLoginModalState }) => {
  const [email, handleEmailChange, emailStatus, emailStatusMessage] = useEmail(
    ""
  );
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [loginFailureMessage, setLoginFailureMessage] = useState("");
  const { onDisplay, display, theme } = useContext(AlertContext);
  const { setUserContext } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailStatus || !password) {
      onDisplay(true, "error");
    } else {
      onDisplay(false);
      API.loginUser({
        email: email,
        password: password,
      })
        .then((response) => {
          jwt.verify(
            response.data.token,
            process.env.REACT_APP_SECRET,
            (err, data) => {
              if (err) {
                console.log(err);
                setLoginFailureMessage("Login attempt failed");
              } else {
                setUserContext({ userId: data._id });
                history.push(`/user/${data._id}/trips`);
                setLoginModalState(false);
              }
            }
          );
        })
        .catch((err) => {
          setLoginFailureMessage("Login attempt failed");
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
            <p className="modal-card-title">Login</p>
            <button
              className="delete"
              aria-label="close"
              onClick={closeLoginModal}
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
              {!emailStatus && (
                <Alert color={"error"}>{emailStatusMessage}</Alert>
              )}
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
                <Alert color={theme}>
                  Please enter a valid email and password before submitting
                </Alert>
              )}
              {loginFailureMessage && (
                <Alert color={"error"}>{loginFailureMessage}</Alert>
              )}
            </form>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-primary" onClick={handleSubmit}>
              Login
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
