import React, { useEffect, useState } from "react";
import "./EditUser.css";
import API from "../../utils/API";
import { useParams, useHistory, Link } from "react-router-dom";
import FormData from "form-data";
import * as fs from "fs";
import axios from "axios";

const EditUser = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [fileInput, setFileInput] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userId) {
      API.getUser(userId)
        .then((response) => {
          console.log(response);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let preStoreEmail = email;
    console.log(fileInput);
    var data = new FormData();
    data.append("photo", fileInput, "file");
    // var form = new FormData();
    // form.append("photo", fileInput, "file");

    var config = {
      method: "post",
      url: "localhost:3001/api/users",
      headers: {
        ...data.getHeaders(),
      },
      // data: form,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    // API.editUser(userId, {
    //   firstName: firstName,
    //   lastName: lastName,
    //   email: preStoreEmail.toLowerCase(),
    // })
    //   .then((response) => {
    //     console.log(response);
    //     history.push(`/user/${response.data._id}/trips`);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // ///////////////// JQUERY //////////////
  // var form = new FormData();
  // form.append("photo", fileInput.files[0], "file");

  // var settings = {
  //   url: "/upload/" + newUser.id,
  //   method: "POST",
  //   timeout: 0,
  //   processData: false,
  //   mimeType: "multipart/form-data",
  //   contentType: false,
  //   data: form,
  // };

  // $.ajax(settings).done(function (response) {
  //   console.log(response);
  // });
  // /////////////////// AXIOS //////////

  // data.append(
  //   "photo",
  //   fs.createReadStream(
  //     "/Users/ChadMathis/GT_Bootcamp/gt-ft/projects/roam/client/src/Assets/Images/default-trip-image.jpg"
  //   )
  // );
  // data.append("photo", fs.createReadStream("/path/to/file"));

  // //////////////////

  // NEED TO UPDATE THE IMAGE WITH EDIT FUNCTIONALITY
  return (
    <div className="container mt-6 pl-6 pr-6">
      {/* Header */}
      <h1 className="title has-text-centered">Edit Account</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="columns is-centered is-vcentered">
          {/* Column with profile picture and photo upload input */}
          <div className="column is-3 mb-6">
            {/* Profile picture */}
            <figure className="image profile-picture is-128x128 ">
              <img
                className="is-rounded"
                src="https://placekitten.com/128/128"
              />
            </figure>
            {/* Upload input */}
            <div className="file has-name is-fullwidth mt-4">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="resume"
                  onChange={(e) => {
                    const { value } = e.target;
                    console.log(value);
                    setFileInput(value);
                  }}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">Edit</span>
                </span>
                <span className="file-name" id="file-type" value="image/png">
                  No file uploaded
                </span>
              </label>
            </div>
          </div>
          <div className="column is-5">
            <div className="field">
              <label className="label">First Name</label>
              <div className="control">
                <input
                  name="firstName"
                  className="input"
                  type="text"
                  placeholder="e.g Alex"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Last Name</label>
              <div className="control">
                <input
                  name="lastName"
                  className="input"
                  type="text"
                  placeholder="e.g. Smith"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  name="email"
                  className="input"
                  type="email"
                  placeholder="e.g. alexsmith@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="columns is-vcentered mt-2">
              <div className="column is-narrow">
                <button
                  type="submit"
                  className="button is-primary mr-4 is-size-5"
                >
                  Update
                </button>
              </div>
              <div className="column is-5">
                <Link to={`/user/${userId}/trips`} className="skip-link">
                  Skip this Step
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
