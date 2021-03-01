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

  list: [
    {
      item: { type: String, trim: true },
      packed: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const PackingList = mongoose.model("PackingList", PackingListSchema);

module.exports = PackingList;
