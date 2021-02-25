import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import TripCard from "../../components/TripCard/TripCard";
import API from "../../utils/API";
import { Link, useParams } from "react-router-dom";

const Dashboard = () => {
  const { userId } = useParams();
  const [trips, setTrips] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    API.getTrips()
      .then((response) => {
        setTrips(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    API.getUser(userId)
      .then((response) => {
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
    <div className="container has-text-centered">
      {/* global alert for not filling out user profile */}
      <div className="columns is-centered">
        <div className="column is-8 has-text-centered">
          {/* conditional rendering for displaying name IF it is in the database */}
          <h1 className="title">{currentUser}</h1>
          <h1 className="title">Your Trips:</h1>
        </div>
      </div>
      {trips.map((trip) => (
        <TripCard {...trip} tripId={trip._id} key={trip._id} />
      ))}

      <Link to={`/user/${userId}/trips/new`} className="button is-primary mr-4 is-size-4">
        Create Trip
      </Link>
    </div>
  );
};

export default Dashboard;
