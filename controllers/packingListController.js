const db = require("../models");
const axios = require("axios");

module.exports = {
  findById: function (req, res) {
    db.PackingList.findById(req.params.id)
      .then((dbPackingList) => {
        res.json(packingList);
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  },
  create: function (req, res) {
    db.Packing.create({
      ...req.body,
    })
      .then((dbPackingList) => {
        res.json(dbPackingList);
        // Add packing item to trip
        // Add packing list to user?
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  },
};

const addPackingListToTrip = async (dbPackingListObject) => {
  await db.Trip.findByIdAndUpdate(dbPackingListObject.trip, {
    $push: { packingList: dbPackingListObject },
  }).catch((err) => {
    console.log(err);
  });
};
