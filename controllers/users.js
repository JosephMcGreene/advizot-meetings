import { deleteUserDB, getUsersInGroup, moveUser } from "./users.queries.js";
import { deleteSignIns, moveSignIns } from "./signIns.queries.js";

async function post(req, res) {
  try {
    const usersToEdit = await getUsersInGroup(req.body.group);
    res.statusMessage = "Found users to edit";
    res.json(usersToEdit);
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

async function put(req, res) {
  try {
    await moveUser(req.body._id, req.body.groupToPlace);

    const updatedSignIns = await moveSignIns(
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

async function deleteUser(req, res) {
  try {
    await deleteUserDB(req.body._id);

    const { deletedCount } = await deleteSignIns(req.body.advizotID);

    res.statusMessage = "Deleted a user and their sign-ins";
    res.json({ deletedCount });
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

const usersController = { post, put, deleteUser };

export default usersController;
