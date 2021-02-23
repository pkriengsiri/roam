const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tripSchema = new Schema({
  tripCreator: {
    type: String,
    required: true,
    trim: true,
  },
  destination: {
    type: String,
    required: true,
    trim: true,
  },
  travelStartDate: {
    type: Date,
    required: true,
    trim: true,
  },
  travelEndDate: {
    type: Date,
    required: true,
    trim: true,
  },
  travelers: {
    type: Array,
    required: true,
    trim: true,
  },
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
