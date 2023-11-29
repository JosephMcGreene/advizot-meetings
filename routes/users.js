import { Router } from "express";
//Internal Modules
import User from "../models/User.js";
import SignIn from "../models/SignIn.js";

const usersRouter = Router();

usersRouter
  .route("/")
  .post(async function (req, res) {
    try {
      const usersToEdit = await User.find({ group: req.body.group });

      res.statusMessage = "Found users to edit";
      res.json(usersToEdit);
    } catch (err) {
      res.json(new Error(err));
      throw new Error(err);
    }
  })
  .put(async function (req, res) {
    try {
      await User.findByIdAndUpdate(req.body.id, {
        group: req.body.groupToPlace,
      });

      const updatedSignIns = await SignIn.updateMany(
        { group: req.body.oldGroup },
        { group: req.body.groupToPlace }
      );

      res.statusMessage = "Updated a user and their sign-ins";
      res.json({
        updatedGroup: req.body.groupToPlace,
        numOfSignInUpdates: updatedSignIns.modifiedCount,
      });
    } catch (err) {
      res.json(new Error(err));
      throw new Error(err);
    }
  });

export default usersRouter;
