import React, { useEffect, useState } from "react";
import "./Home.css";
import LoginModal from "../../components/LoginModal/LoginModal";
import ModalContext from "../../utils/ModalContext";
import TestimonialCard from "../../components/TestimonialCard/TestimonialCard";

const Home = () => {
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    document.title = "Roam";
  }, []);

  const toggleLoginModal = (e) => {
    e.preventDefault();
    setModalState(true);
  };

  const closeLoginModal = (e) => {
    e.preventDefault();
    setModalState(false);
  };

  return (
    <>
      <ModalContext.Provider value={modalState}></ModalContext.Provider>
      <div className={`modal ${modalState ? "is-active" : ""}`}>
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
      </div>
      <section className="hero is-large has-text-centered">
        <div className="hero-body">
          <button className="button is-primary mr-4 is-size-4">Sign Up</button>
          <button
            className="button is-light ml-4 is-size-4"
            onClick={toggleLoginModal}
          >
            Login
          </button>
        </div>
      </section>
      {/* Text boxes about roam go here */}
      <div className="container">
        <div className="columns mt-4">
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
        </div>
      </div>
    </>
  );
};

export default Home;
