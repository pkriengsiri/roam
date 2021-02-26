import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, Link } from "react-router-dom";
import API from "../../utils/API";
import "./SingleTrip.css";
import UserContext from "../../contexts/UserContext";

const SingleTrip = () => {
  const { userContext } = useContext(UserContext);

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [travelers, setTravelers] = useState([]);

  // browser params
  const { tripId } = useParams();
  const { userId } = useParams();

  useEffect(() => {
    if (tripId) {
      API.getTrip(tripId)
        .then((response) => {
          // console.log(response.data);
          setDestination(response.data.destination);
          const responseStartDate = new Date(response.data.startDate);
          const responseEndDate = new Date(response.data.endDate);
          setStartDate(responseStartDate);
          setEndDate(responseEndDate);
          setTravelers(response.data.travelers);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="container">
      <h1 className="title has-text-centered">Your Trip to {destination}!</h1>
      <h1 className="subtitle has-text-centered">
        {startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}
      </h1>

      <div className="columns is-centered">
        <div className="column is-3">
          <figure className="image is-128x128">
            <img src="https://bulma.io/images/placeholders/256x256.png" />
            <p>Picture of the location from API</p>
          </figure>
        </div>
        <div className="column is-3">
          <h2 className="subtitle">Travelers:</h2>
          <ul>
            {travelers.map((traveler, index) => {
              console.log(traveler.travelerEmail)
              console.log(userContext.email)
              return (
                <li key={index}>
                  {traveler.travelerEmail === userContext.email && (
                    <span>YOU - </span>
                  )}
                  {`${traveler.travelerEmail} - `}
                  <span>
                    <em>{traveler.status}</em>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-2">
          {/* <button className="button is-primary mr-4 is-size-5">
            Dashboard
          </button> */}

          <Link
            to={`/user/${userId}/trips`}
            className="button is-primary mr-4 is-size-4"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleTrip;
