import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import TripCard from "../../components/TripCard/TripCard";
import API from "../../utils/API";
import { Link, useParams } from "react-router-dom";
import TripsHero from "../../Assets/Images/trips-hero.png";

const Dashboard = () => {
  const { userId } = useParams();
  const [trips, setTrips] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    // API.getTrips()
    //   .then((response) => {
    //     setTrips(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

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

  return (
    <>
      <h1 className="title is-size-1 has-text-centered mt-6 pl-6 pr-6">
        {currentUser}
      </h1>
      <h1 className="subtitle is-size-4 has-text-centered mt-3">
        Start planning your trips today!
      </h1>
      <section className="has-text-centered">
        <img className="animate fadeInLeft one trips-hero" src={TripsHero} alt="" />
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
          className="button is-primary mr-4 is-size-4"
        >
          Create Trip
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
