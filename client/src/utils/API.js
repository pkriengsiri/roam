import axios from "axios";

const API = {
    getUsers: function() {
        return axios.get("/users");
    },
    createUser: function() {
        return axios.post("/api/users");
    },
    getUser: function(id) {
        return axios.get(`/api/users/${id}`);
    },
    editUser: function(id) {
        return axios.put(`/api/users/${id}`);
    },
    deleteUser: function(id) {
        return axios.delete(`/api/users/${id}`);
    }
}

export default API;