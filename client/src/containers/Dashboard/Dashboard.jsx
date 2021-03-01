import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import TripCard from "../../components/TripCard/TripCard";
import API from "../../utils/API";
import { Link, useParams } from "react-router-dom";
import Doodle2 from "../../components/Doodle/Doodle2";
import { set } from "mongoose";
import Loader from "../../components/Loader/Loader";
import moment from "moment";

const Dashboard = () => {
  const { userId } = useParams();
  const [trips, setTrips] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [typeOfTripsToDisplay, setTypeOfTripsToDisplay] = useState("Upcoming");
  const [filteredTrips, setFilteredTrips] = useState([]);

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

  // function to change array of trips passed to trip cards
  useEffect(() => {
    const today = moment().format().substring(0, 10);
    if (typeOfTripsToDisplay === "Upcoming") {
      setFilteredTrips(
        trips.filter((trip) => trip.startDate.substring(0, 10) >= today)
        .sort((a, b) => a.endDate.localeCompare(b.endDate))
      );
    } else if (typeOfTripsToDisplay === "Past") {
      setFilteredTrips(
        trips
          .filter((trip) => trip.endDate.substring(0, 10) <= today)
      );
    } else {
      setFilteredTrips(trips);
    }
  }, [typeOfTripsToDisplay, trips]);

  // function to change which trips to display
  const changeDisplay = (e) => {
    setTypeOfTripsToDisplay(e.target.innerHTML);
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

        {/* toggle trips to view buttons      */}
        <div className="buttons is-centered has-addons">
          <button
            className={
              typeOfTripsToDisplay === "All"
                ? "button is-primary is-selected "
                : "button"
            }
            onClick={(e) => changeDisplay(e)}
          >
            All
          </button>
          <button
            className={
              typeOfTripsToDisplay === "Upcoming"
                ? "button is-primary is-selected"
                : "button"
            }
            onClick={(e) => changeDisplay(e)}
          >
            Upcoming
          </button>
          <button
            className={
              typeOfTripsToDisplay === "Past"
                ? "button is-primary is-selected"
                : "button"
            }
            onClick={(e) => changeDisplay(e)}
          >
            Past
          </button>
        </div>

        {filteredTrips.map((trip) => (
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
