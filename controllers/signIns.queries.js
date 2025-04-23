import SignIn from "../models/SignIn.js";
import { userRoles } from "../lib/userRoles.js";

/**
 * Deletes a single signIn object from the database.
 *
 * @param {string} id The database _id of the sign-in to be deleted.
 */
export function deleteOneSignIn(id) {
  SignIn.deleteOne({ _id: id });
}

/**
 * Deletes a user's entire library of sign-ins from the database.
 *
 * @param {string} advizotID The advizotID corresponding to the user whose sign-ins are to be deleted. Is the "userID" on the(se) document(s).
 *
 * @returns {object} Mongoose's default response when deleting a group of documents, needed for its "deletedCount" property
 */
export function deleteSignIns(advizotID) {
  return SignIn.deleteMany({ userID: advizotID });
}

// 2 weeks = 1000ms/second, 60s/minute, 60min/hour, 24h/day, 7days/week (x2)
const twoWeeksAgo = Date.now() - 1000 * 60 * 60 * 24 * 14;

/**
 * Finds and returns sign-ins for the admin group.
 *
 * @returns {object[]} A list of sign-ins from the admin group.
 */
export function getAdminSignIns() {
  return SignIn.find({ group: userRoles.ADMIN }).gte("date", twoWeeksAgo);
}

/**
 * Finds and retrieves a group of sign-ins corresponding to a single group.
 *
 * @param {string} group The name of the group whose sign-ins are to be retrieved.
 *
 * @returns {object[]} A list of sign-ins found that correspond to the given group.
 */
export function getGroupSignIns(group) {
  return SignIn.find()
    .or([{ group: userRoles.ADMIN }, { group: group }])
    .gte("date", twoWeeksAgo);
}

/**
 * "Moves" sign-ins that correspond to a single user to another group by changing each sign-in's group property.
 *
 * @param {string} advizotID    The advizotID associated with the user whose sign-ins are to be changed.
 * @param {string} groupToPlace The new value to the change the sign-in's group property to.
 *
 * @returns {object[]} A list containing the sign-ins that were updated.
 */
export function moveSignIns(advizotID, groupToPlace) {
  return SignIn.updateMany({ userID: advizotID }, { group: groupToPlace });
}

/**
 * Creates a new SignIn model from the SignIn schema, populates it with data from the client, and saves it to the database.
 *
 * @param {object} req the HTTP request object sent to the server, whose properties correspond to a new sign-in object
 */
export async function saveNewSignIn(req) {
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
}
