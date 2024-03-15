import { config } from "dotenv";
import RoomCode from "../models/RoomCode.js";
import { generateRoomCode } from "../lib/helpers.js";

config();

async function post(req, res) {
  try {
    const { currentRoomCode } = await RoomCode.findById(
      process.env.ROOMCODE_ID
    );

    if (req.body.enteredCode === currentRoomCode) {
      req.user.hasMeetingCode = true;

      res.json(req.user);
    } else {
      req.user.hasMeetingCode = false;
      res.json(req.user);
    }
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

async function put(req, res) {
  try {
    const roomCodeDB = await RoomCode.findById(process.env.ROOMCODE_ID);

    if (roomCodeDB && req.body.needNewCode) {
      roomCodeDB.currentRoomCode = generateRoomCode();
      await roomCodeDB.save();
      res.statusCode = 200;
    }

    if (!roomCodeDB) {
      const newRoomCode = new RoomCode({
        currentRoomCode: generateRoomCode(),
      });
      await newRoomCode.save();
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
