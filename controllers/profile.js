import profileQueries from "./profile.queries.js";

async function getFullProfile(req, res) {
  try {
    const { profileID } = req.body;
    const userInfo = await profileQueries.getProfile(profileID);
    const signInHistory = await profileQueries.getCheckIns(profileID);

    res.json({ userInfo, signInHistory });
  } catch (err) {
    res.json(new Error(err));
    throw new Error(err);
  }
}

const profileController = {
  getFullProfile,
};

export default profileController;
