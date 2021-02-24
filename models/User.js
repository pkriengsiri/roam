const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: "Please enter an email",
  },
  password: { type: String, trim: true, required: "Please enter a password" },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  // recording trips on users and trips may be redundant
  trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
