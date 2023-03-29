import { useState, useEffect, useContext } from "react";
//Helpers
import { axiosFetch, constructCurrentDate } from "../../helpers";
//Context
import { UserContext } from "../../App";
//Components
import LoadingSpinner from "../utilities/LoadingSpinner";
import AdminResponses from "./meeting-responses/AdminResponses";
import Responses from "./meeting-responses/Responses";
import ActionsMenu from "../utilities/user-actions/ActionsMenu";

export default function Meeting() {
  const user = useContext(UserContext);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [passcodeDisplayed, setPasscodeDisplayed] = useState(false);

  useEffect(() => {
    getExistingResponses();
  }, []);

  /**
   * fetches existing user responses from MongoDB and updates state accordingly. See server/routes/db.js
   */
  async function getExistingResponses() {
    setLoading(true);

    try {
      const existingResponses = await axiosFetch("get", "/db/responses");

      if (existingResponses.status >= 200 && existingResponses.status < 300) {
        setResponses([...existingResponses.data]);
      }
    } catch (err) {
      throw err;
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

      if (submitRes.status >= 200 && submitRes.status < 300) {
        const newResponses = responses.filter(
          (response) => response._id !== responseToSubmit._id
        );

        newResponses.push(submitRes.data);
        setResponses(newResponses);
      }
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  /**
   * Deletes the specified user form data from the UI as well as the db
   * @param {Object} responseToDelete The user response to be deleted from db and UI
   * @returns {Object} the response from the server
   */
  // async function deleteResponse(responseToDelete) {
  //   setLoading(true);

  //   const deleteRes = await axiosFetch(
  //     "delete",
  //     "/db/responses",
  //     responseToDelete
  //   );

  //   if (deleteRes.status >= 200 && deleteRes.status < 300) {
  //     // Make a new array of all responses EXCEPT the one to be deleted
  //     setResponses(
  //       responses.filter((response) => response._id !== responseToDelete._id)
  //     );
  //   }

  //   setLoading(false);
  // }

  //Sort responses to be displayed in order of priority
  const sortedResponses = responses.sort((a, b) => {
    if (a.priority < b.priority) return -1;
    return 1;
  });

  if (loading) return <LoadingSpinner />;
  return (
    <>
      <h1 className="meeting-heading">Answers for {constructCurrentDate()}</h1>

      {user.role === "admin" && (
        <AdminResponses
          passcodeDisplayed={passcodeDisplayed}
          sortedResponses={sortedResponses}
        />
      )}
      {user.role === "member" && (
        <Responses sortedResponses={sortedResponses} />
      )}

      <ActionsMenu
        displayPasscode={() => setPasscodeDisplayed(!passcodeDisplayed)}
        onFormSubmit={(responseToSubmit) => submitResponse(responseToSubmit)}
      />
    </>
  );
}