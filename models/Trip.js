const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tripSchema = new Schema({
  tripCreator: { type: String }, //, required: "current user must be the creator"
  destination: { type: String, required: "Please choose a destination." },
  startDate: { type: Date, required: "Please choose a start and end date.", trim: true },
  endDate: { type: Date, required: "Please choose a start and end date.", trim: true },
  travelers: { type: Array }, //array of userIds

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