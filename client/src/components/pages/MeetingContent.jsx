import { useState, useEffect } from "react";
//External
import axios from "axios";
//Internal
import MeetingForm from "../form/MeetingForm";
import Responses from "../responses/user/Responses";
import AdminResponses from "../responses/admin/AdminResponses";
import UtilButtons from "../utilities/UtilButtons";

export default function MeetingContent() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

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

  //Sort responses to be displayed in order of priority
  const sortedResponses = responses.sort((a, b) => {
    if (a.priority < b.priority) return -1;
    return 1;
  });

  return (
    <>
      {/* <Responses
        sortedResponses={sortedResponses}
        loading={loading}
        onSubmitEdits={(responseToSubmit) => submitResponse(responseToSubmit)}
        onDelete={(responseToDelete) => deleteResponse(responseToDelete)}
      /> */}

      <AdminResponses sortedResponses={sortedResponses} loading={loading} />

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
