import React, { useState } from "react";
import Logo from "../../Assets/Images/roam5.svg";
import LoginModal from "../../components/LoginModal/LoginModal";
import SignUpModal from "../../components/SignUpModal/SignUpModal";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const Navbar = ({ userContext, setUserContext }) => {
  const [loginModalState, setLoginModalState] = useState(false);
  const [signUpModalState, setSignUpModalState] = useState(false);
  const history = useHistory();

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

  const handleLogout = (e) => {
    e.preventDefault();
    // console.log("you clicked the logout button");
    // console.log(userContext)
    setUserContext({ email: "", id: "" });
    history.push("/");
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

          {/* <a
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
          </a> */}
        </div>

        {/* TODO: Conditionally render if the user is logged in */}
        {userContext.email !== "" && (
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <a className="navbar-item">Dashboard</a>
                <a
                  className="navbar-item button is-primary ml-4"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        )}
        {userContext.email === "" && (
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
        )}

        {/* TODO: Conditionally render if the user is not logged in */}
      </nav>
    </>
  );
};

export default Navbar;
