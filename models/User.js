const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  providerID: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  linkedin_email: { type: String },
  google_email: { type: String },
  advizotID: { type: String, required: true },
  role: { type: String, required: true },
  hasMeetingCode: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", userSchema);
