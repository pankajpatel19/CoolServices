import mongoose from "mongoose";

const complainSchema = new mongoose.Schema({
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
