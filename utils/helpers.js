/**
 * Generates a 6-digit rancom number to be used as the meeting's meeting code for the month.
 * @returns {Number} the code for the meeting
 */
function generateMeetingCode() {
  let meetingCode = Math.floor(Math.random() * 1000000); // 1,000,000
  if (meetingCode < 100000 || meetingCode === 1000000) generateMeetingCode();
  return meetingCode;
}

// User permissions
const userRoles = Object.freeze({
  ADMIN: "admin",
  MEMBER: "member",
});

module.exports = {
  generateMeetingCode,
  userRoles,
};
