import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../utils/API";
import "./SingleTrip.css";
import UserContext from "../../contexts/UserContext";
import DoughnutChart from "../../components/DoughnutChart/DoughnutChart";
import PackingList from "../../components/PackingList/PackingList";
import TripContext from "../../contexts/TripContext";

const SingleTrip = () => {
  const { userContext } = useContext(UserContext);
  const { setTripContext } = useContext(TripContext);

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [travelers, setTravelers] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [days, setDays] = useState();
  const [minutes, setMinutes] = useState();
  const [hours, setHours] = useState();
  const [seconds, setSeconds] = useState();

  // browser params
  const { tripId } = useParams();
  const { userId } = useParams();



  useEffect(() => {
    if (tripId) {
      API.getTrip(tripId)
        .then((response) => {
          console.log(response.data);
          setDestination(response.data.destination);
          const responseStartDate = new Date(response.data.startDate);
          const responseEndDate = new Date(response.data.endDate);
          console.log(responseStartDate);
          setStartDate(responseStartDate);
          setEndDate(responseEndDate);
          setTravelers(response.data.travelers);
          setImageUrl(response.data.imageUrl);
          setExpenses(response.data.expenses);
          setTripContext({ trip: response.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    const countdown = setInterval(function () {
      let countDownDate = startDate;
      const now = new Date().getTime();

      const distance = countDownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setDays(days);
      setMinutes(minutes);
      setSeconds(seconds);
      setHours(hours);

      if (distance < 0) {
        clearInterval(countdown);
      }
    }, 1000);
  }, [days, hours, minutes, seconds]);

  return (
    <>
      <div className="container mt-6 pl-6 pr-6">
        <h1 className="title has-text-centered">
          Your trip to {destination}!{" "}
          <Link to={`/user/${userId}/trips/${tripId}/edit`}>
            <i className="edit-trip-icon far fa-edit m-1 "></i>
          </Link>
        </h1>
        <h1 className="subtitle has-text-centered">
          <svg
            className="DateRangePickerInput_calendarIcon_svg DateRangePickerInput_calendarIcon_svg_1"
            focusable="false"
            viewBox="0 0 1393.1 1500"
          >
            <path d="m107 1393h241v-241h-241zm295 0h268v-241h-268zm-295-295h241v-268h-241zm295 0h268v-268h-268zm-295-321h241v-241h-241zm616 616h268v-241h-268zm-321-616h268v-241h-268zm643 616h241v-241h-241zm-322-295h268v-268h-268zm-294-723v-241c0-7-3-14-8-19-6-5-12-8-19-8h-54c-7 0-13 3-19 8-5 5-8 12-8 19v241c0 7 3 14 8 19 6 5 12 8 19 8h54c7 0 13-3 19-8 5-5 8-12 8-19zm616 723h241v-268h-241zm-322-321h268v-241h-268zm322 0h241v-241h-241zm27-402v-241c0-7-3-14-8-19-6-5-12-8-19-8h-54c-7 0-13 3-19 8-5 5-8 12-8 19v241c0 7 3 14 8 19 6 5 12 8 19 8h54c7 0 13-3 19-8 5-5 8-12 8-19zm321-54v1072c0 29-11 54-32 75s-46 32-75 32h-1179c-29 0-54-11-75-32s-32-46-32-75v-1072c0-29 11-54 32-75s46-32 75-32h107v-80c0-37 13-68 40-95s57-39 94-39h54c37 0 68 13 95 39 26 26 39 58 39 95v80h321v-80c0-37 13-69 40-95 26-26 57-39 94-39h54c37 0 68 13 94 39s40 58 40 95v80h107c29 0 54 11 75 32s32 46 32 75z"></path>
          </svg>
          <span className="has-text-centered ml-2">
            {startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}
          </span>
        </h1>
        {seconds > 0 && (
          <h1 className="subtitle has-text-centered">
            {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
          </h1>
        )}
        <div className="columns is-centered">
          <div className="column is-6 trip-container">
            <figure>
              <img className="trip-image" src={imageUrl} alt={destination} />
            </figure>
          </div>
          <div className="column is-4">
            <div className="card single-trip-card">
              <div className="card-content">
                <div className="content">
                  <h2 className="subtitle">Travelers:</h2>
                  <ul>
                    {travelers.map((traveler, index) => {
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

        {/* EXPENSES  */}

        <div className="columns is-centered">
          <div className="column is-6 has-text-centered">
            <h1 className="title has-text-centered">Expenses</h1>
            {expenses.length === 0 && (
              <>
                <h1>No Expenses Yet</h1>
                <Link
                  to={`/user/${userId}/trips/${tripId}/expenses/new`}
                  className="button is-primary is-size-6"
                  type="submit"
                >
                  Create Expense
                </Link>
              </>
            )}
            {expenses.length !== 0 && (
              <>
                <h2 className="has-text-centered">Total Expenses</h2>
                <Link to={`/user/${userId}/trips/${tripId}/expenses`}>
                  <DoughnutChart expenses={expenses} />
                </Link>
              </>
            )}
          </div>
          <div className="column is-6">
            <h1 className="title has-text-centered">Packing List</h1>
            <PackingList userId={userId} tripId={tripId}/>
          </div>
        </div>
        <div className="columns is-centered mt-6">
          <div className="column is-3">
            <Link
              to={`/user/${userId}/trips`}
              className="button is-primary is-size-4"
            >
              Dashboard
            </Link>
          </div>
          <div className="column is-2">
            <Link
              to={`/user/${userId}/trips/${tripId}/expenses/new`}
              className="button mr-4 is-size-4 is-light"
              type="submit"
            >
              Create Expense
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTrip;
