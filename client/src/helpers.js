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
 * Takes a date-type argument and returns a string representing the date's day, month name, or year
 *
 * @param {string}                 monthOrYear "day" or "month" or "year" to be returned
 * @param {sString | Object | null} dateToParse Date to parse, default is current date
 *
 * @returns {string} The provided date's parsed day, month name, or year
 */
export const parseDate = (partOfDate, dateToParse = null) => {
  let date = dateToParse || new Date();

  if (partOfDate === "day") return date.getDate();

  if (partOfDate === "month") {
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
        return "??";
    }
  }

  if (partOfDate === "year") return date.getFullYear();
};
