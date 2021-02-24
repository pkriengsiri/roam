import React from "react";
import { Link } from "react-router-dom";

const TripCard = ({
  destination,
  travelStartDate,
  travelEndDate,
  travelers,
  _id,
}) => {
  return (
    <div className="columns is-centered">
      <div className="column is-5">
        <div className="card trip-card">
          <div className="card-content has-text-left">
            <div className="media">
              <div className="media-content">
                <div className="columns">
                  <div className="column is-10">
                    <p className="title">{destination} </p>
                  </div>
                  <div className="column is-2">
                    <Link to={`/trips/${_id}/edit`}>
                      <i className="far fa-edit"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-10">
                <div className="content">
                  <time dateTime="2016-1-1">
                    {travelStartDate.substring(0, 10)} to{" "}
                    {travelEndDate.substring(0, 10)}
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
