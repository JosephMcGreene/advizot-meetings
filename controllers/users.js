import User from "../models/User.js";
import SignIn from "../models/SignIn.js";

async function post(req, res) {
  try {
    const usersToEdit = await User.find({ group: req.body.group });

    res.statusMessage = "Found users to edit";
    res.json(usersToEdit);
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

async function put(req, res) {
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

async function deleteUser(req, res) {
  try {
    await User.deleteOne({ _id: req.body._id });

    const { deletedCount } = await SignIn.deleteMany({
      userID: req.body.advizotID,
    });

    res.statusMessage = "Deleted a user and their sign-ins";
    res.json({ deletedCount });
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

async function postProfile(req, res) {
  try {
    const userInfo = await User.findOne({ advizotID: req.body.id });

    //TODO rework this. Need to look up what Mongoose will return if it cannot find the user ID (above)
    if (userInfo) {
      res.statusMessage = "User found";
      res.json(userInfo);
    } else {
      res.statusMessage = `No user found with user ID ${res.body.id}`;
      res.json({ message: res.statusMessage });
    }
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

const usersController = { post, put, deleteUser, postProfile };

export default usersController;
