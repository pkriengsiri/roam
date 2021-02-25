const db = require("../models");

// Defining methods for the userController
module.exports = {
  findAll: function (req, res) {
    db.Trip.find(req.query)
      .sort({ date: -1 })
      .then((dbTrip) => res.json(dbTrip))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Trip.findById(req.params.id)
      .then((dbTrip) => res.json(dbTrip))
      .catch((err) => res.status(422).json(err));
  },

  // create: function (req, res) {

  //   db.Trip.create(req.body)
  //     .then((dbTrip) => res.json(dbTrip))
  //     .catch((err) => res.status(422).json(err));
  // },
  create: async function (req, res) {
    //   // tripCreator from req.body is validated by database with the schema type?
    //   // make new object to hold request
    let requestObject = req.body;
    let updatedArray = [];
    //   // // loop over travelers to check if they have an account
    for (let i = 0; i < requestObject.travelers.length; i++) {
      requestObject.travelers[i].travelerEmail.toLowerCase();
      await db.User.findOne({ email: requestObject.travelers[i].travelerEmail })
        .then((dbTraveler) => {
          // if user found add to updated Travelers array

          if (dbTraveler) {
            updatedArray.push({
              travelerEmail: dbTraveler.email,
              travelerId: dbTraveler._id,
              status: "Going",
            });
          } else {
            updatedArray.push(requestObject.travelers[i]);
          }
        })
        .catch((err) => console.log(err));
    }
    // update request object with array with user id's
    requestObject.travelers = updatedArray;
    // create trip id
    db.Trip.create(requestObject)
      .then((dbTrip) => {
        dbTrip.travelers
          // filter to only travelers with a trip id
          .filter((traveler) => traveler.travelerId !== "")
          // update each traveler's trips
          .forEach((traveler) => {
   
            db.User.findByIdAndUpdate(traveler.travelerId, {
              $push: { trips: dbTrip._id },
            })
              .then((res) => console.log(traveler.travelerId))
              .catch((err) => console.log(err));
          });
      })
      .then((dbTrip) => {
        res.json(dbTrip);
      })
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Trip.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((dbTrip) => res.json(dbTrip))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    // TODO: have request include user id. make sure userId === tripCreator before deleting

    db.Trip.findById({ _id: req.params.id })
      .then((dbTrip) => dbTrip.remove())
      .then((dbTrip) => res.json(dbTrip))
      .catch((err) => res.status(422).json(err));
  },
};
