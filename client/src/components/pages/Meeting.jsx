import { useState, useContext } from "react";
//Helpers
import { constructCurrentDate } from "../../helpers";
//Hooks
import useResponses from "../../hooks/useResponses";
//Context
import { UserContext } from "../../App";
//Components
import LoadingSpinner from "../utilities/LoadingSpinner";
import Error from "../utilities/Error";
import AdminResponses from "./meeting-responses/AdminResponses";
import Responses from "./meeting-responses/Responses";
import ActionsMenu from "../utilities/user-actions/ActionsMenu";

export default function Meeting() {
  const user = useContext(UserContext);
  const [sortedResponses, loading, error, submitResponse] = useResponses(
    "get",
    "/db/responses"
  );
  const [passcodeDisplayed, setPasscodeDisplayed] = useState(false);

  if (loading) return <LoadingSpinner />;
  if (error) return <Error error={error} />;

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
