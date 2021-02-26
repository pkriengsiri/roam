import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, Link } from "react-router-dom";
import API from "../../utils/API";
import "./SingleTrip.css";
// populate page with info from the database about a single trip

const SingleTrip = () => {
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

      <div className="columns is-centered">
        <div className="column is-3">
          <p>
            <div className="mb-5">
              <DatePicker
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                inline
              />
            </div>
          </p>
        </div>
        <div className="column is-3">
          <h2 className="subtitle">Travelers:</h2>
          <ul>
            {travelers.map((traveler, index) => (
              <>
                {traveler.status === "You" && (
                  <li key={index}>
                    {`${traveler.travelerEmail} `}
                    <span>{traveler.status}</span>
                  </li>
                )}
                {traveler.status !== "You" && (
                  <li key={index}>
                    {`${traveler.travelerEmail}   `}
                    <span className="pl-1">
                      <em>{traveler.status}</em>
                    </span>
                  </li>
                )}
              </>
            ))}
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
