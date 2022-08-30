const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
	userName: { type: String, required: true },
	business: { type: Number, required: true },
	personal: { type: Number, required: true },
	relationships: { type: Number, required: true },
	monthlyIssue: { type: String, required: true },
	priority: { type: String, required: true },
	monthlyGoal: { type: String, required: true },
	date: { type: Date, required: true },
});

module.exports = mongoose.model("Response", responseSchema);
