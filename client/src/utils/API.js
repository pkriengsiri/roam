import axios from "axios";

const API = {
  // API methods for users
  getUsers: function () {
    return axios.get("/api/users");
  },
  createUser: function (userData) {
    return axios.post("/api/auth/signup", userData);
  },
  loginUser: function (userData) {
    return axios.post("/api/auth/login", userData);
  },
  getUser: function (id) {
    return axios.get(`/api/users/${id}`);
  },
  getUserWithTrips: function (id) {
    return axios.get(`/api/users/${id}/trips`);
  },
  editUser: function (id, userData) {
    return axios.put(`/api/users/${id}`, userData);
  },
  deleteUser: function (id) {
    return axios.delete(`/api/users/${id}`);
  },
  // API methods for trips
  getTrips: function () {
    return axios.get("/api/trips");
  },
  createTrip: function (tripData) {
    // return axios.post({"/api/trips", tripData, responseType:"blob"});
    return axios({
      method: "POST",
      url: "/api/trips",
      data: tripData,
    });
  },
  getTrip: function (id) {
    return axios.get(`/api/trips/${id}`);
  },
  editTrip: function (id, tripData) {
    return axios.put(`/api/trips/${id}`, tripData);
  },
  deleteTrip: function (id) {
    return axios.delete(`/api/trips/${id}`);
  },
};

export default API;
