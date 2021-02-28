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
    var formdata = new FormData();
    formdata.append("photo", fileInput, "file");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("/api/users", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    API.editUser(userId, {
      firstName: firstName,
      lastName: lastName,
      email: preStoreEmail.toLowerCase(),
    })
      .then((response) => {
        console.log(response);
        history.push(`/user/${response.data._id}/trips`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            <div className="profile-picture-file file has-name is-fullwidth mt-4">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="resume"
                  onChange={(e) => {
                    setFileInput(e.target.files[0]);
                  }}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">Edit</span>
                </span>
                <span
                  className="profile-picture-file-name file-name"
                  id="file-type"
                  value="image/png"
                >
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
