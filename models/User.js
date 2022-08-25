const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	ID: { type: String },
	firstName: { type: String },
	lastName: { type: String },
});

module.exports = mongoose.model("User", userSchema);
