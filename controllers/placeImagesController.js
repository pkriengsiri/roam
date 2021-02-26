const db = require("../models");
const axios = require("axios");

// Defining methods for the userController
module.exports = {
  getImage: function (req, res) {
    // Inject destiantion from database into input section 
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Boulder,%20CO&inputtype=textquery&fields=name,photos&key=${process.env.PLACES_API_KEY}`
      )
      .then((response) => {
        const photoReference =
          response.data.candidates[0].photos[0].photo_reference;
        res.json(response.data);
        const placesImage = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&key=${process.env.PLACES_API_KEY}&maxwidth=400&maxheight=400`;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};