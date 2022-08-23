const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username required"],
    // unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    // unique: true,
  },
});

const User = mongoose.model("member", userSchema, "members");

module.exports = User;
