import React, { useEffect, useState } from "react";
import "./EditUser.css";
import API from "../../utils/API";
import { useParams, useHistory, Link } from "react-router-dom";
import FormData from "form-data";
import Alert from "../../components/Alert/Alert";

const EditUser = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [fileInput, setFileInput] = useState();
  const [fileName, setFileName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [fileUploadStatus, setFileUploadStatus] = useState(false);
  const [changedProfileImageUrl, setChangedProfileImageUrl] = useState("");

  useEffect(() => {
    if (userId) {
      API.getUser(userId)
        .then((response) => {
          console.log(response);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setChangedProfileImageUrl(response.data.profileImageUrl);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let preStoreEmail = email;
    API.editUser(userId, {
      firstName: firstName,
      lastName: lastName,
      email: preStoreEmail.toLowerCase(),
    })
      .then((response) => {
        history.push(`/user/${userId}/trips`);
        console.log("here");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addPhoto = () => {
    // console.log(fileInput);
    var formdata = new FormData();
    formdata.append("photo", fileInput, "file");
    var requestOptions = {
      method: "POST",
      body: formdata,
      // redirect: "follow",
    };

    fetch(`/api/users/upload/${userId}`, requestOptions)
      .then((response) => {
        console.log(response);
        return response.text();
      })
      .then((result) => {
        // console.log(result);
        const res = JSON.parse(result);
        setFileUploadStatus(true);
        console.log(res.url);
        setChangedProfileImageUrl(res.url);
      })
      .catch((error) => console.log("error", error));
  };

  // NEED TO UPDATE THE IMAGE WITH EDIT FUNCTIONALITY
  return (
    <div className="container mt-6 pl-6 pr-6">
      {/* Header */}
      <h1 className="title has-text-centered">Edit Account</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="columns is-centered is-vcentered">
          {/* Column with profile picture and photo upload input */}
          <div className="column is-3 mb-6 mr-6">
            {/* Profile picture */}
            <figure className="image">
              {changedProfileImageUrl ? (
                <img
                  className="is-rounded profile-picture"
                  src={changedProfileImageUrl}
                />
              ) : (
                <img
                  className="is-rounded profile-picture"
                  src="https://placekitten.com/128/128"
                />
              )}
            </figure>
            {/* Upload input */}

            <div className="field has-addons">
              <div className="control has-icons-left">
                <div className="profile-picture-file file has-name mt-4">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      name="resume"
                      onChange={(e) => {
                        setFileName(e.target.files[0].name);
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
                      {fileName ? fileName : "No file uploaded"}
                    </span>
                  </label>
                  {/* <span>
                    <i
                      type="submit"
                      className="fas fa-plus fa-lg add-traveler-button"
                      onClick={addPhoto}
                    ></i>
                  </span> */}
                  <div className="control">
                    <span
                      // type="submit"
                      className="button"
                    >
                      <i onClick={addPhoto} className="fas fa-plus fa-lg"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {fileUploadStatus && (
              <Alert color="is-primary">File Upload Succeeded</Alert>
            )}
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
