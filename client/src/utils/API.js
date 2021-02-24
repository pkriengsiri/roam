import axios from "axios";

const API = {
  // API methods for users
  getUsers: function () {
    return axios.get("/api/users");
  },
  createUser: function () {
    return axios.post("/api/users");
  },
  getUser: function (id) {
    return axios.get(`/api/users/${id}`);
  },
  editUser: function (id) {
    return axios.put(`/api/users/${id}`);
  },
  deleteUser: function (id) {
    return axios.delete(`/api/users/${id}`);
  },
  // API methods for trips
  getTrips: function () {
    return axios.get("/api/trips");
  },
  createTrip: function () {
    return axios.post("/api/trips");
  },
  getTrip: function (id) {
    return axios.get(`/api/trips/${id}`);
  },
  editTrip: function (id) {
    return axios.put(`/api/trips/${id}`);
  },
  deleteTrip: function (id) {
    return axios.delete(`/api/trips/${id}`);
  },
};

export default API;
