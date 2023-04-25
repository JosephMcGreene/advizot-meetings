import { useState, useContext } from "react";
import { UserContext } from "../../App";
//Helpers
import { constructCurrentDate } from "../../helpers";
//Hooks
import useResponses from "../../hooks/useResponses";
//Components
import LoadingSpinner from "../utilities/LoadingSpinner";
import AdminResponses from "./meeting-responses/AdminResponses";
import Responses from "./meeting-responses/Responses";
import ActionsMenu from "../utilities/user-actions/ActionsMenu";

export default function Meeting() {
  const user = useContext(UserContext);
  //eslint-disable-next-line
  const [sortedResponses, loading, error, submitResponse] = useResponses(
    "get",
    "/db/responses"
  );
  const [passcodeDisplayed, setPasscodeDisplayed] = useState(false);

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
