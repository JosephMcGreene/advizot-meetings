require("dotenv").config();
const express = require("express");
const RoomCode = require("../models/RoomCode");
const roomCodeRouter = express.Router();
const { generateRoomCode } = require("../utils/helpers");

roomCodeRouter.route("/submitRoomCode").post(async function (req, res) {
  try {
    const roomCodeDB = await RoomCode.findById(process.env.ROOMCODE_ID);

    if (req.body.enteredCode === roomCodeDB.currentRoomCode) {
      req.user.hasMeetingCode = true;

      res.json(req.user);
    } else {
      console.log("wrong code!");
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

module.exports = roomCodeRouter;