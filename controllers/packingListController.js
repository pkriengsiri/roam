const db = require("../models");
const axios = require("axios");

module.exports = {
  findAll: function (req, res) {
    db.PackingList.find(req.query)
      .then((dbPackingLists) => res.json(dbPackingLists))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.PackingList.findById(req.params.id)
      .then((dbPackingList) => {
        res.json(dbPackingList);
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  },
  create: function (req, res) {
    console.log(req.body);
    db.PackingList.create({
      ...req.body,
    })
      .then((dbPackingList) => {
        // Add packing item to trip
        console.log(dbPackingList)
        addPackingListToTrip(dbPackingList);
        res.json(dbPackingList);
        // Add packing list to user?
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  },
  update: function (req, res) {
    db.PackingList.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    )
      .then((dbPackingList) => res.json(dbPackingList))
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  remove: function (req, res) {
    db.PackingList.findByIdAndDelete(req.params.id)
      .then((dbPackingList) => res.json(dbPackingList))
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
  },
};

const addPackingListToTrip = async (dbPackingListObject) => {
  await db.Trip.findByIdAndUpdate(dbPackingListObject.trip, {
    $push: { list: dbPackingListObject },
  }).catch((err) => {
    console.log(err);
  });
};
