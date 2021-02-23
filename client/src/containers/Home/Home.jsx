import React, { useEffect, useState } from "react";
import "./Home.css";
import LoginModal from "../../components/LoginModal/LoginModal";
import TestimonialCard from "../../components/TestimonialCard/TestimonialCard";
// TODO: Import Navbar and render it on the page

const Home = () => {
  const [activeModal, setActiveModal] = useState("");
  useEffect(() => {
    document.title = "Roam";
  }, []);

  const renderLoginModal = (e) => {
    e.preventDefault();
    console.log("You clicked the login button");
    return <LoginModal />;
  };
  return (
    <>
      {/* Container goes here */}
      {/* <LoginModal /> */}
      <section className="hero is-large is-info has-text-centered">
        <div className="hero-body">
          <button className="button is-primary mr-4 is-size-4">Sign Up</button>
          <button
            className="button is-light ml-4 is-size-4"
            onClick={renderLoginModal}
          >
            Login
          </button>
        </div>
      </section>
      {/* Text boxes about roam go here */}
      <div className="container">
        <div className="columns mt-4">
            <TestimonialCard/>
            <TestimonialCard/>
            <TestimonialCard/>
        </div>
      </div>
    </>
  );
};

export default Home;
