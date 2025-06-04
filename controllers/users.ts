import signInQueries from "./signIns.queries.js";
import userQueries from "./users.queries.js";
import type { Request, Response } from "express";

/**
 * Removes a user object from the database, as well as all sign-in objects with the user's advizotID.
 * @param {object} req The HTTP request object.
 * @param {object} res The HTTP response object.
 */
async function deleteUser(req: Request, res: Response) {
  try {
    await userQueries.deleteUser(req.body._id);

    const { deletedCount } = await signInQueries.deleteSignIns(
      req.body.advizotID
    );

    res.statusMessage = "Deleted a user and their sign-ins";
    res.json({ deletedCount });
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

/**
 * Queries the database for all users that belong to a single group, queried by finding the users' whose group property matches the group in the request body.
 * @param {object} req The HTTP request object.
 * @param {object} res The HTTP response object.
 */
async function getUsersInGroup(req: Request, res: Response) {
  try {
    const usersToEdit = await userQueries.getUsersInGroup(req.body.group);
    res.statusMessage = "Found users to edit";
    res.json(usersToEdit);
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

/**
 * Moves a user to a new group by modifying the value of the user's group property, then does the same for the user's past sign-in objects.
 * @param {object} req The HTTP request object.
 * @param {object} res The HTTP response object.
 */
async function moveUser(req: Request, res: Response) {
  try {
    await userQueries.moveUser(req.body._id, req.body.groupToPlace);

    const updatedSignIns = await signInQueries.moveSignIns(
      req.body.advizotID,
      req.body.groupToPlace
    );

    res.statusMessage = "Updated a user and their sign-ins";
    res.json({
      updatedGroup: req.body.groupToPlace,
      numOfSignInUpdates: updatedSignIns.modifiedCount,
    });
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

const usersController = { deleteUser, getUsersInGroup, moveUser };

export default usersController;
