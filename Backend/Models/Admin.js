const mongoose = require("mongoose");

const adminschema = new mongoose.Schema({
  Name: { type: String },
  password: { type: String },
});

const Admin = mongoose.model("Admin", adminschema);

module.exports = Admin;
