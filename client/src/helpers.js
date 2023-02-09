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
    const responseBody = await axios({
      method,
      url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data,
      withCredentials: true,
    });
    return responseBody;
  } catch (err) {
    return console.error(err);
  }
}

/**
 * Parses Date object into a string representing the current date in MM/DD/YYY format
 *
 * @returns {String} a string representing the current date
 */
export function constructCurrentDate() {
  let today = new Date();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let year = today.getFullYear();

  return `${month}/${date}/${year}`;
}
