import RoomCode from "../models/RoomCode.js";

/**
 * Generates a 6-digit random number to be used as the meeting's room code.
 * @returns {string} The code for the meeting.
 */
function generateRoomCode() {
  let roomCode = Math.floor(Math.random() * 1000000); // 1,000,000

  // Ensure 6 digits
  if (roomCode < 100000 || roomCode === 1000000) {
    roomCode = Math.floor(Math.random() * 1000000);
  }

  return roomCode.toString();
}

/**
 * Retrieves The value of the roomCode from the database.
 * @param   {string} id The _id property of the room code.
 * @returns {object}    A roomCode object containing the current roomcode.
 */
async function getRoomCode(id) {
  return await RoomCode.findById(id);
}

/**
 * Generates a new room code and saves it in the database.
 */
async function saveNewRoomCode() {
  const newRoomCode = new RoomCode({
    currentRoomCode: generateRoomCode(),
  });
  await newRoomCode.save();
}

/**
 * Generates a new room code and replaces the old room code with the newly generated room code.
 * @param {string} roomCodeDB The current roomCode to changes.
 */
async function updateRoomCode(roomCodeDB) {
  roomCodeDB.currentRoomCode = generateRoomCode();
  await roomCodeDB.save();
}

const roomCodeQueries = {
  getRoomCode,
  saveNewRoomCode,
  updateRoomCode,
};

export default roomCodeQueries;
