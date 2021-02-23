import React, { useEffect, useState } from "react";
import "./Home.css";
import LoginModal from "../../components/LoginModal/LoginModal";
import ModalContext from "../../utils/ModalContext";
// TODO: Import Navbar and render it on the page

const Home = () => {
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    document.title = "Roam";
  }, []);

  const toggleLoginModal = (e) => {
    e.preventDefault();
    setModalState(true);
  };

  return (
    <>
      <div className={`modal ${modalState ? "is-active" : ""}`}>
        <LoginModal />
      </div>

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
      {/* Text boxes about roam go here */}
      <div className="container">
        <div className="columns mt-4">
          <div className="column is-4">
            <div className="card">
              <div className="card-content">
                <div className="content">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos
                  amet quasi fuga ipsam quaerat consequuntur incidunt dolorum
                  expedita rerum, quidem tempore dolore dolores a doloribus quod
                  quisquam modi excepturi vitae.
                </div>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="card">
              <div className="card-content">
                <div className="content">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos
                  amet quasi fuga ipsam quaerat consequuntur incidunt dolorum
                  expedita rerum, quidem tempore dolore dolores a doloribus quod
                  quisquam modi excepturi vitae.
                </div>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="card">
              <div className="card-content">
                <div className="content">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos
                  amet quasi fuga ipsam quaerat consequuntur incidunt dolorum
                  expedita rerum, quidem tempore dolore dolores a doloribus quod
                  quisquam modi excepturi vitae.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
