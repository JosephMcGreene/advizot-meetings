import { groups } from "./userRoles.js";

/**
 * Generates a 6-digit random number to be used as the meeting's room code.
 *
 * @returns {string} The code for the meeting
 */
export function generateRoomCode() {
  let roomCode = Math.floor(Math.random() * 1000000); // 1,000,000

  if (roomCode < 100000 || roomCode === 1000000) generateRoomCode(); // Ensure 6 digits

  return roomCode.toString();
}

/**
 * Determines the day of the week and then determines what group is meeting for the current day. Returns admin if today is not a meeting day
 *
 * @returns {string} The group number that corresponds to the day of the week if today is Tuesday, Wednesday, or Thursday, or default admin
 */
export const groupForToday = () => {
  switch (new Date().getDay()) {
    case 2: //If today is Tuesday
      return groups.CE5660;
    case 3: //If today is Wednesday
      return groups.KEY9330;
    case 4: //If today is Thursday
      return groups.CE4659;
    default: //If today is any other day:
      return groups.ADMIN;
  }
};
