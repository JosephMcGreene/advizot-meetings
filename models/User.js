const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	providerID: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
