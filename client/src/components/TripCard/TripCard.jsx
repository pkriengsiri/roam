import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "./TripCard.css";
import UserContext from "../../contexts/UserContext";

const TripCard = ({
  destination,
  startDate,
  endDate,
  travelers,
  tripId,
  tripCreator,
  imageUrl,
}) => {
  const { id } = useContext(UserContext);

  // browser params
  // const { tripId } = useParams();
  const { userId } = useParams();

  // TODO: Add image to trip card

  return (
    <div className="columns is-centered">
      <div className="column is-5">
        <div className="card trip-card">
          <div className="card-content has-text-left">
            <div className="column is-12">
              <img className="dashboard-image"src={imageUrl} />
            </div>
            <div className="media">
              <div className="media-content">
                <div className="columns">
                  <div className="column is-9">
                    <Link to={`/user/${userId}/trips/${tripId}`}>
                      <p className="destination title">{destination} </p>
                    </Link>
                  </div>
                  <div className="column is-3 has-text-right">
                    <Link to={`/user/${userId}/trips/${tripId}`}>
                      <i className="icon fas fa-eye"></i>
                    </Link>
                    {userId === tripCreator && (
                      <Link to={`/user/${userId}/trips/${tripId}/edit`}>
                        <i className="icon far fa-edit m-1"></i>
                      </Link>
                    )}
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
