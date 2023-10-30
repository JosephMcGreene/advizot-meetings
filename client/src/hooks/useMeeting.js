import { useState, useEffect, useContext } from "react";
import { UserContext, ToastContext } from "../App";
import { axiosFetch } from "../helpers";

export default function useMeeting(method, url) {
  const user = useContext(UserContext);
  const { showToast } = useContext(ToastContext);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sortedResponses = responses.sort((a, b) => {
    if (a.priority < b.priority) return -1;
    return 1;
  });

  const userDataBody = (responseToSubmit, existingResponse = undefined) => {
    return {
      userName:
        existingResponse?.userName || `${user.firstName} ${user.lastName}`,
      business: responseToSubmit.business,
      personal: responseToSubmit.personal,
      relationships: responseToSubmit.relationships,
      monthlyIssue: responseToSubmit.monthlyIssue,
      priority: responseToSubmit.priority,
      monthlyGoal: responseToSubmit.monthlyGoal,
      date: Date.now(),
      group: existingResponse?.group || user.group,
      userID: existingResponse?.userID || user.advizotID,
    };
  };

  useEffect(() => {
    getResponses(method, url);
  }, [method, url]);

  /**
   * Fetches existing user responses from MongoDB and updates state accordingly. See server/routes/db.js
   *
   * @param {string} method HTTP verb, usually GET, can be POST if request body is necessary
   * @param {string} url    Endpoint of the proxy server for the fetch call
   * @param {object} [data] The request body sent to the server, if applicable
   */
  async function getResponses(method, url, data = null) {
    try {
      setLoading(true);

      const existingResponses = await axiosFetch(method, url, data);

      setResponses(existingResponses.data);
    } catch (err) {
      setError(err);
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Takes in user response from MeetingForm.jss and adds it to the database or updates an existing user response. See /routes/db.js
   *
   * @param {string} method           http verb used to subscribe to the database
   * @param {Object} responseToSubmit Body to be added or edited in the database and displayed to the users
   */
  async function submitResponse(responseToSubmit, existingResponse) {
    try {
      setLoading(true);

      const submitRes = await axiosFetch(
        "put",
        "/db/responses",
        userDataBody(responseToSubmit, existingResponse)
      );

      const newResponses = [...responses, submitRes.data];
      const filteredResponses = newResponses.filter(
        (response) => response._id !== existingResponse?._id
      );

      setResponses(filteredResponses);

      if (existingResponse?._id !== undefined)
        await showToast("success", "Edit Successful");
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

      await axiosFetch("delete", "/db/responses", {
        responseID,
      });

      // Make a new array of all responses EXCEPT the one to be deleted
      setResponses(
        responses.filter((response) => {
          return response._id !== responseID;
        })
      );

      await showToast("success", "Response Deleted");
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
