import profileQueries from "./profile.queries.js";
import type { Request, Response } from "express";

/**
 * Retrieves all of a single user's sign-ins from the database and sends it back to the client.
 * @param {object} req HTTP request object.
 * @param {object} res HTTP response object.
 */
async function getSignIns(req: Request, res: Response) {
  try {
    const signInHistory = await profileQueries.getCheckIns(req.user?.advizotID);

    res.json(signInHistory);
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

const profileController = {
  getSignIns,
};

export default profileController;
