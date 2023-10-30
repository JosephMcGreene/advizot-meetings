import { Router } from "express";
//Internal Modules
import Response from "../models/Response.js";
import { groupForToday } from "../utils/helpers.js";
import { userRoles } from "../utils/userRoles.js";

const dbRouter = Router();

dbRouter
  .route("/responses")
  .put(async function (req, res) {
    try {
      if (req.body?._id !== undefined) {
        await Response.deleteOne({ _id: req.body._id });
      }

      const newUserResponse = new Response({
        userName: req.body.userName,
        business: req.body.business,
        personal: req.body.personal,
        relationships: req.body.relationships,
        monthlyIssue: req.body.monthlyIssue,
        priority: req.body.priority,
        monthlyGoal: req.body.monthlyGoal,
        date: req.body.date,
        group: req.body.group,
        userID: req.body.userID,
      });
      await newUserResponse.save();

      res.json(newUserResponse);
    } catch (err) {
      throw new Error(err);
    }
  })
  .delete(async function (req, res) {
    try {
      const deletionRes = await Response.deleteOne({
        _id: req.body.responseID,
      });

      res.json({ deletionRes, responseID: req.body.responseID });
    } catch (err) {
      throw new Error(err);
    }
  });

dbRouter.route("/responses/filters").post(async function (req, res) {
  try {
    // Mongoose query for getting the right responses for:
    // req.group
    // req.viewAdminResponses
    const groupResponses = await Response.find().or([
      { group: req.group },
      { group: "admin" },
    ]);

    return res.json(groupResponses);
  } catch (err) {
    throw new Error(err);
  }
});

dbRouter.route("/responses/:group").get(async function (req, res) {
  try {
    let groupResponses;

    if (req.user.group === userRoles.ADMIN) {
      groupResponses = await Response.find().or([
        { group: req.user.group },
        { group: groupForToday() },
      ]);
      return res.json(groupResponses);
    } else {
      groupResponses = await Response.find({ group: req.user.group });
      return res.json(groupResponses);
    }
  } catch (err) {
    throw new Error(err);
  }
});

export default dbRouter;
