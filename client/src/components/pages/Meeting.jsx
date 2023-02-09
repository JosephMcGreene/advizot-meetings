import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
//External
import { axiosFetch } from "../../helpers";
//Internal
import AdminContent from "./AdminContent";
import MemberContent from "./MemberContent";

export default function Meeting() {
  const currentUser = useContext(UserContext);

  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getExistingResponses();
  }, []);

  /**
   * fetches existing user responses from MongoDB and updates state accordingly. See server/routes/db.js
   */
  async function getExistingResponses() {
    setLoading(true);

    const existingResponses = await axiosFetch("get", "/db/responses");

    if (existingResponses.status >= 200 && existingResponses.status < 300) {
      setResponses([...existingResponses.data]);
    }

    setLoading(false);
  }

  /**
   * Takes in user response from MeetingForm.js and adds it to the database or updates an existing user response. See /routes/db.js
   * @param {Object} responseToSubmit json body to be added to edited in the database and displayed to the users
   * @returns {Object} response object from the server
   */
  async function submitResponse(responseToSubmit) {
    setLoading(true);

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

    setLoading(false);
    // TODO Test if this return is necessary
    return submitRes;
  }

  /**
   * Deletes the specified user form data from the UI as well as the db
   * @param {Object} responseToDelete The user response to be deleted from db and UI
   * @returns {Object} the response from the server
   */
  async function deleteResponse(responseToDelete) {
    setLoading(true);

    const deleteRes = await axiosFetch(
      "delete",
      "/db/responses",
      responseToDelete
    );

    if (deleteRes.status >= 200 && deleteRes.status < 300) {
      // Make a new array of all responses EXCEPT the one to be deleted
      setResponses(
        responses.filter((response) => response._id !== responseToDelete._id)
      );
    }

    setLoading(false);
  }

  //Sort responses to be displayed in order of priority
  const sortedResponses = responses.sort((a, b) => {
    if (a.priority < b.priority) return -1;
    return 1;
  });

  if (currentUser.role === "admin") {
    return (
      <AdminContent
        sortedResponses={sortedResponses}
        loading={loading}
        showForm={showForm}
        openForm={() => setShowForm(true)}
        closeForm={() => setShowForm(false)}
        onSubmit={(responseToSubmit) => submitResponse(responseToSubmit)}
        onDelete={(responseToDelete) => deleteResponse(responseToDelete)}
      />
    );
  }

  if (currentUser.role === "member") {
    return (
      <MemberContent
        sortedResponses={sortedResponses}
        loading={loading}
        showForm={showForm}
        openForm={() => setShowForm(true)}
        closeForm={() => setShowForm(false)}
        onSubmit={(responseToSubmit) => submitResponse(responseToSubmit)}
        onDelete={(responseToDelete) => deleteResponse(responseToDelete)}
      />
    );
  }
}
