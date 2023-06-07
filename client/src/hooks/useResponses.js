import { useState, useEffect } from "react";
import { axiosFetch } from "../helpers";

export default function useResponses(method, url, data = null) {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getExistingResponses(method, url, data);
  }, [method, url, data]);

  /**
   * fetches existing user responses from MongoDB and updates state accordingly. See server/routes/db.js
   */
  async function getExistingResponses(method, url, data = null) {
    setLoading(true);

    try {
      const existingResponses = await axiosFetch(method, url, data);
      setResponses(existingResponses.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Takes in user response from MeetingForm.js and adds it to the database or updates an existing user response. See /routes/db.js
   * @param {Object} responseToSubmit body to be added or edited in the database and displayed to the users
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
   * @param {Object} responseToDelete The user response to be deleted from db and UI
   * @returns {Object} the response from the server
   */
  async function deleteResponse(responseID) {
    setLoading(true);

    try {
      await axiosFetch("delete", "/db/responses", { responseID });

      // Make a new array of all responses EXCEPT the one to be deleted
      setResponses(
        responses.filter((response) => response.userID !== responseID)
      );
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

  return [sortedResponses, loading, error, submitResponse, deleteResponse];
}
