import React, { useState } from "react";
import Logo from "../../Assets/Images/roam5.svg";
import LoginModal from "../../components/LoginModal/LoginModal";
import SignUpModal from "../../components/SignUpModal/SignUpModal";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [loginModalState, setLoginModalState] = useState(false);
  const [signUpModalState, setSignUpModalState] = useState(false);

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
      {loginModalState && <LoginModal closeLoginModal={closeLoginModal} />}
      {signUpModalState && <SignUpModal closeSignUpModal={closeSignUpModal} />}
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/">
            <img src={Logo} width="112" className="ml-4 mt-1" />
          </Link>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={() =>
              document
                .querySelector(".navbar-menu")
                .classList.toggle("is-active")
            }
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        {/* TODO: Conditionally render if the user is logged in */}
        {/* <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <a className="navbar-item">Dashboard</a>
              <a className="navbar-item button is-primary ml-4">Logout</a>
            </div>
          </div>
        </div> */}

        {/* TODO: Conditionally render if the user is logged in */}
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary" onClick={toggleSignUpModal}>
                <strong>Sign up</strong>
              </a>
              <a className="button is-light" onClick={toggleLoginModal}>
                Log in
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
