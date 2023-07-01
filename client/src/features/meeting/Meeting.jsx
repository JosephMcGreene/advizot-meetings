import { useState, useContext } from "react";
import { UserContext } from "../../App";
//Helpers
import { constructCurrentDate } from "../../helpers";
//Hooks
import useResponses from "../../hooks/useResponses";
//Components
import LoadingSpinner from "../../shared/LoadingSpinner";
import AdminResponses from "./meeting-responses/AdminResponses";
import Responses from "./meeting-responses/Responses";
import ActionsMenu from "./user-actions/ActionsMenu";
import MeetingActionList from "./user-actions/MeetingActionList";

export default function Meeting() {
  const user = useContext(UserContext);
  //eslint-disable-next-line
  const [sortedResponses, loading, error, submitResponse, deleteResponse] =
    useResponses("get", "/db/responses");
  const [roomCodeDisplayed, setRoomCodeDisplayed] = useState(false);
  const [meetingActionsShown, setMeetingActionsShown] = useState(false);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1 className="meeting-heading">Answers for {constructCurrentDate()}</h1>

      {user.role === "admin" && (
        <AdminResponses
          roomCodeDisplayed={roomCodeDisplayed}
          sortedResponses={sortedResponses}
        />
      )}
      {user.role === "member" && (
        <Responses
          sortedResponses={sortedResponses}
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
