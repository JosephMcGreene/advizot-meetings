import User from "../models/User.js";
import SignIn from "../models/SignIn.js";

export async function post(req, res) {
  try {
    const usersToEdit = await User.find({ group: req.body.group });

    res.statusMessage = "Found users to edit";
    res.json(usersToEdit);
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

export async function put(req, res) {
  try {
    await User.findByIdAndUpdate(req.body._id, {
      group: req.body.groupToPlace,
    });

    const updatedSignIns = await SignIn.updateMany(
      { userID: req.body.advizotID },
      { group: req.body.groupToPlace }
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

const usersController = { post, put };

export default usersController;
