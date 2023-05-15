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
  const [sortedResponses, loading, error, submitResponse, deleteResponse] =
    useResponses("get", "/db/responses");
  const [passcodeDisplayed, setPasscodeDisplayed] = useState(false);

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
        <Responses
          sortedResponses={sortedResponses}
          onDelete={(responseToDelete) => deleteResponse(responseToDelete)}
        />
      )}

      <ActionsMenu
        displayPasscode={() => setPasscodeDisplayed(!passcodeDisplayed)}
        onFormSubmit={(responseToSubmit) => submitResponse(responseToSubmit)}
      />
    </>
  );
}
