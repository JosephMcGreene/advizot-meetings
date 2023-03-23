const express = require("express");
const Passcode = require("../models/Passcode");
const passcodeRouter = express.Router();
const { generatePasscode } = require("../utils/helpers");

passcodeRouter
  .route("/passcode")
  .get((req, res) => {
    const passcode = generatePasscode();
    res.json({ passcode });
  })
  .post((req, res) => {
    if (req.body.enteredCode === "123456") {
      req.user.hasMeetingCode = true;
      res.json(req.user);
    } else {
      console.log("wrong code!");
    }
  });

passcodeRouter.route("/newPasscode").post((req, res) => {
  console.log(req.body);
  res.send("Got it!");
});

module.exports = passcodeRouter;
