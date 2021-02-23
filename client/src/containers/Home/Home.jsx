import React, {useEffect} from "react";
import "./Home.css"
// TODO: Import Navbar and render it on the page

const Home = () => {
  useEffect(()=>{
    document.title= "Roam"
  }, [])
  return (
    <>
      {/* Container goes here */}
      <section className="hero is-large is-info has-text-centered">
        <div className="hero-body">
        <button className="button is-primary mr-4 is-size-4">Sign Up</button>
        <button className="button is-primary ml-4 is-size-4">Login</button>
        </div>
      </section>
      {/* Text boxes about roam go here */}
    </>
  );
};

export default Home;
