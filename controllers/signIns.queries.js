import SignIn from "../models/SignIn.js";
import { userRoles } from "../lib/userRoles.js";

/**
 * Deletes a single signIn object from the database.
 * @param   {string} id The database _id of the sign-in to be deleted.
 * @returns {object}    The default Mongoose response from deleting a document.
 */
async function deleteOneSignIn(id) {
  return await SignIn.deleteOne({ _id: id });
}

/**
 * Deletes a user's entire library of sign-ins from the database.
 * @param   {string} advizotID The advizotID corresponding to the user whose sign-ins are to be deleted. Is the "userID" on the(se) document(s).
 * @returns {object}           Mongoose's default response when deleting a group of documents, needed for its "deletedCount" property.
 */
function deleteSignIns(advizotID) {
  return SignIn.deleteMany({ userID: advizotID });
}

// 2 weeks = 14days * 24h * 60min * 60s * 1000ms = 1,209,600,000 milliseconds
const twoWeeksAgo = Date.now() - 1209600000;

/**
 * Finds and retrieves a group of sign-ins which were submitted less than two weeks ago and which belong to a single group.
 * @param   {string}   group The name of the group whose sign-ins are to be retrieved.
 * @returns {object[]}       A list of sign-ins found that correspond to the given group.
 */
function getGroupSignIns(group) {
  return SignIn.find()
    .or([{ group: userRoles.ADMIN }, { group: group }])
    .and([{ forOneToOne: false }])
    .gte("date", twoWeeksAgo);
}

/**
 * "Moves" sign-ins that correspond to a single user to another group by changing each sign-in's group property.
 * @param   {string}   advizotID    The advizotID associated with the user whose sign-ins are to be changed.
 * @param   {string}   groupToPlace The new value to the change the sign-in's group property to.
 * @returns {object[]}              A list containing the sign-ins that were updated.
 */
function moveSignIns(advizotID, groupToPlace) {
  return SignIn.updateMany({ userID: advizotID }, { group: groupToPlace });
}

/**
 * Creates a new SignIn model from the SignIn schema, populates it with data from the client, and saves it to the database.
 * @param   {object} req The HTTP request object, whose properties match a new sign-in object.
 * @returns {object}     The new sign-in object that was created and saved.
 */
async function saveNewSignIn(req) {
  const newSignIn = new SignIn({
    business: req.body.business,
    date: req.body.date,
    forOneToOne: req.body.forOneToOne,
    group: req.body.group,
    monthlyGoal: req.body.monthlyGoal,
    monthlyIssue: req.body.monthlyIssue,
    personal: req.body.personal,
    priority: req.body.priority,
    relationships: req.body.relationships,
    userID: req.body.userID,
    userName: req.body.userName,
  });
  await newSignIn.save();

  return newSignIn;
}

const signInQueries = {
  deleteOneSignIn,
  deleteSignIns,
  getGroupSignIns,
  moveSignIns,
  saveNewSignIn,
};

export default signInQueries;
