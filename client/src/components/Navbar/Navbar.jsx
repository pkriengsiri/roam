import React, { useState, useContext } from "react";
import Logo from "../../Assets/Images/roam5.svg";
import LoginModal from "../../components/LoginModal/LoginModal";
import SignUpModal from "../../components/SignUpModal/SignUpModal";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import "./Navbar.css";

const Navbar = ({ setUserContext }) => {
  const [loginModalState, setLoginModalState] = useState(false);
  const [signUpModalState, setSignUpModalState] = useState(false);
  const history = useHistory();
  const { userContext } = useContext(UserContext);

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
    setUserContext({ email: "", id: "" });
    history.push("/");
  };
  return (
    <>
      {loginModalState && (
        <LoginModal
          closeLoginModal={closeLoginModal}
          setLoginModalState={setLoginModalState}
        />
      )}
      {signUpModalState && (
        <SignUpModal
          closeSignUpModal={closeSignUpModal}
          setSignupModalState={setSignUpModalState}
        />
      )}
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <Link to="/">
            <img src={Logo} width="112" className="ml-4 mt-1" />
          </Link>

          <a
            role="button"
            class="navbar-burger"
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

        <div id="navbarBasicExample" class="navbar-menu">
          {userContext.userId && (
            <div class="navbar-end ">
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                  <i className="nav-icon fas fa-user-circle fa-2x"></i>
                </a>
                {/* Logged in navbar */}
                <div class="navbar-dropdown is-right">
                  <Link
                    to={`/user/${userContext.userId}/trips`}
                    className="navbar-item"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={`/user/${userContext.userId}/edit`}
                    className="navbar-item"
                  >
                    Edit Profile
                  </Link>
                  <hr class="navbar-divider" />
                  <a className="navbar-item" onClick={handleLogout}>
                    <strong>Logout</strong>
                  </a>
                </div>

                {/* Logged out navbar */}
              </div>
            </div>
          )}

          {/* Conditionally render these */}
          {!userContext.userId && (
            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <a class="button is-primary">
                    <strong>Sign up</strong>
                  </a>
                  <a class="button is-light">Log in</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
