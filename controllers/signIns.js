import signInQueries from "./signIns.queries.js";

/**
 * Enters a new sign-in object into the database, or updates an existing sign-in object in the database
 *
 * @param {object} req The HTTP request object.
 * @param {object} res The HTTP response object.
 */
async function modifySignIn(req, res) {
  try {
    signInQueries.saveNewSignIn(req);

    if (req.body?._id) {
      await signInQueries.deleteOneSignIn(req.body._id);

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

/**
 * Deletes a single sign-in object from the database
 *
 * @param {object} req The HTTP request object.
 * @param {object} res The HTTP response object.
 */
async function deleteSignIn(req, res) {
  try {
    const deletionRes = await signInQueries.deleteOneSignIn(req.body.signInID);

    res.statusMessage = "Sign-in deleted";
    res.json({ deletionRes, signInID: req.body.signInID });
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

/**
 * Handles GET requests for sign-ins as well as groups, since as of 4/3/24 the app only cares about retrieving sign-ins for an entire group
 *
 * @param {object} req The HTTP request object
 * @param {object} res The HTTP response object
 *
 * @returns {object}
 */
async function getGroupSignIns(req, res) {
  try {
    const groupSignIns = await signInQueries.getGroupSignIns(req.params.group);

    res.statusMessage = "Sign-ins found";
    return res.json({ group: req.params.group, groupSignIns });
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

const signInsController = {
  modifySignIn,
  deleteSignIn,
  getGroupSignIns,
};

export default signInsController;
