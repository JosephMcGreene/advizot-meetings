import SignIn from "../models/SignIn.js";
import { userRoles } from "../lib/userRoles.js";

export function deleteOneSignIn(id) {
  return SignIn.deleteOne({ _id: id });
}

const oneWeekAgo = Date.now() - 1000 * 60 * 60 * 24 * 7;

export function getAdminSignIns() {
  return SignIn.find({ group: userRoles.ADMIN }).gte("date", oneWeekAgo);
}

export function getGroupSignInsForAdmins(group) {
  return SignIn.find()
    .or([{ group: userRoles.ADMIN }, { group: group }])
    .gte("date", oneWeekAgo);
}

export function getGroupSignInsForMembers(group) {
  return SignIn.find()
    .or([{ group: group }, { group: userRoles.ADMIN }])
    .gte("date", oneWeekAgo);
}
