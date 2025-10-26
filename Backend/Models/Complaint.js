const mongoose = require("mongoose");

const complainSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
});

const Complain = mongoose.model("Complain", complainSchema);

module.exports = { Complain };
