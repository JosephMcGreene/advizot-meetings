const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
	businessHealth: { type: Number, required: true },
	personalHealth: { type: Number, required: true },
	relationshipHealth: { type: Number, required: true },
	monthlyIssue: { type: String, required: true },
	priority: { type: String, required: true },
	monthlyGoal: { type: String, required: true },
});

module.exports = mongoose.model("Response", responseSchema);
