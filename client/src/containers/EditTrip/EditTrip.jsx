import React, { useEffect, useParams } from "react";
import Calendar from "../../components/Calendar/Calendar";
import "./EditTrip.css";
import API from "../../utils/API";

const EditTrip = () => {
  // Make API request to prepopulate the data below
  // useEffect(()=>{
  //   axios.get("/api/trips/:id").then(response=>{
  //     console.log(response.data)
  //   }).catch(err=>{
  //     console.log(err)
  //   })
  // }, [])

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half ">
          <h1 className="title">Edit Your Trip</h1>
          {/* Destination field */}
          <div className="columns">
            <div className="column is-two-thirds">
              <div className="field mb-2">
                <label className="label">Destination</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Destination"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Calendar with date range selector */}
          <div className="mb-5">
            <label className="label">Dates</label>
            <Calendar />
          </div>

          {/* List of travelers */}
          <div className="mb-5">
            <label className="label">Traveler Companions</label>
            <ul>
              <li>Pete</li>
              <li>Tony</li>
              <li>Molly</li>
              <li>Jeana Rose</li>
            </ul>
          </div>

          {/* Invite others field */}
          <label className="label">Invite Others!</label>
          <div className="columns is-vcentered">
            <div className="column is-two-thirds">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="User email"
                  />
                </div>
              </div>
            </div>
            <div className="column is-one-third pl-0">
              <a href="">
                <i className="fas fa-plus fa-lg"></i>
              </a>
            </div>
          </div>

          {/* Save button */}
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTrip;
