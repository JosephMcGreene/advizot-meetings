import { Schema, model } from "mongoose";

const roomCodeSchema = new Schema({
  currentRoomCode: { type: String, required: true },
});

export default model("RoomCode", roomCodeSchema);
