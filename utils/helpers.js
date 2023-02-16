/**
 * Generates a 6-digit rancom number to be used as the meeting's meeting code for the month.
 * @returns {Number} the code for the meeting
 */
function generateMeetingCode() {
  let meetingCode = Math.floor(Math.random() * 1000000); // 1,000,000
  if (meetingCode < 100000 || meetingCode === 1000000) generateMeetingCode();
  return meetingCode;
}

function getDayOfTheWeek() {
  let today;
  let group;
  switch (new Date().getDay()) {
    case 0:
      today = "sunday";
      break;
    case 1:
      today = "monday";
      break;
    case 2:
      group = "CE5660";
      break;
    case 3:
      group = "KEY9330";
      break;
    case 4:
      group = "CE4659";
      break;
    case 5:
      today = "friday";
      break;
    case 6:
      today = "saturday";
      break;
  }

  return group;
}

module.exports = {
  generateMeetingCode,
  getDayOfTheWeek,
};