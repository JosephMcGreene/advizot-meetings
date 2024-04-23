import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  googleID: { type: String },
  linkedinID: { type: String },
  email: { type: String, required: true },
  photo: { type: String, required: true },
  advizotID: { type: String, required: true },
  role: { type: String, required: true },
  group: { type: String, required: true },
  hasMeetingCode: { type: Boolean, required: true },
});

export default model("User", userSchema);
