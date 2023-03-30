import axios from "axios";

/**
 * Calls to server throughout the application
 *
 * @param {string} method http method used to fetch data
 * @param {string} url    endpoint to call server data from
 * @param {Object} data   for POST requests, body of data to send to server
 *
 * @returns {Object} axios response from the server
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
 * Parses Date object into a string representing the current date in MM/DD/YYY format
 *
 * @param {Date | null} dateToParse date to parse
 * @returns {String} a string representing the current date
 */
export function constructCurrentDate(dateToParse = null) {
  let day = dateToParse || new Date();
  let month = day.getMonth() + 1;
  let date = day.getDate();
  let year = day.getFullYear().toString().slice(2);

  return `${month}/${date}/${year}`;
}
