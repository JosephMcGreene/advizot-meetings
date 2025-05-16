import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";
import { userRoles, groups } from "../lib/userRoles.js";

/**
 * Adds a new property to a user in the database corresponding to their LinkedIn client ID if missing, or their Google client ID if missing.
 * @param   {string} email    The user's email addressed so they can be found in the the database.
 * @param   {string} provider Either "linkedinID" or "googleID".
 * @param   {string} id       The value of the user's LinkedIn ID or Google ID.
 * @returns {object}          The user, now updated in the database.
 */
async function addProviderID(email, provider, id) {
  return await User.findOneAndUpdate({ email: email }, { [provider]: id });
}

/**
 * Deletes a user document from the database.
 * @param {string} id The database _id of the user to be deleted.
 */
async function deleteUser(id) {
  await User.deleteOne(id);
}

/**
 * Finds and returns a single user document from the database based on the user's email address.
 * @param   {string}        profileEmail The user's email address who is to be retrieved from the database.
 * @returns {object | null}              The user in the database, or null if they could not be found.
 */
async function getOneUser(profileEmail) {
  return await User.findOne({ email: profileEmail });
}

/**
 * Finds a returns a single user document from the database based on the user's database _id
 * @param   {string}        id The user's database _id.
 * @returns {object | null}    The user in the database, or null if they could not be found.
 */
async function getOneUserByID(id) {
  return await User.findById(id);
}

/**
 * Find and retieves all users belonging to one group from the database.
 * @param   {string}   group The name of the group whose users are to be retrieved.
 * @returns {object[]}       A list of users that belong to the group.
 */
async function getUsersInGroup(group) {
  return await User.find({ group: group });
}

/**
 * "Moves" a user from one group to another by changing the user's group property in the database.
 * @param {string} id           The database _id of the user to be moved.
 * @param {string} groupToPlace The name of the group the user is being placed into.
 */
async function moveUser(id, groupToPlace) {
  await User.findByIdAndUpdate(id, { group: groupToPlace });
}

/**
 * Creates a new User model based on the User schema, populates it with data, and saves it to the database.
 * @param   {object} profile  The provider profile of the user to be added to the database.
 * @param   {string} provider Either "linkedinID" or "googleID", depending on if the OAuth provider is LinkedIn or Google. This becomes the initial provider ID property of the new user.
 * @returns {object}          The new user who was added to the database.
 */
async function saveNewUser(profile, provider) {
  const newUser = await new User({
    advizotID: uuidv4(),
    email: profile.emails[0].value,
    firstName: profile.name.givenName,
    group: groups.GUEST,
    hasMeetingCode: false,
    lastName: profile.name.familyName,
    photo: profile.photos[0].value,
    role: userRoles.MEMBER,
    [provider]: profile.id,
  });
  await newUser.save();

  return newUser;
}

const userQueries = {
  addProviderID,
  deleteUser,
  getOneUser,
  getOneUserByID,
  getUsersInGroup,
  moveUser,
  saveNewUser,
};

export default userQueries;
