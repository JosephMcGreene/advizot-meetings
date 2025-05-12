import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import useToasts from "../../hooks/useToasts";
import { axiosFetch } from "../../helpers";

export default function useMeeting(method, url) {
  const user = useContext(UserContext);
  const { showToast } = useToasts();
  const [signIns, setSignIns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSignIns(method, url);
  }, [method, url]);

  /**
   * Calls the server to update the room code and send it back to the user, or only send the existing room code, then updates the user's local storage with the new room code
   *
   * @param {boolean} needNewCode Whether or not the user has decided to create a new room code
   */
  async function getNewRoomCode() {
    try {
      setLoading(true);

      const response = await axiosFetch("get", "/roomCode");
      const newRoomCode = response.data.roomCodeDB.currentRoomCode.toString();

      localStorage.setItem("roomCode", newRoomCode);

      await showToast("success", `Room Code changed to ${newRoomCode}`);
    } catch (err) {
      await showToast(
        "failure",
        "Something went wrong, unable to set Room Code"
      );
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Sorts an array of sign-in objects in order of their priority property
   *
   * @param {object[]} signIns The array of sign-in objects to sort
   *
   * @returns {object[]} a sorted array of sign-in objects
   */
  function sortSignIns(signIns) {
    return signIns.sort((a, b) => {
      if (a.priority < b.priority) return -1;
      return 1;
    });
  }

  /**
   * Constructs and returns a sign-in object.
   *
   * @param {object}             signInToSubmit A sign-in object to be formatted.
   * @param {object | undefined} existingSignIn If present, a sign-in object that has been formatted in the past.
   *
   * @returns {object} A formatted sign-in object
   */
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
        "y"
      );
    }

    return signInBody;
  };

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

      setSignIns(sortSignIns(existingSignIns.data.groupSignIns));
    } catch (err) {
      await showToast("failure", "Something went wrong, unable to fetch data.");
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Takes in user sign-in from MeetingForm.js and adds it to the database or updates an existing user sign-in. See /routes/db.js
   *
   * @param {string} method         http verb used to subscribe to the database
   * @param {object} signInToSubmit Body to be added or edited in the database and displayed to the users
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

      setSignIns(sortSignIns(filteredSignIns));

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
   * @param {object} signInID The ID of the user sign-in to be deleted from db and UI
   *
   * @returns {object} The response from the server
   */
  async function deleteSignIn(signInID) {
    try {
      setLoading(true);

      const deletionRes = await axiosFetch("delete", "/signIns", { signInID });

      if (deletionRes.data.signInID) {
        // prettier-ignore
        const filteredSignIns = signIns.filter((signIn) => signIn._id !== signInID);
        setSignIns(sortSignIns(filteredSignIns));
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

  return [signIns, loading, submitSignIn, deleteSignIn, getNewRoomCode];
}
