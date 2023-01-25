import { useState, useEffect } from "react";
//External
import axios from "axios";
//Internal
import AdminContent from "./AdminContent";
import MemberContent from "./MemberContent";

export default function Meeting() {
  const [userRole, setUserRole] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getExistingResponses();
  }, []);

  useEffect(() => {
    getUserRole();
  }, []);

  /**
   * Makes a request for the info on a certain user to identify their permissions
   */
  async function getUserRole() {
    try {
      const currentUserInfo = await axios({
        method: "get",
        url: "/auth/current_user",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setUserRole(currentUserInfo.data.role);
    } catch (error) {
      console.error(error);
    }
  }

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

  if (userRole === "admin") {
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

  if (userRole === "member") {
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
