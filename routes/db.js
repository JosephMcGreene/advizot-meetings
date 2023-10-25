import express from "express";
import Response from "../models/Response";

const dbRouter = express.Router();

dbRouter
  .route("/responses")
  .get(async function (req, res) {
    try {
      const responses = await Response.find({});
      // .or([
      //   { group: req.user.group },
      //   { group: "admin" },
      // ]);
      //
      // Also needs to filter out old responses, so only the current meeting's responses are displayed to user
      //

      return res.json(responses);
    } catch (err) {
      throw new Error(err);
    }
  })
  .put(async function (req, res) {
    try {
      if (req.body?._id !== undefined) {
        await Response.deleteOne({ _id: req.body._id });
      }

      const newUserResponse = new Response({
        userName: req.user.firstName + " " + req.user.lastName,
        business: req.body.business,
        personal: req.body.personal,
        relationships: req.body.relationships,
        monthlyIssue: req.body.monthlyIssue,
        priority: req.body.priority,
        monthlyGoal: req.body.monthlyGoal,
        date: Date.now(),
        group: req.user.group,
        userID: req.user.advizotID,
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
    const groupResponses = await Response.find({ group: req.user.group });
    return res.json(groupResponses);
  } catch (err) {
    throw new Error(err);
  }
});

export default dbRouter;
