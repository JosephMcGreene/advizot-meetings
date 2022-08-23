const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	linkedinID: { type: String },
	firstName: { type: String },
	lastName: { type: String },
});

module.exports = mongoose.model("User", userSchema);
