import { config } from "dotenv";
import {
  getRoomCode,
  saveNewRoomCode,
  updateRoomCode,
} from "./roomCode.queries.js";

config();

async function post(req, res) {
  try {
    const { currentRoomCode } = await getRoomCode(process.env.ROOMCODE_ID);

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

async function put(req, res) {
  try {
    const roomCodeDB = await getRoomCode(process.env.ROOMCODE_ID);

    if (roomCodeDB && req.body.needNewCode) {
      updateRoomCode(roomCodeDB);
      res.statusCode = 200;
    }

    if (!roomCodeDB) {
      saveNewRoomCode();
      res.statusCode = 201;
    }

    res.json({ roomCodeDB });
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

const roomCodeController = { post, put };

export default roomCodeController;
