import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import TripCard from "../../components/TripCard/TripCard";
import API from "../../utils/API";
import { Link, useParams } from "react-router-dom";
import Doodle2 from "../../components/Doodle/Doodle2";
import { set } from "mongoose";
import Loader from "../../components/Loader/Loader";

const Dashboard = () => {
  const { userId } = useParams();
  const [trips, setTrips] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [tripsToDisplay, setTripsToDisplay] = useState("Upcoming");

  useEffect(() => {
    API.getUser(userId)
      .then((response) => {
        setProfileImage(response.data.profileImageUrl);
      })
      .catch((err) => {
        console.log(err);
      });

    API.getUserWithTrips(userId)
      .then((response) => {
        setTrips(response.data.trips);
        if (!response.data.firstName) {
          setCurrentUser(`Welcome!`);
        } else {
          setCurrentUser(`Welcome, ${response.data.firstName}!`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeDisplay = (e) => {
    console.log(e.target)
    setTripsToDisplay(e.target.value);
  };

  return (
    <>
      {/* <h1 className="title is-size-1 has-text-centered mt-6 pl-6 pr-6">
        {currentUser}
      </h1>
      <h1 className="subtitle is-size-4 has-text-centered mt-3">
        Start planning your trips today!
      </h1> */}
      <div className="columns is-gapless is-centered is-vcentered mt-4">
        <div className="column is-1">
          <figure className="image">
            <img
              className="is-rounded dashboard-profile-picture"
              src={profileImage}
            />
          </figure>
        </div>
        <div className="column is-3 mb-5 has-text-left">
          <h1 className="title is-size-1 dashboard-welcome has-text-centered mt-4">
            {currentUser}
          </h1>

          <h2 className="subtitle dashboard-subtitle has-text-centered">
            Start planning your trips today!{" "}
          </h2>
        </div>
      </div>
      <section className="has-text-centered">
        <Doodle2 />
      </section>

      <div className="container has-text-centered mt-6 pl-6 pr-6">
        {/* global alert for not filling out user profile */}
        <div className="columns is-centered">
          <div className="column is-8 has-text-centered">
            {/* conditional rendering for displaying name IF it is in the database */}
            {/* Conditional rendering for if the user has trips or not */}
            {trips.length !== 0 && <h1 className="title">Your Trips</h1>}
            {trips.length === 0 && (
              <h1 className="title">You don't have any trips planned yet!</h1>
            )}
          </div>
        </div>

        <div className="buttons is-centered has-addons">
          <button
            className={
              tripsToDisplay === "Upcoming"
                ? "button is-primary is-selected"
                : "button"
            }
            onClick={(e) => changeDisplay(e)}
          >
            Upcoming
          </button>

          <button
            className={
              tripsToDisplay === "All"
                ? "button is-primary is-selected "
                : "button"
            }
            onClick={(e) => changeDisplay(e)}
          >
            All
          </button>
          <button
            className={
              tripsToDisplay === "{Past}"
                ? "button is-primary is-selected"
                : "button"
            }
            onClick={(e) => changeDisplay(e)}
          >
            Past
          </button>
        </div>

        {trips.map((trip) => (
          <TripCard
            {...trip}
            startDate={new Date(trip.startDate)}
            endDate={new Date(trip.endDate)}
            tripId={trip._id}
            key={trip._id}
          />
        ))}
        <Link
          to={`/user/${userId}/trips/new`}
          className="button is-primary mr-4 is-size-4 "
        >
          Create Trip
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
