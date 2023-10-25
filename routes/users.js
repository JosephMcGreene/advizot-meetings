const express = require("express");
const usersRouter = express.Router();
const User = require("../models/User");
const { groups } = require("../utils/userRoles");

usersRouter
  .route("/users")
  .get(async function (req, res) {
    try {
      const guestUsers = await User.find({ group: groups.GUEST });
      res.json(guestUsers);
    } catch (err) {
      throw new Error(err);
    }
  })
  .put(async function (req, res) {
    try {
      await User.findByIdAndUpdate(req.body.id, {
        group: req.body.groupToPlace,
      });

      res.json({ updatedGroup: req.body.groupToPlace });
    } catch (err) {
      res.json(new Error(err));

      throw new Error(err);
    }
  });

module.exports = usersRouter;