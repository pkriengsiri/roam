const db = require("../models");

// Defining methods for the userController
module.exports = {
  findAllByUserId: function (req, res) {
    // /api/trips?userId=youruuidgoeshere
    db.User.findById(req.query.userId)
      .populate("trips")
      .then((user) => {
        res.json(user.trips);
      });
  },
  findTripByUserIdAndTripId: function(req, res) {
    db.Trip.findById(req.params.tripId).then(foundTrip => {
      if(foundTrip.creatorId === req.params.userId || foundTrip.travelers.includes(req.params.userId)){
        res.json(foundTrip);
      }
    })
  },
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
    db.Trip.create(req.body)
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
    db.Trip.findById({ _id: req.params.id })
      .then((dbTrip) => dbTrip.remove())
      .then((dbTrip) => res.json(dbTrip))
      .catch((err) => res.status(422).json(err));
  },
};
