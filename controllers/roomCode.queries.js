import { generateRoomCode } from "../lib/helpers.js";
import RoomCode from "../models/RoomCode.js";

export function getRoomCode(id) {
  return RoomCode.findById(id);
}

export async function saveNewRoomCode() {
  const newRoomCode = new RoomCode({
    currentRoomCode: generateRoomCode(),
  });
  await newRoomCode.save();
}

export async function updateRoomCode(roomCodeDB) {
  roomCodeDB.currentRoomCode = generateRoomCode();
  await roomCodeDB.save();
}
