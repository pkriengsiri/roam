import React, { useEffect, useState} from "react";
import "./EditUser.css";
import axios from "axios";
import {useParams } from "react-router-dom";
import { useEffect } from "react";

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const EditUser = () => {
  return (
    <div className="container">
      <h1 className="title has-text-centered">Edit Account</h1>

      <div className="columns is-centered is-vcentered">
        <div className="column is-3">
          <figure className="image is-128x128">
            <img
              className="is-rounded"
              src="https://bulma.io/images/placeholders/128x128.png"
            />
          </figure>
          <p>Edit your picture</p>
        </div>
        <div className="column is-5">
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="e.g Alex"
                value={firstName}

              />
            </div>
          </div>

          <div className="field">
            <label className="label">Last Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="e.g. Smith"
                value={lastName}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="e.g. alexsmith@gmail.com"
                value={email}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="e.g. alexsmith@gmail.com"
                value={password}
              />
            </div>
          </div>



        </div>
      </div>
      <div className="column has-text-centered">
      <button className="button is-primary mr-4 is-size-4">Create Trip</button></div>
    </div>
  );
};

export default EditUser;
