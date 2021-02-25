import React, { useState, useContext } from "react";
import Logo from "../../Assets/Images/roam5.svg";
import LoginModal from "../../components/LoginModal/LoginModal";
import SignUpModal from "../../components/SignUpModal/SignUpModal";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const Navbar = ({ setUserContext }) => {
  const [loginModalState, setLoginModalState] = useState(false);
  const [signUpModalState, setSignUpModalState] = useState(false);
  const history = useHistory();
  const { userId } = useContext(UserContext);

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

        {userId && (
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                {/* <Link to={`/user/${userId}/edit`}>
                  <i className="fas fa-user-circle fa-2x"></i>
                </Link> */}
                <Link to={`/user/${userId}/trips`} className="navbar-item">
                  Dashboard
                </Link>
                <a
                  className="navbar-item button is-primary ml-4"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </div>

              {/* <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">More</a>

                <div className="navbar-dropdown">
                  <a className="navbar-item">About</a>
                  <a className="navbar-item">Jobs</a>
                  <a className="navbar-item">Contact</a>
                  <hr className="navbar-divider"/>
                  <a className="navbar-item">Report an issue</a>
                    
                  </div>
                </div> */}
              </div>
            </div>
          
        )}
        {!userId && (
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
