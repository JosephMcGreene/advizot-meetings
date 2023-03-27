const { Schema, model } = require("mongoose");

const passcodeSchema = new Schema({
  currentPasscode: { type: String, required: true },
});

module.exports = model("Passcode", passcodeSchema);
