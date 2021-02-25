import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TripForm.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const TripForm = (props) => {
  // state for form object
  const [tripCreator, setTripCreator] = useState(props.tripCreatorId);
  const [destination, setDestination] = useState("");
  // TODO: Do we want travel start date initiated as today?
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [travelers, setTravelers] = useState([
    {
      travelerId: props.tripCreator,
      travelerEmail: props.tripCreatorEmail,
      status: "Going",
    },
  ]);

  // state to add traveler to travelers list state
  const [traveler, setTraveler] = useState("");
  const [validEmailPromptState, setValidEmailPromptState] = useState(false);

  // browser params
  const { tripId } = useParams();
  const { userId } = useParams();

  useEffect(() => {
    if (tripId) {
      axios
        .get(`/api/trips/${tripId}`)
        .then((response) => {

          const responseStartDate = new Date(response.data.startDate);
          const responseEndDate = new Date(response.data.endDate);
          setDestination(response.data.destination);
          setStartDate(responseStartDate);
          setEndDate(responseEndDate);
          setTravelers(response.data.travelers);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [tripId]);

  // add traveler to the travelers list
  const addTraveler = (e) => {
    e.preventDefault();
    if (validateEmail(e.target.traveler.value)) {
      setValidEmailPromptState(false);
      const newInvite = e.target.traveler.value;
      setTravelers([...travelers, {travelerEmail:newInvite,travelerId:"",status:"pending"}]);
      setTraveler("");
    } else {
      setValidEmailPromptState(true);
    }
    // TODO: "Invite Sent" alert or message
  };

  // set calendar dates
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // validates an email address
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  return (
    <>
      <form
        className="trip-form"
        onSubmit={(e) =>
          props.handleFormSubmit(e, {
            tripCreator,
            destination,
            startDate,
            endDate,
            travelers,
          })
        }
      >
        {/* destination section  */}
        <div className="columns">
          <div className="column is-two-thirds">
            <div className="field mb-2">
              <label className="label">Destination</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Destination"
                  name="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* date picker section  */}
        <div className="mb-5">
          <label className="label">Dates</label>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </div>
      </form>

      {/* List of travelers */}
      <div className="mb-5">
        <label className="label">Travel Companions</label>
        <ul>
          {travelers.map((traveler, index) => (
            <li key={index}>{`${traveler.travelerEmail} (${traveler.status})`}</li>
          ))}
        </ul>
      </div>

      {/* invite travelers section  */}

      <form className="invite" onSubmit={addTraveler}>
        <label className="label">Invite Others!</label>
        <div className="columns is-vcentered">
          <div className="column is-two-thirds">
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="User email"
                  name="traveler"
                  value={traveler}
                  onChange={(e) => setTraveler(e.target.value)}
                />
                {validEmailPromptState && (
                  <p className="email-validation">
                    Please enter a valid email address
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="column is-one-third pl-0">
            <button type="submit" className="">
              <i className="fas fa-plus fa-lg"></i>
            </button>
          </div>
        </div>

        {/* TODO: Make a PUT request on the click of the save button */}
        {/* Save button */}
        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-primary"
              type="submit"
              onClick={(e) =>
                props.handleFormSubmit(e, {
                  tripCreator,
                  destination,
                  startDate,
                  endDate,
                  travelers,
                })
              }
            >
              {props.buttonText}
            </button>

            <Link
            to={`/user/${userId}/trips`}
            className="button is-primary mr-4 is-size-4 cancel-button"
          >
            Cancel
          </Link>
          </div>
        </div>
    
      </form>

    </>
  );
};

export default TripForm;
