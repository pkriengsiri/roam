const db = require("../models");
const cloudinary = require("cloudinary").v2;

// Defining methods for the userController
module.exports = {
  findAll: function (req, res) {
    db.User.find(req.query)
      .sort({ date: -1 })
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
  },

  findById: function (req, res) {
    db.User.findById(req.params.id)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
  },

  findByIdWithTrips: function (req, res) {
    db.User.findById(req.params.userId)
      .populate({ path: "trips", options: { sort: { startDate: -1 } } })
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
  },

  findByIdWithExpenses: function (req, res) {
    db.User.findById(req.params.id)
      .populate("expenses")
      .then((dbTrip) => res.json(dbTrip))
      .catch((err) => res.status(422).json(err));
  },
  findByIdWithExpensesAndTrips: function (req, res) {
    db.User.findById(req.params.id)
      .populate("expenses")
      .populate("trips")
      .then((dbTrip) => res.json(dbTrip))
      .catch((err) => res.status(422).json(err));
  },

  create: function (req, res) {
    db.User.create({
      ...req.body,
      email: req.body.email.toLowerCase(),
      profileImageUrl: res.url,
    })
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
  },

  uploadImage: function (req, res) {
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
      if (err) throw err;
      db.User.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body, profileImageUrl: result.url },
        { new: true }
      )
        .then((dbUser) => res.send({url: dbUser.profileImageUrl}))
        .catch((err) => {
          console.log(err);
          res.status(422).json(err)});
    });
  },

  update: function (req, res) {
    db.User.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body, email: req.body.email.toLowerCase() },
      {
        new: true,
      }
    )
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User.findById({ _id: req.params.id })
      .then((dbUser) => dbUser.remove())
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
  },
};
