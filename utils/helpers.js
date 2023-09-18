const { groups } = require("./userRoles");

/**
 * Generates a 6-digit random number to be used as the meeting's room code.
 *
 * @returns {string} The code for the meeting
 */
function generateRoomCode() {
  let roomCode = Math.floor(Math.random() * 1000000); // 1,000,000

  if (roomCode < 100000 || roomCode === 1000000) generateRoomCode();

  return roomCode.toString();
}

/**
 * Determines the day of the week in order to decide what group and role to place a user in, or place them in a guest group
 *
 * @returns {string} The name of the day of the week if it is Tuesday, Wednesday, or Thursday, or guest
 */
function determineGroup() {
  switch (new Date().getDay()) {
    case 2: //If today is Tuesday:
      return groups.CE5660;
    case 3: //If today is Wednesday:
      return groups.KEY9330;
    case 4: //If today is Thursday:
      return groups.CE4659;
    default: //If today is any other day:
      return groups.GUEST;
  }
}

module.exports = {
  generateRoomCode,
  determineGroup,
};
