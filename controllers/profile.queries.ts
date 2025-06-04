import SignIn from "../models/SignIn.js";

/**
 * Queries the database for all sign-ins that belong to a single user
 * @param   {string}   id The user advizotID property, used to query sign-ins with a userID property that matches.
 * @returns {object[]}    The list of sign-in objects found
 */
async function getCheckIns(id: string) {
  return await SignIn.find({ userID: id });
}

const profileQueries = { getCheckIns };

export default profileQueries;
