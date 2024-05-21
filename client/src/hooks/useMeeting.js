import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import useToasts from "./useToasts";
import { axiosFetch, signInBody } from "../helpers";

// TODO Rename this "useSignIns", so that it makes sense to use it in other app features, namely the check-ins feature

export default function useMeeting(method, url) {
  const user = useContext(UserContext);
  const { showToast } = useToasts();

  const [signIns, setSignIns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentGroup, setCurrentGroup] = useState("");

  const sortedSignIns = signIns.sort((a, b) => {
    if (a.priority < b.priority) return -1;
    return 1;
  });

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
      await showToast("failure", "Something went wrong, unable to fetch data.");
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Takes in user sign-in information and adds it to the database or updates an existing user sign-in.
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
        signInBody(user, signInToSubmit, existingSignIn)
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
      await showToast("failure", "Something went wrong, unable to edit.");
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
      await showToast("failure", "Something went wrong, unable to delete.");
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return [sortedSignIns, loading, currentGroup, submitSignIn, deleteSignIn];
}
