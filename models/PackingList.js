const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PackingListSchema = new Schema({});

const PackingList = mongoose.model("PackingList", PackingListSchema);

module.exports = PackingList;
