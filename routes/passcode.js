const express = require("express");
const Passcode = require("../models/Passcode");
const passcodeRouter = express.Router();
const { generatePasscode } = require("../utils/helpers");

passcodeRouter
  .route("/passcode")
  .get(async function (req, res) {
    try {
      const correctCode = await Passcode.findById("64216da0f106942de7f8129e");
      correctCode.currentPasscode = generatePasscode();
      await correctCode.save();

      res.json({ correctCode });
    } catch (err) {
      throw err;
    }
  })
  .post(async function (req, res) {
    try {
      const correctCode = await Passcode.find({});

      if (req.body.enteredCode === correctCode[0].currentPasscode) {
        req.user.hasMeetingCode = true;
        console.log(`Got it! See?: ${correctCode[0].currentPasscode}`);
        res.json(req.user);
      } else {
        console.log("wrong code!");
      }
    } catch (err) {
      throw err;
    }
  });

module.exports = passcodeRouter;
