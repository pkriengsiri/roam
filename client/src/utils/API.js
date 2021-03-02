import axios from "axios";

const API = {
  // API methods for users
  getUsers: function () {
    return axios.get("/api/users");
  },
  relogin: function() {
    return axios.get("/api/auth/relogin");
  },
  createUser: function (userData) {
    return axios.post("/api/auth/signup", userData);
  },
  loginUser: function (userData) {
    return axios.post("/api/auth/login", userData);
  },
  logoutUser: function () {
    return axios.get("/api/auth/logout");
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
    return axios.post("/api/trips", tripData);
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

  // API methods for expenses
  getExpense: function (id) {
    return axios.get(`/api/expenses/${id}`);
  },

  createExpense: function (expenseData) {
    return axios.post(`/api/expenses`, expenseData);
  },

  editExpense: function (id, expenseData) {
    return axios.put(`/api/expenses/${id}`, expenseData);
  },

  deleteExpense: function (id) {
    return axios.delete(`/api/expenses/${id}`);
  },

  // API methods for packing list
  getList: function (id) {
    return axios.get(`/api/packing-list-items/${id}`)
  },

  createItem: function npm(itemData) {
    return axios.post(`/api/packing-list-items`, itemData)
  }
};

export default API;
