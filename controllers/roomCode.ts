import roomCodeQueries from "./roomCode.queries.js";
import { config } from "dotenv";

config();

/**
 * Checks to see if the current user has entered the correct room code to access their group meeting and updates the user's boolean hasMeetingCode property accordingly.
 * @param   {object} req The HTTP request object.
 * @param   {object} res The HTTP response object.
 * @returns {object}     A user object with an updated hasMeetingCode property.
 */
async function checkRoomCode(req, res) {
  try {
    const { currentRoomCode } = await roomCodeQueries.getRoomCode(
      process.env.ROOMCODE_ID
    );

    if (req.body.enteredCode === currentRoomCode) {
      req.user.hasMeetingCode = true;
      return res.json(req.user);
    }

    req.user.hasMeetingCode = false;
    return res.json(req.user);
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

/**
 * Adds a new room code if there is not one in the database, or updates the existing room code in the database.
 * @param {object} req The HTTP request object.
 * @param {object} res The HTTP response object.
 */
async function updateRoomCode(req, res) {
  try {
    const roomCodeDB = await roomCodeQueries.getRoomCode(
      process.env.ROOMCODE_ID
    );

    if (roomCodeDB) {
      roomCodeQueries.updateRoomCode(roomCodeDB);
      res.statusCode = 200;
    }

    if (!roomCodeDB) {
      roomCodeQueries.saveNewRoomCode();
      res.statusCode = 201;
    }

    res.json({ roomCodeDB });
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

const roomCodeController = { checkRoomCode, updateRoomCode };

export default roomCodeController;
