import React from "react";
import Calendar from "../../components/Calendar/Calendar";

const CreateTrip = () => {
  return (
    <div className="content has-text-centered">
      <h1>Create a Trip!</h1>
      {/* where are you going  */}
      {/* when is your trip  */}
      <Calendar />
    
    </div>
  );
};

export default CreateTrip;
