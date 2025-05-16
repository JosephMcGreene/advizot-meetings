import mongoose from "mongoose";
const { Schema, model } = mongoose;

const signInSchema = new Schema({
  business: { type: Number, required: true },
  date: { type: Date, required: true },
  forOneToOne: { type: Boolean, required: true },
  group: { type: String, required: true },
  monthlyGoal: { type: String, required: true },
  monthlyIssue: { type: String, required: true },
  personal: { type: Number, required: true },
  priority: { type: String, required: true },
  relationships: { type: Number, required: true },
  userID: { type: String, required: true },
  userName: { type: String, required: true },
});

export default model("SignIn", signInSchema);
