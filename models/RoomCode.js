const { Schema, model } = require("mongoose");

const roomCodeSchema = new Schema({
  currentRoomCode: { type: String, required: true },
});

module.exports = model("RoomCode", roomCodeSchema);
