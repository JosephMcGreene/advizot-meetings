import express from "express";
import User from "../models/User";
import { groups } from "../utils/userRoles";

const usersRouter = express.Router();

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

export default usersRouter;
