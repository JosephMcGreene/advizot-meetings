import User from "../models/User.js";

export function deleteUserDB(id) {
  User.deleteOne(id);
}

export function getUsersInGroup(group) {
  return User.find({ group: group });
}

export function moveUser(id, groupToPlace) {
  User.findByIdAndUpdate(id, { group: groupToPlace });
}
