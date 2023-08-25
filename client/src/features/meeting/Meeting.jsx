import { useState, useContext } from "react";
import { UserContext } from "../../App";
//Helpers
import { constructCurrentDate } from "../../helpers";
//Hooks
import useMeeting from "../../hooks/useMeeting";
//Components
import LoadingSpinner from "../../shared/LoadingSpinner";
import ErrorPage from "../../shared/ErrorPage";
import AdminResponses from "./meeting-responses/AdminResponses";
import Responses from "./meeting-responses/Responses";
import ActionsMenu from "./user-actions/ActionsMenu";
import MeetingActionList from "./user-actions/MeetingActionList";

export default function Meeting() {
  const user = useContext(UserContext);

  const [roomCodeDisplayed, setRoomCodeDisplayed] = useState(false);
  const [meetingActionsShown, setMeetingActionsShown] = useState(false);

  const [responses, loading, error, submitResponse, deleteResponse] =
    useMeeting("get", "/db/responses");

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage error={error} />;

  return (
    <>
      <h1 className="meeting-heading">Answers for {constructCurrentDate()}</h1>

      {user.role === "admin" && (
        <AdminResponses
          roomCodeDisplayed={roomCodeDisplayed}
          responses={responses}
          submitEdits={(responseToSubmit) => submitResponse(responseToSubmit)}
          onDelete={(responseID) => deleteResponse(responseID)}
        />
      )}
      {user.role === "member" && (
        <Responses
          responses={responses}
          onDelete={(responseID) => deleteResponse(responseID)}
        />
      )}

      <ActionsMenu
        actionToggle={() => setMeetingActionsShown(!meetingActionsShown)}
        className="user-actions main-meeting-actions"
      >
        {meetingActionsShown && (
          <MeetingActionList
            displayRoomCode={() => setRoomCodeDisplayed(!roomCodeDisplayed)}
            onFormSubmit={(responseToSubmit) =>
              submitResponse(responseToSubmit)
            }
            actionToggle={() => setMeetingActionsShown(!meetingActionsShown)}
          />
        )}
      </ActionsMenu>
    </>
  );
}
