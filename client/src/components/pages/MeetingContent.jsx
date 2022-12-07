import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import axios from "axios";
//Internal
import MeetingCode from "./MeetingCode";
import MeetingForm from "../form/MeetingForm";
import Responses from "../responses/Responses";
import UtilButtons from "../utilities/UtilButtons";

export default function MeetingContent() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [meetingAccess, setMeetingAccess] = useState(false);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    getExistingResponses();
  }, []);

  /**
   * fetches existing user responses from MongoDB and updates state accordingly. See server/routes/db.js
   */
  async function getExistingResponses() {
    try {
      setLoading(true);

      const existingResponses = await axios({
        method: "get",
        url: "/db/responses",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (existingResponses.status >= 200 && existingResponses.status < 300) {
        setResponses([...existingResponses.data]);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in user response from MeetingForm.js and adds it to the database or updates an existing user response. See /routes/db.js
   * @param {Object} responseToSubmit json body to be added to edited in the database and displayed to the users
   * @returns {Object} response object from the server
   */
  async function submitResponse(responseToSubmit) {
    responseToSubmit.userName = `${currentUser.firstName} ${currentUser.lastName}`;
    responseToSubmit.date = Date.now();

    try {
      setLoading(true);

      const submitRes = await axios({
        method: "post",
        url: "/db/responses",
        data: responseToSubmit,
      });

      if (submitRes.status >= 200 && submitRes.status < 300) {
        const newResponses = responses.filter(
          (response) => response._id !== responseToSubmit._id
        );
        newResponses.push(submitRes.data);

        setResponses(newResponses);
      }
      setLoading(false);
      return submitRes;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Deletes the specified user response from the list as well as the db
   * @param {Object} responseToDelete The user response to be deleted from db and UI
   * @returns {Object} the response from the server
   */
  async function deleteResponse(responseToDelete) {
    try {
      setLoading(true);

      const deleteRes = await axios({
        method: "delete",
        url: "/db/responses",
        data: responseToDelete,
      });

      if (deleteRes.status >= 200 && deleteRes.status < 300) {
        // Make a new array of all responses EXCEPT the one to be deleted
        setResponses(
          responses.filter((response) => response._id !== responseToDelete._id)
        );
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Assesses whether or not the passcode the user entered is valid and correct
   * @param {String} inputCode the code the user entered
   * @returns {Function} changes the state of gaveCorrectPassCode to reflect whether the user can continue and view the rest of the app or must try again
   */
  function handlePasscodeSubmit(inputCode) {
    //TODO Change this dummy passcode to a randomly generated one
    if (inputCode === "123456") {
      alert("Welcome, enjoy the meeting!");
      return setMeetingAccess(true);
    }

    alert("That is not the correct code. Try again.");
    return setMeetingAccess(false);
  }

  if (!meetingAccess)
    return (
      <MeetingCode
        onCodeSubmit={(inputCode) => handlePasscodeSubmit(inputCode)}
      />
    );

  return (
    <>
      <Responses
        responses={responses}
        loading={loading}
        onSubmitEdits={(responseToSubmit) => submitResponse(responseToSubmit)}
        onDelete={(responseToDelete) => deleteResponse(responseToDelete)}
      />

      <UtilButtons openForm={() => setShowForm(true)} />

      {showForm && (
        <MeetingForm
          onSubmit={(responseToSubmit) => submitResponse(responseToSubmit)}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
}
