import React from "react";

const TripCard = () => {
  return (
    <div className="columns is-centered">
      <div className="column is-4">
        <div className="card trip-card">
          <div className="card-content has-text-left">
            <div className="media">
              <div className="media-content">
                <p className="title is-3">Scotland </p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-10">
                <div className="content">
                  <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
              </div>
              <div className="column is-2">
                <button>
                  <i class="far fa-edit"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
