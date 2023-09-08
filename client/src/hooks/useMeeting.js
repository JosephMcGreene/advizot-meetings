import { useState, useEffect } from "react";
import { axiosFetch } from "../helpers";

export default function useMeeting(method, url) {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sortedResponses = responses.sort((a, b) => {
    if (a.priority < b.priority) return -1;
    return 1;
  });

  useEffect(() => {
    getResponses(method, url);
  }, [method, url]);

  /**
   * Fetches existing user responses from MongoDB and updates state accordingly. See server/routes/db.js
   *
   * @param {string} method HTTP verb, usually GET
   * @param {string} url    Endpoint of the proxy server for the fetch call
   * @param {object} [data] The request body sent to the server, if applicable
   */
  async function getResponses(method, url, data = null) {
    try {
      setLoading(true);

      const existingResponses = await axiosFetch(method, url, data);

      console.log("server response:", existingResponses.data);

      // setResponses(existingResponses.data);
    } catch (err) {
      setError(err);
      throw new Error(err);
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

      const newResponses = [...responses, submitRes.data];
      const filteredResponses = newResponses.filter((response) => {
        return response._id !== responseToSubmit._id;
      });

      setResponses(filteredResponses);
    } catch (err) {
      setError(err);
      throw new Error(err);
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

      // Make a new array of all responses EXCEPT the one to be deleted
      setResponses(
        responses.filter((response) => {
          return response._id !== responseID;
        })
      );
    } catch (err) {
      setError(err);
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return [
    sortedResponses,
    loading,
    error,
    getResponses,
    submitResponse,
    deleteResponse,
  ];
}
