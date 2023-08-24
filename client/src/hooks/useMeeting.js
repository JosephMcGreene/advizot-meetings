import { useState, useEffect } from "react";
import { axiosFetch } from "../helpers";

export default function useMeeting(method, url) {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getExistingResponses(method, url);
  }, [method, url]);

  /**
   * Fetches existing user responses from MongoDB and updates state accordingly. See server/routes/db.js
   *
   * @param {string} method HTTP verb, usually GET
   * @param {string} url    Endpoint of the proxy server for the fetch call
   * @param {object} [data] The request body sent to the server, if applicable
   */
  async function getExistingResponses(method, url) {
    try {
      setLoading(true);

      const existingResponses = await axiosFetch(method, url);

      setResponses(existingResponses.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Takes in user response from MeetingForm.js and adds it to the database or updates an existing user response. See /routes/db.js
   *
   * @param {Object} responseToSubmit Body to be added or edited in the database and displayed to the users
   */
  async function submitResponse(responseToSubmit) {
    try {
      setLoading(true);

      const submitRes = await axiosFetch(
        "post",
        "/db/responses",
        responseToSubmit
      );

      //TODO Add logic for error handling and different HTTP responses

      const newResponses = [...responses, submitRes.data];
      const filteredResponses = newResponses.filter((response) => {
        return response._id !== responseToSubmit._id;
      });

      setResponses(filteredResponses);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Deletes the specified form data from the UI as well as the db
   *
   * @param {Object} responseID The ID of the user response to be deleted from db and UI
   *
   * @returns {Object} The response from the server
   */
  async function deleteResponse(responseID) {
    try {
      setLoading(true);

      await axiosFetch("delete", "/db/responses", { responseID });

      //TODO Add logic for error handling and different http responses

      // Make a new array of all responses EXCEPT the one to be deleted
      setResponses(
        responses.filter((response) => {
          return response._id !== responseID;
        })
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  //TODO Implement a version of this...
  // function sortResponses(responses) {
  //   return responses.sort((a, b) => {
  //     if (a.priority < b.priority) return -1;
  //     return 1;
  //   });
  // }

  //TODO ...Or this:
  // const sortedResponses = responses.sort((a, b) => {
  //   if (a.priority < b.priority) return -1;
  //   return 1;
  // });

  return [responses, loading, error, submitResponse, deleteResponse];
}
