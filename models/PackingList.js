const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PackingListSchema = new Schema({
  packingListCreator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  trip: {
    type: Schema.Types.ObjectId,
    ref: "Trip",
  },
  packed: {
    type: Boolean,
    default: false,
  },
  item: {
    type: String,
    trim: true,
  },
});

const PackingList = mongoose.model("PackingList", PackingListSchema);

module.exports = PackingList;
