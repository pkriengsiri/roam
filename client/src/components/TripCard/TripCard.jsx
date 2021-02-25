import React from "react";
import { Link } from "react-router-dom";
import "./TripCard.css";

const TripCard = ({ destination, startDate, endDate, travelers, _id }) => {
  return (
    <div className="columns is-centered">
      <div className="column is-5">
        <div className="card trip-card">
          <div className="card-content has-text-left">
            <div className="media">
              <div className="media-content">
                <div className="columns">
                  <div className="column is-9">
                    <Link to={`/trip/${_id}`}>
                      <p className="destination title">{destination} </p>
                    </Link>
                  </div>
                  <div className="column is-3 has-text-right">
                    <Link to={`/trip/${_id}`}>
                      <i className="icon fas fa-eye"></i>
                    </Link>
                    <Link to={`/trips/${_id}/edit`}>
                      <i className="icon far fa-edit m-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-10">
                <div className="content">
                  <time dateTime="2016-1-1">
                    {startDate.substring(0, 10)} to {endDate.substring(0, 10)}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
