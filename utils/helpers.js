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
 * Assess the day of the week in order to determine what group a newly registered member should be placed in
 * @returns {string | null} The name of the group that corresponds to the day of the week of the group's meeting
 */
function determineGroup(userRole) {
  if (userRole === userRoles.ADMIN) {
    return "admin";
  }

  let group = null;

  switch (new Date().getDay()) {
    case 2:
      group = groups.tuesday;
      break;
    case 3:
      group = groups.wednesday;
      break;
    case 4:
      group = groups.thursday;
      break;
    default:
      group = null;
  }

  return group;
}

module.exports = {
  generateMeetingCode,
  determineGroup,
};
