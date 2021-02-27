import React, { useState, useEffect, useContext } from "react";
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
  const [imageUrl, setImageUrl] = useState("");

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
          setImageUrl(response.data.imageUrl);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="container mt-6 pl-6 pr-6">
      <h1 className="title has-text-centered">Your trip to {destination}!</h1>
      <h1 className="subtitle has-text-centered">
        <svg
          class="DateRangePickerInput_calendarIcon_svg DateRangePickerInput_calendarIcon_svg_1"
          focusable="false"
          viewBox="0 0 1393.1 1500"
        >
          <path d="m107 1393h241v-241h-241zm295 0h268v-241h-268zm-295-295h241v-268h-241zm295 0h268v-268h-268zm-295-321h241v-241h-241zm616 616h268v-241h-268zm-321-616h268v-241h-268zm643 616h241v-241h-241zm-322-295h268v-268h-268zm-294-723v-241c0-7-3-14-8-19-6-5-12-8-19-8h-54c-7 0-13 3-19 8-5 5-8 12-8 19v241c0 7 3 14 8 19 6 5 12 8 19 8h54c7 0 13-3 19-8 5-5 8-12 8-19zm616 723h241v-268h-241zm-322-321h268v-241h-268zm322 0h241v-241h-241zm27-402v-241c0-7-3-14-8-19-6-5-12-8-19-8h-54c-7 0-13 3-19 8-5 5-8 12-8 19v241c0 7 3 14 8 19 6 5 12 8 19 8h54c7 0 13-3 19-8 5-5 8-12 8-19zm321-54v1072c0 29-11 54-32 75s-46 32-75 32h-1179c-29 0-54-11-75-32s-32-46-32-75v-1072c0-29 11-54 32-75s46-32 75-32h107v-80c0-37 13-68 40-95s57-39 94-39h54c37 0 68 13 95 39 26 26 39 58 39 95v80h321v-80c0-37 13-69 40-95 26-26 57-39 94-39h54c37 0 68 13 94 39s40 58 40 95v80h107c29 0 54 11 75 32s32 46 32 75z"></path>
        </svg>
        <span className="has-text-centered ml-2">
          {startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}
        </span>
      </h1>
      <div className="columns is-centered">
        <div className="column is-6 trip-container">
          <figure>
            <img className="trip-image" src={imageUrl} />
          </figure>
          {/* </div>
        <div className="column is-3"> */}
          <div class="card single-trip-card">
            <div class="card-content">
              <div class="content">
                <h2 className="subtitle">Travelers:</h2>
                <ul>
                  {travelers.map((traveler, index) => {
                    console.log(traveler.travelerEmail);
                    console.log(userContext.email);
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
          </div>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-2">
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
