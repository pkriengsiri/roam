const db = require("../models");
const axios = require("axios");

// Defining methods for the userController
module.exports = {
  getImage: function (req, res) {
    // console.log("API route hit");
    // res.json({ "success": true });
    // Inject destination into input in query URL
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.body.destination}&inputtype=textquery&fields=name,photos&key=${process.env.PLACES_API_KEY}`
      )
      .then((response) => {
        const photoReference =
          response.data.candidates[0].photos[0].photo_reference;
        // Store image URL when we're saving the trip to the database
        const placesImageUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&key=${process.env.PLACES_API_KEY}&maxwidth=400&maxheight=400`;
        res.json(placesImageUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
