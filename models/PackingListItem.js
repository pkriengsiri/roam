const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PackingListItemSchema = new Schema({
  packingListCreator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  trip: {
    type: Schema.Types.ObjectId,
    ref: "Trip",
  },

 item: {
   type: String,
   required: "You have to take something on your trip.",
   trim: true,
 },

 packed: {
   type: Boolean,
   default: false
 }

});

const PackingListItem = mongoose.model("PackingListItem", PackingListItemSchema);

module.exports = PackingListItem;
