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
  const [typeOfTripsToDisplay, setTypeOfTripsToDisplay] = useState("");
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
        setTypeOfTripsToDisplay("Upcoming");
        if (!response.data.firstName) {
          setCurrentUser(``);
        } else {
          setCurrentUser(`${response.data.firstName}`);
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
        trips
          .filter((trip) => trip.endDate.substring(0, 10) >= today)
          .sort((a, b) => a.endDate.localeCompare(b.endDate))
      );
    } else if (typeOfTripsToDisplay === "Past") {
      setFilteredTrips(
        trips.filter((trip) => trip.endDate.substring(0, 10) <= today)
      );
    } else {
      setFilteredTrips(trips);
    }
  }, [typeOfTripsToDisplay, trips]);

  // if no upcoming trips, default to all trips
  useEffect(() => {
    if (filteredTrips.length === 0 && typeOfTripsToDisplay === "Upcoming") {
      setTypeOfTripsToDisplay("All");
    }
  }, [filteredTrips, typeOfTripsToDisplay]);

  // function to change which trips to display
  const changeDisplay = (e) => {
    setTypeOfTripsToDisplay(e.target.innerHTML);
  };

  return (
    <>
      <div className="container has-text-centered pl-6 pr-6 mt-6">
        {trips.length !== 0 && currentUser !== "" && (
          <h1 className="title is-size-1 has-text-centered pl-6 pr-6">
            {currentUser}'s Trips
          </h1>
        )}
        {trips.length !== 0 && currentUser === "" && (
          <h1 className="title is-size-1 has-text-centered pl-6 pr-6">
            Your Trips
          </h1>
        )}
        {trips.length === 0 && currentUser !== "" && (
          <h1 className="title">Welcome{`, ${currentUser}`}!</h1>
        )}
        {trips.length === 0 && currentUser === "" && (
          <h1 className="title">Welcome!</h1>
        )}

        <section className="has-text-centered">
          <Doodle2 />
        </section>

        {/* toggle trips to view buttons      */}
        {trips.length === 0 ? (
          <h1 className="subtitle">You don't have any trips planned yet.</h1>
        ) : (
          <>
            <div className="buttons is-centered has-addons ">
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
            <div className="columns is-centered is-multiline">
              {filteredTrips.map((trip) => (
                <TripCard
                  {...trip}
                  startDate={new Date(trip.startDate)}
                  endDate={new Date(trip.endDate)}
                  tripId={trip._id}
                  key={trip._id}
                />
              ))}
            </div>
          </>
        )}
        <Link to={`/user/${userId}/trips/new`} className="button is-primary">
          Create Trip
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
