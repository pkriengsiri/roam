import React, { useEffect } from "react";
import "./Home.css";
import LoginModal from "../../components/LoginModal/LoginModal";
// TODO: Import Navbar and render it on the page

const Home = () => {
  useEffect(() => {
    document.title = "Roam";
  }, []);

  const renderLoginModal = (e) => {
    e.preventDefault();
    console.log("You clicked the login button");
    // return <LoginModal/>
  };
  return (
    <>
      {/* Container goes here */}
      <LoginModal />
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
          <div className="column is-4">
            <div class="card">
              <div class="card-content">
                <div class="content">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos
                  amet quasi fuga ipsam quaerat consequuntur incidunt dolorum
                  expedita rerum, quidem tempore dolore dolores a doloribus quod
                  quisquam modi excepturi vitae.
                </div>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div class="card">
              <div class="card-content">
                <div class="content">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos
                  amet quasi fuga ipsam quaerat consequuntur incidunt dolorum
                  expedita rerum, quidem tempore dolore dolores a doloribus quod
                  quisquam modi excepturi vitae.
                </div>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div class="card">
              <div class="card-content">
                <div class="content">
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
