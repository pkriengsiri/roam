const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tripSchema = new Schema({
  tripCreator: { type: String },
  destination: { type: String, required: true },
  travelStartDate: { type: Date, required: true, trim: true },
  travelEndDate: { type: Date, required: true, trim: true },
  travelers: { type: Array },
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
