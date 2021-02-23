const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tripSchema = new Schema({
  tripCreator: { type: String },
  destination: { type: String, required: "Please choose a destination." },
  travelStartDate: { type: Date, required: "Please choose a start and end date.", trim: true },
  travelEndDate: { type: Date, required: "Please choose a start and end date.", trim: true },
  travelers: { type: Array },
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
