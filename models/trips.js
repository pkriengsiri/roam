const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tripSchema = new Schema({
  
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;