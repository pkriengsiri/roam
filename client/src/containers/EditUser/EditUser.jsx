import React, { useEffect, useState } from "react";
import "./EditUser.css";
import API from "../../utils/API";
import { useParams, useHistory } from "react-router-dom";

const EditUser = () => {
  const { userId } = useParams();
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userId) {
      API.getUser(userId).then((response)=> {
        console.log(response);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        
      }).catch((err)=> {
        console.log(err);
      })
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    API.editUser(userId, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response);
        history.push(`/dashboard/${response.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
// NEED TO UPDATE THE IMAGE WITH EDIT FUNCTIONALITY 
  return (
    <div className="container">
      <h1 className="title has-text-centered">Edit Account</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="columns is-centered is-vcentered">
          <div className="column is-3">
            <figure className="image is-128x128">
              <img
                className="is-rounded"
                src="https://placekitten.com/128/128"
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
                  onChange={(e) => setFirstName(e.target.value)}
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
                  onChange={(e) => setLastName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="column has-text-centered">
          <button type="submit" className="button is-primary mr-4 is-size-4">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
