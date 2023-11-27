import { Router } from "express";
//Internal Modules
import User from "../models/User.js";
import SignIn from "../models/SignIn.js";
import { groups } from "../utils/userRoles.js";

const usersRouter = Router();

usersRouter
  .route("/")
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

      const updatedSignIns = await SignIn.updateMany(
        { group: req.body.oldGroup },
        { group: req.body.groupToPlace }
      );

      console.log(updatedSignIns);

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
