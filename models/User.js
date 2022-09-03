const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	ID: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	clearance: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
