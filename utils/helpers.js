const { userRoles, groups } = require("./userRoles");

/**
 * Generates a 6-digit random number to be used as the meeting's room code.
 * @returns {string} the code for the meeting
 */
function generateRoomCode() {
  let roomCode = Math.floor(Math.random() * 1000000); // 1,000,000

  if (roomCode < 100000 || roomCode === 1000000) generateRoomCode();

  return roomCode.toString();
}

function determineDay() {
  switch (new Date().getDay()) {
    case 2: //If today is Tuesday:
      return groups.TUESDAY;
    case 3: //If today is Wednesday:
      return groups.WEDNESDAY;
    case 4: //If today is Thursday:
      return groups.THURSDAY;
    default: //If today is any other day:
      return groups.GUEST;
  }
}

/**
 * Assigns a new user to the the group they belong to, which is used in user authorization
 * @param {string} role authorization status of the new user: "member", "guest", or "admin". Admins are placed into their own group
 * @returns {string}  the group the new user is to be placed in, can be a group, "admin", or "guest"
 */
function placeInGroup(role) {
  if (role === userRoles.ADMIN) {
    return groups.ADMIN;
  }

  determineDay();
}

module.exports = {
  generateRoomCode,
  determineDay,
  placeInGroup,
};
