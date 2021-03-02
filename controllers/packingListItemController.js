const db = require("../models");
const axios = require("axios");

module.exports = {
  findAll: function (req, res) {
    db.PackingListItem.find(req.query)
      .then((dbPackingListItems) => res.json(dbPackingListItems))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.PackingListItem.findById(req.params.id)
      .then((dbPackingListItem) => {
        res.json(dbPackingListItem);
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  },
  create: function (req, res) {
    console.log(req.body);
    db.PackingListItem.create({
      ...req.body,
    })
      .then((dbPackingListItem) => {
        // Add packing item to trip
        console.log(dbPackingListItem)
        addPackingListItemToTrip(dbPackingListItem);
        res.json(dbPackingListItem);
        // Add packing list to user?
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  },
  update: function (req, res) {
    db.PackingListItem.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    )
      .then((dbPackingListItem) => res.json(dbPackingListItem))
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  remove: function (req, res) {
    db.PackingListItem.findByIdAndDelete(req.params.id)
      .then((dbPackingListItem) => res.json(dbPackingListItem))
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
  },
};

const addPackingListItemToTrip = async (dbPackingListItemObject) => {
  await db.Trip.findByIdAndUpdate(dbPackingListItemObject.trip, {
    $push: { list: dbPackingListItemObject },
  }).catch((err) => {
    console.log(err);
  });
};
