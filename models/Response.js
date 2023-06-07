const { Schema, model } = require("mongoose");

const responseSchema = new Schema({
  userName: { type: String, required: true },
  business: { type: Number, required: true },
  personal: { type: Number, required: true },
  relationships: { type: Number, required: true },
  monthlyIssue: { type: String, required: true },
  priority: { type: String, required: true },
  monthlyGoal: { type: String, required: true },
  date: { type: Date, required: true },
  group: { type: String, required: true },
  userID: { type: String, required: true },
});

module.exports = model("Response", responseSchema);
