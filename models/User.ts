import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  advizotID: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  googleID: { type: String },
  group: { type: String, required: true },
  hasMeetingCode: { type: Boolean, required: true },
  lastName: { type: String, required: true },
  linkedinID: { type: String },
  photo: { type: String, required: true },
  role: { type: String, required: true },
});

export default model("User", userSchema);
