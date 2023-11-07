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
      if (req.body?._id) {
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
  .post(async function (req, res) {
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

dbRouter.route("/responses/:group").get(async function (req, res) {
  try {
    const threeDaysAgo = Date.now() - 1000 * 60 * 60 * 24 * 3;

    // If user is an admin and requests to see a specific group
    if (
      req.user.group === userRoles.ADMIN &&
      req.params.group !== userRoles.ADMIN
    ) {
      const groupResponses = await Response.find()
        .or([{ group: userRoles.ADMIN }, { group: req.params.group }])
        .gte("date", threeDaysAgo);

      return res.json({ group: req.params.group, groupResponses });
    }

    // Default behavior for admins on log-in: get responses for today's group
    if (req.user.group === userRoles.ADMIN) {
      const groupResponses = await Response.find()
        .or([{ group: userRoles.ADMIN }, { group: groupForToday() }])
        .gte("date", threeDaysAgo);

      return res.json({ group: req.params.group, groupResponses });
    }

    // Default behavior, used for members accessing their own group
    const groupResponses = await Response.find()
      .or([{ group: req.user.group }, { group: userRoles.ADMIN }])
      .gte("date", threeDaysAgo);
    return res.json({ group: req.params.group, groupResponses });
  } catch (err) {
    throw new Error(err);
  }
});

export default dbRouter;
