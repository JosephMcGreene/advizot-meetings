import SignIn from "../models/SignIn.js";
import { userRoles } from "../lib/userRoles.js";

export function deleteOneSignIn(id) {
  return SignIn.deleteOne({ _id: id });
}

// 2 weeks = 1000ms/second, 60s/minute, 60min/hour, 24h/day, 7days/week (x2)
const twoWeeksAgo = Date.now() - 1000 * 60 * 60 * 24 * 14;

export function getAdminSignIns() {
  return SignIn.find({ group: userRoles.ADMIN }).gte("date", twoWeeksAgo);
}

export function getGroupSignInsForAdmins(group) {
  return SignIn.find()
    .or([{ group: userRoles.ADMIN }, { group: group }])
    .gte("date", twoWeeksAgo);
}

export function getGroupSignInsForMembers(group) {
  return SignIn.find()
    .or([{ group: group }, { group: userRoles.ADMIN }])
    .gte("date", twoWeeksAgo);
}

export const signInDB = (req) => {
  return new SignIn({
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
};
