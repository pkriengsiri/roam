import React from "react";

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
        <div className="column is-3">
          <div className="card trip-card">
           
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">Scotland</p>
                </div>
              </div>

              <div className="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                <a href="#">#css</a> <a href="#">#responsive</a>
                <br />
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
