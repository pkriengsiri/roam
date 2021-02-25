const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tripSchema = new Schema({
  // tripCreator: { type: String ,trim:true}, //, required: "current user must be the creator"
  tripCreator:{ type: Schema.Types.ObjectId, ref: "User" },
  destination: { type: String, trim:true, required: "Please choose a destination." },
  startDate: {
    type: Date,
    required: "Please choose a start and end date.",
    trim: true,
  },
  endDate: {
    type: Date,
    required: "Please choose a start and end date.",
    trim: true,
  },
  travelers: [
    {
      travelerEmail: { type: String,trim:true },
      status: { type: String ,trim:true},
      // travelerId: { type: Schema.Types.ObjectId, ref: "User" },
      travelerId: { type: String,trim:true },
    },
  ], //array of userIds
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;

// destination: "cancun",
// travelers:[
//   {email:"mary@email.com",
//   userID: 13213516516,
//   status: "confirmed" }
// ]

// travelers: { type: Array }, //array of userIds
// unconfirmedTravelers: { type: Array }, // arr of emails
