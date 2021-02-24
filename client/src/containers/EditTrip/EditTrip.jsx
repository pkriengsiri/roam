import React, { useEffect, useParams } from "react";

import "./EditTrip.css";
import API from "../../utils/API";
import TripForm from "../../components/TripForm/TripForm";

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

          <TripForm />
        </div>
      </div>
    </div>
  );
};

export default EditTrip;
