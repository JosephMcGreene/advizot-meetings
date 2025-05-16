import mongoose from "mongoose";
const { Schema, model } = mongoose;

const signInSchema = new Schema({
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
  forOneToOne: { type: Boolean, required: true },
});

export default model("SignIn", signInSchema);
