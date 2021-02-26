const db = require("../models");
const axios = require("axios");

// Defining methods for the userController
module.exports = {
  getImage: function (req, res) {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Chicago,%20IL&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${process.env.PLACES_API_KEY}`
      )
      .then((response) => {
        console.log(response.data);
        res.json(response.data);
      });
  },
};
