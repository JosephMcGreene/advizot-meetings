import axios from "axios";

/**
 * Calls to server throughout the application
 *
 * @param {string} method HTTP method used to fetch data
 * @param {string} url    Endpoint to call server data from
 * @param {Object} [data] Body of data to send to server with POST requests
 *
 * @returns {Object} Axios response from the server
 */
export async function axiosFetch(method, url, data = null) {
  try {
    const response = await axios({
      method,
      url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data,
      withCredentials: true,
    });
    return response;
  } catch (err) {
    throw err;
  }
}

/**
 * Parses Date object into a string representing the current month of the year
 *
 * @param {string}      monthOrYear "month" or "year" to be returned
 * @param {Date | null} dateToParse Date to parse, default is current date
 *
 * @returns {string | undefined} A string representing the current month or year
 */
export const currentDate = (monthOrYear, dateToParse = null) => {
  let date = dateToParse || new Date();

  if (monthOrYear === "year") return date.getFullYear();

  if (monthOrYear === "month") {
    switch (date.getMonth()) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return undefined;
    }
  }
};
