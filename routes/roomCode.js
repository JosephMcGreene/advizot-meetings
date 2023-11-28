import { config } from "dotenv";
import { Router } from "express";
import RoomCode from "../models/RoomCode.js";
import { generateRoomCode } from "../utils/helpers.js";

config();
const roomCodeRouter = Router();

roomCodeRouter.route("/submitRoomCode").post(async function (req, res) {
  try {
    const roomCodeDB = await RoomCode.findById(process.env.ROOMCODE_ID);

    if (req.body.enteredCode === roomCodeDB.currentRoomCode) {
      req.user.hasMeetingCode = true;

      res.json(req.user);
    } else {
      req.user.hasMeetingCode = false;
      res.json(req.user);
    }
  } catch (err) {
    throw err;
  }
});

roomCodeRouter.route("/setRoomCode").post(async function (req, res) {
  try {
    const roomCodeDB = await RoomCode.findById(process.env.ROOMCODE_ID);

    if (roomCodeDB && req.body.needNewCode) {
      roomCodeDB.currentRoomCode = generateRoomCode();
      await roomCodeDB.save();
    }

    if (!roomCodeDB) {
      const newRoomCode = new RoomCode({
        currentRoomCode: generateRoomCode(),
      });
      await newRoomCode.save();
    }

    res.json({ roomCodeDB });
  } catch (err) {
    throw err;
  }
});

export default roomCodeRouter;
