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
      <nav
        className="navbar pl-6 pr-6"
        role="navigation"
        aria-label="main navigation"
      >
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

        {userContext.userId && (
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              {/* <Link to={`/user/${userId}/edit`}>
                <i className="fas fa-user-circle fa-2x"></i>
              </Link>
              <Link to={`/user/${userId}/trips`} className="navbar-item">
                Dashboard
              </Link>
              <a
                className="navbar-item button is-primary ml-4"
                onClick={handleLogout}
              >
                Logout
              </a> */}

              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  <i className="nav-icon fas fa-user-circle fa-2x"></i>
                </a>

                <div className="navbar-dropdown is-right is-active">
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
                  <hr className="navbar-divider" />
                  <a className="navbar-item" onClick={handleLogout}>
                    <strong>Logout</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        {!userContext.userId && (
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
      </nav>
    </>
  );
};

export default Navbar;
