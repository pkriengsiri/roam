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


  create: async function (req, res) {
    // add user ids for by email
    const requestObject = await addTravelerIdByEmail(req.body);
    // create trip id
    db.Trip.create(requestObject)
      .then((dbTrip) => {
        // ad the trip id to each travel
        addTripToTravelers(dbTrip);
      })
      .then((dbTrip) => {
        res.json(dbTrip);
      })
      .catch((err) => res.status(422).json(err));
  },



  update: async function (req, res) {
    // add user ids for by email
    const requestObject = await addTravelerIdByEmail(req.body);
    db.Trip.findOneAndUpdate({ _id: req.params.id }, requestObject, {
      new: true,
    })
      .then((dbTrip) => {
        // ad the trip id to each travel
        addTripToTravelers(dbTrip);
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

// add the traveler id to the travelers array based on traveler email
const addTravelerIdByEmail = async (requestObject) => {
  //   // tripCreator from req.body is validated by database with the schema type?
  //   // make new object to hold request

  let updatedArray = [];
  //   // // loop over travelers to check if they have an account
  for (let i = 0; i < requestObject.travelers.length; i++) {
    // if email provided, set to lowercase
    if (requestObject?.travelers[i].travelerEmail) {
      requestObject.travelers[i].travelerEmail.toLowerCase();
    }
    await db.User.findOne({ email: requestObject?.travelers[i]?.travelerEmail })
      .then((dbTraveler) => {
        // if user found add to updated Travelers array

        if (dbTraveler) {
          updatedArray.push({
            travelerEmail: dbTraveler.email.toLowerCase(),
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
  return requestObject;
};

// after trip is created, add the trip id for each traveler with a traveler id
const addTripToTravelers = async (dbObject) => {
  await dbObject.travelers
    // filter to only travelers with a trip id
    .filter((traveler) => traveler.travelerId !== "")
    // update each traveler's trips
    .forEach((traveler) => {
      db.User.findByIdAndUpdate(traveler.travelerId, {
        $push: { trips: dbObject._id },
      })
        // .then((res) => console.log(res))
        .catch((err) => console.log(err));
    });
};
