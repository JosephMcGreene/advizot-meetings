import User from "../models/User.js";
import SignIn from "../models/SignIn.js";

async function post(req, res) {
  try {
    const userInfo = await User.findOne({ advizotID: req.body.userID });

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

async function postForSignIns(req, res) {
  try {
    const signIns = await SignIn.find({ userID: req.body.id });

    res.json(signIns);
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

const profileController = { post, postForSignIns };

export default profileController;
