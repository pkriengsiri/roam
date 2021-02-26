const db = require("../models");
const axios = require("axios");
const fetch = require("node-fetch");
var cloudinary = require("cloudinary").v2;

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
    console.log(requestObject.destination);
    // Query places route
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${requestObject.destination}&inputtype=textquery&fields=name,photos&key=${process.env.PLACES_API_KEY}`
      )
      .then((response) => {
        const photoReference =
          response.data.candidates[0].photos[0].photo_reference;
        // Store get the image URL
        const placesImageUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&key=${process.env.PLACES_API_KEY}&maxwidth=400&maxheight=400`;
        // Upload the image to cloudinary
        cloudinary.uploader.upload(placesImageUrl, function (error, result) {
          requestObject.imageUrl = result.url;
          console.log(result);
          console.log(requestObject);
          db.Trip.create(requestObject)
            .then((dbTrip) => {
              // ad the trip id to each travel
              addTripToTravelers(dbTrip);
            })
            .then((dbTrip) => {
              res.json(dbTrip);
            })
            .catch((err) => res.status(422).json(err));
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // axios
    //   .post("/api/placeImages", { destination: requestObject.destination })
    //   .then((response) => {
    //     // requestObject.imageUrl = response.data
    //     console.log(response.data);
    //     // create trip id
    //     // db.Trip.create(requestObject)
    //     //   .then((dbTrip) => {
    //     //     // ad the trip id to each travel
    //     //     addTripToTravelers(dbTrip);
    //     //   })
    //     //   .then((dbTrip) => {
    //     //     res.json(dbTrip);
    //     //   })
    //     //   .catch((err) => res.status(422).json(err));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },

  update: async function (req, res) {
    const tripToUpdate = req.params.id;
    // find users who were on the trip to be deleted
    await db.User.find({ trips: tripToUpdate })
      .then((dbTripUsers) => {
        // for each user on the trip, check if they are on the updated trips travelers array
        dbTripUsers.forEach((traveler) => {
          // if user email is not in the updated trip
          if (req.body.travelers.indexOf(dbTripUsers.email) === -1) {
            // remove the trip from the user
            removeTripFromUser(tripToUpdate, traveler).catch((err) =>
              console.log(err)
            );
          } // else do nothing for to user
        });
      })
      .catch((err) => console.log(err));

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

  remove: async function (req, res) {
    // TODO: have request include user id. make sure userId === tripCreator before deleting
    const tripToDelete = req.params.id;
    // find users who were on the trip to be deleted
    await db.User.find({ trips: tripToDelete })
      .then((dbTripUsers) => {
        // for each user on the trip, update their trips array
        dbTripUsers
          .forEach((traveler) => {
            removeTripFromUser(tripToDelete, traveler);
          })
          .then((res) => {
            //  deleted the trip from the trip collection in db
            db.Trip.findById({ _id: tripToDelete })
              .then((dbTrip) => dbTrip.remove())
              .then((dbTrip) => res.json(dbTrip))
              .catch((err) => res.status(422).json(err));
          })
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
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

// users with the trip
const getUsersByTrip = async (tripId) => {};

// update remove trip from user
const removeTripFromUser = async (tripToDelete, user) => {
  let filteredTrips = user.trips.filter((trip) => {
    // trip is an object as it is set as a reference in the model
    return trip != tripToDelete;
  });

  // send filtered trips array to database to update user
  await db.User.findByIdAndUpdate(
    user._id,
    { $set: { trips: filteredTrips } },
    { new: true }
  );
};
