import SignIn from "../models/SignIn.js";
import { groupForToday } from "../lib/helpers.js";
import { userRoles } from "../lib/userRoles.js";
import {
  deleteOneSignIn,
  getAdminSignIns,
  getGroupSignInsForAdmins,
  getGroupSignInsForMembers,
} from "./signIns.queries.js";

async function putToSignIns(req, res) {
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
      await deleteOneSignIn(req.body._id);

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

async function deleteToSignIns(req, res) {
  try {
    const deletionRes = await deleteOneSignIn(req.body.signInID);

    res.statusMessage = "Sign-in deleted";
    res.json({ deletionRes, signInID: req.body.signInID });
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

/**
 * Handles GET requests for sign-ins as well as groups, since as of 4/3/24 the app only cares about retrieving sign-ins for an entire group
 * @param {Object} req request object from the client
 * @param {Object} res response object to the client
 * @returns
 */
async function getToGroup(req, res) {
  try {
    // If user is an admin and requests to see a specific group:
    if (
      req.user.group === userRoles.ADMIN &&
      req.params.group !== userRoles.ADMIN
    ) {
      const groupSignIns = await getGroupSignInsForAdmins(req.params.group);

      res.statusMessage = "Sign-ins found";
      return res.json({ group: req.params.group, groupSignIns });
    }

    // Default behavior for admins on log-in: get responses for admins only
    if (req.user.group === userRoles.ADMIN) {
      const groupSignIns = await getAdminSignIns();

      res.statusMessage = "Sign-ins found";
      return res.json({ group: groupForToday(), groupSignIns });
    }

    // Default behavior, used for members accessing their own group
    const groupSignIns = await getGroupSignInsForMembers(req.user.group);

    res.statusMessage = "Sign-ins found";
    return res.json({ group: req.params.group, groupSignIns });
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

const signInsController = {
  putToSignIns,
  deleteToSignIns,
  getToGroup,
};

export default signInsController;
