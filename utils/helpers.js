const { userRoles, groups } = require("./userRoles");

/**
 * Generates a 6-digit rancom number to be used as the meeting's meeting code for the month.
 * @returns {Number} the code for the meeting
 */
function generateMeetingCode() {
  let meetingCode = Math.floor(Math.random() * 1000000); // 1,000,000
  if (meetingCode < 100000 || meetingCode === 1000000) generateMeetingCode();
  return meetingCode;
}

/**
 * Assigns a new user to the the group they belong to, which is used in user authorization
 * @param {String} userRole authorization status of the new user: "member", "guest", or "admin". Admins are placed into their own group
 * @returns {String}        the group the new user is to be placed in, can be a group, "admin", or "guest"
 */
function determineGroup(userRole) {
  if (userRole === userRoles.ADMIN) {
    return groups.ADMIN;
  }

  switch (new Date().getDay()) {
    case 2:
      return groups.TUESDAY;
    case 3:
      return groups.WEDNESDAY;
    case 4:
      return groups.THURSDAY;
    default:
      return groups.GUEST;
  }
}

module.exports = {
  generateMeetingCode,
  determineGroup,
};