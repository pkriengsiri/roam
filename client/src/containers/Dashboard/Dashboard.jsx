import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-4 has-text-centered">
          {/* conditional rendering for displaying name IF it is in the database */}
          <h1 className="title">Welcome, FirstName!</h1>
          <h1 className="title">Your Trips:</h1>
        </div>
      </div>

      <div className="columns is-centered">
        <div className="column is-4">
          <div className="card trip-card">
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-3">Scotland</p>
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
      
      <button className="button is-primary mr-4 is-size-4">Create Trip</button>
    </div>
  );
};

export default Dashboard;
