import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import Logo from "../../Assets/Images/roam5.svg";
import LoginModal from "../../components/LoginModal/LoginModal";
import SignUpModal from "../../components/SignUpModal/SignUpModal";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";
import API from "../../utils/API";

const Navbar = ({ setUserContext }) => {
  const { userContext } = useContext(UserContext);
  const [loginModalState, setLoginModalState] = useState(false);
  const [signUpModalState, setSignUpModalState] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://res.cloudinary.com/djou7v3ho/image/upload/v1614532245/Avatar-removebg-preview_1_g04ftj.png"
  );
  const history = useHistory();

  useEffect(() => {
    if (userContext?.userId) {
      API.getUser(userContext.userId)
        .then((response) => {
          if (response.data.profileImageUrl) {
            setProfileImage(response.data.profileImageUrl);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userContext]);

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
    API.logoutUser()
      .then((response) => {
        // console.log(response);
        setUserContext({ email: "", id: "" });
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
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
        <div className="navbar-brand mt-1">
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

        <div id="navbarBasicExample" className="navbar-menu">
          {/* Logged in navbar */}
          {userContext.userId && (
            <div className="navbar-end ">
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  {/* <i className="nav-icon fas fa-user-circle fa-2x"></i> */}
                  <img
                    className="navbar-profile-picture"
                    src={profileImage}
                    alt=""
                  />
                </a>
                <div className="navbar-dropdown is-right">
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
          )}
          {/* Logged out navbar */}
          {!userContext.userId && (
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a onClick={toggleSignUpModal} className="button is-primary">
                    <strong>Sign up</strong>
                  </a>
                  <a onClick={toggleLoginModal} className="button is-light">
                    Log in
                  </a>
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
