import { useState, useEffect, useContext } from "react";
import { UserContext, ToastContext } from "../App";
import { axiosFetch } from "../helpers";

export default function useMeeting(method, url) {
  const user = useContext(UserContext);
  const { showToast } = useContext(ToastContext);

  const [signIns, setSignIns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentGroup, setCurrentGroup] = useState("");

  const sortedSignIns = signIns.sort((a, b) => {
    if (a.priority < b.priority) return -1;
    return 1;
  });

  const signInBody = (signInToSubmit, existingsignIn = undefined) => {
    const signInBody = {
      userName:
        existingsignIn?.userName || `${user.firstName} ${user.lastName}`,
      business: signInToSubmit.business,
      personal: signInToSubmit.personal,
      relationships: signInToSubmit.relationships,
      monthlyIssue: signInToSubmit.monthlyIssue,
      priority: signInToSubmit.priority,
      monthlyGoal: signInToSubmit.monthlyGoal,
      date: Date.now(),
      group: existingsignIn?.group || user.group,
      userID: existingsignIn?.userID || user.advizotID,
      _id: existingsignIn?._id,
    };

    if (signInBody.group === "admin") {
      signInBody.priority = signInBody.priority.replace(
        signInBody.priority.charAt(0),
        "z"
      );
    }

    return signInBody;
  };

  useEffect(() => {
    getSignIns(method, url);
  }, [method, url]);

  /**
   * Fetches existing user sign-ins from MongoDB and updates state accordingly. See server/routes/db.js
   *
   * @param {string} method HTTP verb, usually GET, can be POST if request body is necessary
   * @param {string} url    Endpoint of the proxy server for the fetch call
   * @param {object} [data] The request body sent to the server, if applicable
   */
  async function getSignIns(method, url, data = null) {
    try {
      setLoading(true);

      const existingSignIns = await axiosFetch(method, url, data);

      setSignIns(existingSignIns.data.groupSignIns);
      setCurrentGroup(existingSignIns.data.group);
    } catch (err) {
      setError(err);
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Takes in user sign-in from MeetingForm.jss and adds it to the database or updates an existing user sign-in. See /routes/db.js
   *
   * @param {string} method           http verb used to subscribe to the database
   * @param {Object} signInToSubmit Body to be added or edited in the database and displayed to the users
   */
  async function submitSignIn(signInToSubmit, existingSignIn) {
    try {
      setLoading(true);

      const response = await axiosFetch(
        "put",
        "/signIns",
        signInBody(signInToSubmit, existingSignIn)
      );

      const newSignIns = [...signIns, response.data];
      const filteredSignIns = newSignIns.filter(
        (signIn) => signIn._id !== existingSignIn?._id
      );

      setSignIns(filteredSignIns);

      // If it is an edit to an existing sign-in
      if (existingSignIn?._id !== undefined)
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
   * @param {Object} signInID The ID of the user response to be deleted from db and UI
   *
   * @returns {Object} The response from the server
   */
  async function deleteSignIn(signInID) {
    try {
      setLoading(true);

      const deletionRes = await axiosFetch("delete", "/signIns", {
        signInID,
      });

      // Make a new array of all sign-ins EXCEPT the one to be deleted
      if (deletionRes.data.deletionRes.deletedCount === 1) {
        setSignIns(
          signIns.filter((signIn) => {
            return signIn._id !== signInID;
          })
        );
      } else {
        return await showToast("failure", "That didn't work. Try again.");
      }

      await showToast("success", "Sign-In Deleted");
    } catch (err) {
      setError(err);
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return [
    sortedSignIns,
    loading,
    error,
    currentGroup,
    getSignIns,
    submitSignIn,
    deleteSignIn,
  ];
}
