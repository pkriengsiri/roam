import React, { useEffect, useState } from "react";
import "./Home.css";
import LoginModal from "../../components/LoginModal/LoginModal";
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
      {modalState && <LoginModal closeLoginModal={closeLoginModal}/>}
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
