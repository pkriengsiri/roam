import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TripForm.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const TripForm = (props) => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [traveler, setTraveler] = useState("");
  const [travelers, setTravelers] = useState([]);
  const { id } = useParams();
  // TODO: Do we want travel start date initiated as today?

  const addTraveler = (e) => {
    e.preventDefault();

    const newInvite = e.target.traveler.value;
    setTravelers([...travelers, newInvite]);
    setTraveler("");
    // TODO: "Invite Sent" alert or message
  };

  // set calendar dates
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    if (id) {
    axios
      .get(`/api/trips/${id}`)
      .then((response) => {
        console.log(response.data);
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
  }, [id]);

  return (
    <>
      <form
        className="trip-form"
        onSubmit={(e) =>
          props.handleFormSubmit(e, {
            tripCreator: "logged in user",
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
          {/* TODO: Populate travelers form travlers array and add keys */}
          {travelers.map((traveler) => (
            <li>{traveler}</li>
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
                  tripCreator: "context logged in user",
                  destination,
                  startDate,
                  endDate,
                  travelers,
                })
              }
            >
              {props.buttonText}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default TripForm;
