import User from "../models/User.js";

export function deleteUserDB(id) {
  User.deleteOne(id);
}

export function getOneUser(profileEmail) {
  return User.findOne({ email: profileEmail });
}

export function getUsersInGroup(group) {
  return User.find({ group: group });
}

export function moveUser(id, groupToPlace) {
  User.findByIdAndUpdate(id, { group: groupToPlace });
}

export function addProviderID(email, provider, id) {
  return User.findOneAndUpdate({ email: email }, { [provider]: id });
}
