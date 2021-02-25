import React, { useEffect, useState } from "react";
import "./Home.css";
import LoginModal from "../../components/LoginModal/LoginModal";
import SignUpModal from "../../components/SignUpModal/SignUpModal";
import TestimonialCard from "../../components/TestimonialCard/TestimonialCard";
import BeachVideo from "./Beach1.mp4";

const Home = ({ setUserContext }) => {
  const [loginModalState, setLoginModalState] = useState(false);
  const [signUpModalState, setSignUpModalState] = useState(false);

  useEffect(() => {
    document.title = "Roam";
  }, []);

  const toggleLoginModal = (e) => {
    e.preventDefault();
    setLoginModalState(true);
  };

  const toggleSignUpModal = (e) => {
    e.preventDefault();
    setSignUpModalState(true);
  };

  const closeSignUpModal = (e) => {
    e.preventDefault();
    setSignUpModalState(false);
  };

  const closeLoginModal = (e) => {
    e.preventDefault();
    setLoginModalState(false);
  };

 

  return (
    <>
      {loginModalState && (
        <LoginModal
          closeLoginModal={closeLoginModal}
          setUserContext={setUserContext}
        />
      )}
      {signUpModalState && (
        <SignUpModal
          closeSignUpModal={closeSignUpModal}
          setUserContext={setUserContext}
        />
      )}

      <section className="hero-section">
        <video autoPlay loop muted>
          <source src={BeachVideo} type="video/mp4" />
        </video>
        {/* <h1 className="title hero-title has-text-centered is-size-1">Welcome to Roam!</h1> */}
        <button
          className="button home-signup-button is-primary mr-4 is-size-4"
          onClick={toggleSignUpModal}
        >
          Sign Up
        </button>
        <button
          className="button home-login-button is-light ml-4 is-size-4"
          onClick={toggleLoginModal}
        >
          Login
        </button>
      </section>

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
