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
      travelerId: props.tripCreatorId,
      travelerEmail: "",
      status: "Going-Creator",
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
    const newTraveler = travelers.find((traveler) => {
      return traveler.travelerEmail === e.target.traveler.value.toLowerCase();
    });
    if (newTraveler) {
      //Todo: add alert
      console.log("user already exists");
    } else {
      if (validateEmail(e.target.traveler.value)) {
        setValidEmailPromptState(false);
        const newInvite = e.target.traveler.value.toLowerCase();
        setTravelers([
          ...travelers,
          { travelerEmail: newInvite, travelerId: "", status: "pending" },
        ]);
        setTraveler("");
      } else {
        setValidEmailPromptState(true);
      }
      // TODO: "Invite Sent" alert or message
    }
  };

  // remove traveler
  const removeTraveler = (targetEmail) => {
    let filteredTravelers = travelers.filter(
      (traveler) => traveler.travelerEmail !== targetEmail
    );
    setTravelers(filteredTravelers);
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
            tripCreator: userId,
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

      {/* invite travelers section  */}

      <form className="invite" onSubmit={addTraveler}>
        <label className="label">Invite Others!</label>
        <div className="columns is-vcentered">
          <div className="column">
            <div className="field has-addons has-addons-fullwidth">
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="User email"
                  name="traveler"
                  value={traveler}
                  onChange={(e) => setTraveler(e.target.value)}
                />
                <span className="icon is-medium is-left">
                  <i className="fas fa-users"></i>
                </span>
                {validEmailPromptState && (
                  <p className="email-validation">
                    Please enter a valid email address
                  </p>
                )}
                <span>
                  <i
                    type="submit"
                    className="fas fa-plus fa-lg add-traveler-button"
                    className=""
                  ></i>
                </span>
              </div>
              <div className="control">
                <button type="submit" className="button">
                  <i className="fas fa-plus fa-lg"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Traveler bubbles */}
        <div className="mb-5">
          {travelers.map((traveler, index) => (
            <p className="travelers" key={index}>
              <span className="travelers-tag p-2 mr-2">
                {`${traveler.travelerEmail} `}
                {traveler.status === "You" && <span>{traveler.status}</span>}
                {traveler.status !== "You" && (
                  <span>
                    <em>{traveler.status}</em>
                  </span>
                )}
                <span
                  // data-email={traveler.email}
                  onClick={() => removeTraveler(traveler.travelerEmail)}
                  // onClick={(e) => removeTraveler(e)}
                >
                  {" "}
                  x{" "}
                </span>
              </span>
            </p>
          ))}
        </div>

        {/* Save button */}
        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-primary"
              type="submit"
              onClick={(e) =>
                props.handleFormSubmit(e, {
                  tripCreator: userId,
                  destination,
                  startDate,
                  endDate,
                  travelers,
                })
              }
            >
              {props.buttonText}
            </button>

            <Link to={`/user/${userId}/trips`}>
              <button className="button  ml-4 cancel-button">Cancel</button>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default TripForm;
