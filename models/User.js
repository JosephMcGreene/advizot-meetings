import { Schema, model } from "mongoose";

const userSchema = new Schema({
  providerID: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  linkedin_email: { type: String },
  google_email: { type: String },
  photo: { type: String, required: true },
  advizotID: { type: String, required: true },
  role: { type: String, required: true },
  group: { type: String, required: true },
  hasMeetingCode: { type: Boolean, required: true },
});

export default model("User", userSchema);
