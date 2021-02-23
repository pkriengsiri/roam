import React from "react";
import "./Home.css"
// TODO: Import Navbar and render it on the page

const Home = () => {
  return (
    <>
      <h1>This is the home page.</h1>
      {/* Container goes here */}
      {/* Hero Image goes here */}
      <section class="hero is-large is-info">
        <div class="hero-body">
          <p class="title">Large hero</p>
          <p class="subtitle">Large subtitle</p>
        </div>
      </section>
      {/* Text boxes about roam go here */}
    </>
  );
};

export default Home;
