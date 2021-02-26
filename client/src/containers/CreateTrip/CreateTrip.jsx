import React, { useContext, useState } from "react";
import API from "../../utils/API";
import "./CreateTrip.css";
import TripForm from "../../components/TripForm/TripForm";
import { useHistory, useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const CreateTrip = () => {
  // add trip button to send to server
  const history = useHistory();
  const { userId } = useParams();
  const { email, _id } = useContext(UserContext);
  const [image, setImage] = useState();

  const handleFormSubmit = (e, formObject) => {
    e.preventDefault();
    API.createTrip(formObject)
      //TODO: // use context to set signed in user as tripCreator

      .then((response) => {
        console.log(response.data);

        // const getPhoto = async () => {
        //   var xhr = new XMLHttpRequest();
        //   xhr.open("GET", url, true);
        //   xhr.onload = () => {
        //     setImage({ imageUrl: xhr.responseURL });
        //   };
        //   xhr.send(null);
        // };

        // getPhoto();

        // console.log(typeof response);

        // cons

        // const imageURL = response.data.blob();
        // const image = URL.createObjectURL(imageURL); //declared earlier
        // setImage(image);

        // const imageLookupURL = `https://cors-anywhere.herokuapp.com/${response.data}`;
        // fetch(imageLookupURL)
        //   .then((r) => r.blob())
        //   .then((result) => {
        //     let image = URL.createObjectURL(result);
        //     setImage(image);
        //   })
        //   .catch(console.error);

        // history.push(`/user/${userId}/trips`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half ">
          <h1 className="title">Create a Trip</h1>
          <TripForm
            tripCreatorId={userId}
            tripCreatorEmail={email}
            buttonText="Add Trip"
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      </div>
      <img src={image} />
    </div>
  );
};

export default CreateTrip;
