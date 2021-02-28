import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import LoginModal from "../../components/LoginModal/LoginModal";
import SignUpModal from "../../components/SignUpModal/SignUpModal";
import TestimonialCard from "../../components/TestimonialCard/TestimonialCard";
import BeachVideo from "./Beach1.mp4";
import AlertContext from "../../contexts/AlertContext";
import UserContext from "../../contexts/UserContext";
import AnimatedLogo from "../../components/AnimatedLogo/AnimatedLogo";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const Home = ({ setUserContext }) => {
  const [loginModalState, setLoginModalState] = useState(false);
  const [signUpModalState, setSignUpModalState] = useState(false);
  const { onDisplay, display, theme } = useContext(AlertContext);
  const { userContext } = useContext(UserContext);

  useEffect(() => {
    // const token = Cookies.get('token');
    //       jwt.verify(
    //         token,
    //         process.env.REACT_APP_SECRET,
    //         (err, data) => {
    //           if (err) {
    //             // TODO:  display an error message to the user stating that the sign-up failed (use global alert)
    //             console.log(err);
    //           } else {
    //             setUserContext({ userId: data._id, email: data.email });
    //           }
    //         }
    //       );
    document.title = "Roam";
  }, []);

  const closeLoginModal = (e) => {
    e.preventDefault();
    onDisplay(false);
    setLoginModalState(false);
  };
  const closeSignUpModal = (e) => {
    e.preventDefault();
    onDisplay(false);
    setSignUpModalState(false);
  };
  const toggleLoginModal = (e) => {
    e.preventDefault();
    setLoginModalState(true);
  };

  const toggleSignUpModal = (e) => {
    e.preventDefault();
    setSignUpModalState(true);
  };

  return (
    <>
      {loginModalState && (
        <LoginModal
          closeLoginModal={closeLoginModal}
          setUserContext={setUserContext}
          setLoginModalState={setLoginModalState}
        />
      )}
      {signUpModalState && (
        <SignUpModal
          closeSignUpModal={closeSignUpModal}
          setUserContext={setUserContext}
          setSignUpModalState={setSignUpModalState}
        />
      )}

      <section className="hero-section">
        <video autoPlay loop muted>
          <source src={BeachVideo} type="video/mp4" />
        </video>

        {userContext.id !== "" && (
          <>
            <AnimatedLogo />
            <h1 className="has-text-centered title slogan">
              Go further <em>together</em>.
            </h1>
            <Link
              to={`/user/${userContext.userId}/trips`}
              className="button is-primary is-size- dashboard-button"
            >
              Dashboard
            </Link>
          </>
        )}
        {userContext.id === "" && (
          <>
            <AnimatedLogo />
            <h1 className="has-text-centered title slogan">
              Go further <em>together</em>.
            </h1>
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
          </>
        )}
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
