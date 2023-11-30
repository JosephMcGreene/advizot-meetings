import { config } from "dotenv";
import { Router } from "express";
import RoomCode from "../models/RoomCode.js";
import { generateRoomCode } from "../utils/helpers.js";

config();
const roomCodeRouter = Router();

roomCodeRouter
  .route("/")
  .post(async function (req, res) {
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
  })
  .put(async function (req, res) {
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
  });

export default roomCodeRouter;
