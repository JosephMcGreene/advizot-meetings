const express = require("express");
const Response = require("../models/Response");
const dbRouter = express.Router();
const { userRoles } = require("../utils/userRoles");
const { determineDay } = require("../utils/helpers");

dbRouter
  .route("/responses")
  .get(async function (req, res) {
    try {
      if (req.user.role === userRoles.ADMIN) {
        const responses = await Response.find().or([
          { group: determineDay() },
          { group: "admin" },
        ]);
        console.log(userRoles.ADMIN);
        res.json(responses);
      } else {
        const responses = await Response.find().or([
          { group: req.user.group },
          { group: "admin" },
        ]);
        res.json(responses);
      }
    } catch (error) {
      console.error(error);
    }
  })
  //Used to post both new responses and edit existing responses if there is already one in the db with a matching _id
  .post(async function (req, res) {
    try {
      if (req.body._id) {
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
      });
      await newUserResponse.save();

      res.json(newUserResponse);
    } catch (error) {
      console.error(error);
    }
  })
  .delete(async function (req, res) {
    try {
      const deletionRes = await Response.deleteOne({ _id: req.body._id });
      res.json(deletionRes);
    } catch (error) {
      console.error(error);
    }
  });

module.exports = dbRouter;
