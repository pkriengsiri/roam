const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    index: { unique: true, dropDups: true },
    required: "Please enter an email",
  },
  password: { type: String, trim: true, required: "Please enter a password" },
  firstName: { type: String, trim: true, default: "" },
  lastName: { type: String, trim: true, default: "" },
  profileImageUrl: {
    type: String,
    default:
      "https://res.cloudinary.com/djou7v3ho/image/upload/v1614532245/Avatar-removebg-preview_1_g04ftj.png",
  },
  // recording trips on users and trips may be redundant
  trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
  expenses: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
