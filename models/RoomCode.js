import mongoose from "mongoose";
const { Schema, model } = mongoose;

const roomCodeSchema = new Schema({
  currentRoomCode: { type: String, required: true },
});

export default model("RoomCode", roomCodeSchema);
