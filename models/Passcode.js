const { Schema, model } = require("mongoose");

const passcodeSchema = new Schema({
  currentPasscode: { type: String, required: true },
});

module.exports = model("Passcode", passcodeSchema, "passcode");
//There is only one passcode, so I changed the name of the MongoDB collection from the default plural "passcodes" to singular "passcode"
