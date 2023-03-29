require("dotenv").config();
const express = require("express");
const Passcode = require("../models/Passcode");
const passcodeRouter = express.Router();
const { generatePasscode } = require("../utils/helpers");

passcodeRouter
  .route("/passcode")
  .get(async function (req, res) {
    try {
      const correctCode = await Passcode.find({});
      res.send(correctCode[0].currentPasscode);
    } catch (err) {
      throw err;
    }
  })
  .post(async function (req, res) {
    try {
      const correctCode = await Passcode.find({});

      if (req.body.enteredCode === correctCode[0].currentPasscode) {
        req.user.hasMeetingCode = true;

        res.json(req.user);
      } else {
        console.log("wrong code!");
      }
    } catch (err) {
      throw err;
    }
  });

passcodeRouter.route("/newPasscode").get(async function (req, res) {
  try {
    const correctCode = await Passcode.findById(process.env.PASSCODE_ID);
    correctCode.currentPasscode = generatePasscode();
    await correctCode.save();

    res.json({ correctCode });
  } catch (err) {
    throw err;
  }
});

module.exports = passcodeRouter;