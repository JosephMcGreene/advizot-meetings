import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";
import { userRoles, groups } from "./userRoles.js";

export function addProviderID(email, provider, id) {
  return User.findOneAndUpdate({ email: email }, { [provider]: id });
}

export function deleteUserDB(id) {
  User.deleteOne(id);
}

export function getOneUser(profileEmail) {
  return User.findOne({ email: profileEmail });
}

export function getOneUserByID(id) {
  return User.findById(id);
}

export function getUsersInGroup(group) {
  return User.find({ group: group });
}

export function moveUser(id, groupToPlace) {
  User.findByIdAndUpdate(id, { group: groupToPlace });
}

export async function saveNewUser(profile, provider) {
  const newUser = await new User({
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    [provider]: profile.id,
    email: profile.emails[0].value,
    photo: profile.photos[0].value,
    advizotID: uuidv4(),
    role: userRoles.MEMBER,
    group: groups.GUEST,
    hasMeetingCode: false,
  });
  await newUser.save();

  return newUser;
}
