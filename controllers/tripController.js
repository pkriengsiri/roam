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
  create: function (req, res) {
   
    // tripCreator from req.body is validated by database with the schema type?
    // make new object to hold request
    let requestObject = req.body;
    const updatedTravelers = [];
    // // loop over travelers to check if they have an account
    for (let i = 0; i < requestObject.travelers.length; i++) {
      db.User.findOne({ email: requestObject.travelers[i].travelerEmail })
        .then((dbTraveler) => {
          // if user found add to updated Travelers array
        if (dbTraveler){
          updatedTravelers.push({travelerEmail:dbTraveler.email, travelerId:dbTraveler._id,status:"Going"})
        } else {
          updatedTravelers.push(requestObject.travelers[i])
        }
        })
        .catch((err) => console.log(err));
    }
    console.log(updatedTravelers)
    requestObject.travelers=updatedTravelers;
    db.Trip.create(requestObject)

      .then((dbTrip) => res.json(dbTrip))
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
