import { useState, useEffect, useMemo } from "react";
import { axiosFetch } from "../helpers";

export default function useResponses(method = null, url = null, data = null) {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (method !== null) getExistingResponses(method, url, data);
  }, [method, url, data]);

  /**
   * Fetches existing user responses from MongoDB and updates state accordingly. See server/routes/db.js
   *
   * @param {string} method HTTP verb, usually GET
   * @param {string} url    Endpoint of the proxy server for the fetch call
   * @param {object} [data] The request body sent to the server, if applicable
   */
  async function getExistingResponses(method, url) {
    setLoading(true);

    try {
      const existingResponses = await axiosFetch(method, url);
      setResponses(existingResponses.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  //Sort responses to be displayed in order of priority
  const sortedResponses = responses.sort((a, b) => {
    if (a.priority < b.priority) return -1;
    return 1;
  });

  const visibleResponses = useMemo(() => {
    return sortedResponses;
  }, [sortedResponses]);

  /**
   * Takes in user response from MeetingForm.js and adds it to the database or updates an existing user response. See /routes/db.js
   *
   * @param {Object} responseToSubmit Body to be added or edited in the database and displayed to the users
   */
  async function submitResponse(responseToSubmit) {
    setLoading(true);

    try {
      const submitRes = await axiosFetch(
        "post",
        "/db/responses",
        responseToSubmit
      );

      const newResponses = responses.filter(
        (response) => response._id !== responseToSubmit._id
      );

      newResponses.push(submitRes.data);
      setResponses(newResponses);
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
    setLoading(true);

    try {
      const deleteRes = await axiosFetch("delete", "/db/responses", {
        responseID,
      });

      console.log(deleteRes);
      console.log(sortedResponses);
      // Make a new array of all responses EXCEPT the one to be deleted

      setResponses(
        sortedResponses.filter((response) => {
          return response._id !== responseID;
        })
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return [visibleResponses, loading, error, submitResponse, deleteResponse];
}
