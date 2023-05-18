require("dotenv").config();
const express = require("express");
const RoomCode = require("../models/RoomCode");
const roomCodeRouter = express.Router();
const { generateRoomCode } = require("../utils/helpers");

roomCodeRouter
  .route("/roomCode")
  .get(async function (req, res) {
    try {
      const correctCode = await RoomCode.find({});
      res.send(correctCode[0].currentRoomCode);
    } catch (err) {
      throw err;
    }
  })
  .post(async function (req, res) {
    try {
      const correctCode = await RoomCode.find({});

      if (req.body.enteredCode === correctCode[0].currentRoomCode) {
        req.user.hasMeetingCode = true;

        res.json(req.user);
      } else {
        console.log("wrong code!");
      }
    } catch (err) {
      throw err;
    }
  });

roomCodeRouter.route("/newRoomCode").get(async function (req, res) {
  try {
    const correctCode = await RoomCode.findById(process.env.ROOMCODE_ID);
    correctCode.currentRoomCode = generateRoomCode();
    await correctCode.save();

    res.json({ correctCode });
  } catch (err) {
    throw err;
  }
});

module.exports = roomCodeRouter;
