import SignIn from "../models/SignIn.js";
import { groupForToday } from "../lib/helpers.js";
import { userRoles } from "../lib/userRoles.js";

export async function putToSignIns(req, res) {
  try {
    const newSignIn = new SignIn({
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
    await newSignIn.save();

    if (req.body?._id) {
      await SignIn.deleteOne({ _id: req.body._id });
      res.statusMessage = "Sign-in updated";
    } else {
      res.statusCode = 201;
      res.statusMessage = "Sign-in created";
    }
    res.json(newSignIn);
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

export async function deleteToSignIns(req, res) {
  try {
    const deletionRes = await SignIn.deleteOne({
      _id: req.body.signInID,
    });

    res.statusMessage = "Sign-in deleted";
    res.json({ deletionRes, signInID: req.body.signInID });
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

export async function getToGroup(req, res) {
  try {
    const oneWeekAgo = Date.now() - 1000 * 60 * 60 * 24 * 7;

    // If user is an admin and requests to see a specific group
    if (
      req.user.group === userRoles.ADMIN &&
      req.params.group !== userRoles.ADMIN
    ) {
      const groupSignIns = await SignIn.find()
        .or([{ group: userRoles.ADMIN }, { group: req.params.group }])
        .gte("date", oneWeekAgo);

      res.statusMessage = "Sign-ins found";
      return res.json({ group: req.params.group, groupSignIns });
    }

    // Default behavior for admins on log-in: get responses for admins only
    if (req.user.group === userRoles.ADMIN) {
      const groupSignIns = await SignIn.find({ group: userRoles.ADMIN }).gte(
        "date",
        oneWeekAgo
      );

      res.statusMessage = "Sign-ins found";
      return res.json({ group: groupForToday(), groupSignIns });
    }

    // Default behavior, used for members accessing their own group
    const groupSignIns = await SignIn.find()
      .or([{ group: req.user.group }, { group: userRoles.ADMIN }])
      .gte("date", oneWeekAgo);

    res.statusMessage = "Sign-ins found";
    return res.json({ group: req.params.group, groupSignIns });
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}
