import { useState, useContext } from "react";
import { UserContext } from "../../App";
//Assets
import eyeVisible from "../../assets/img/eye-solid.svg";
import eyeHidden from "../../assets/img/eye-slash-solid.svg";
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
      <button
        className="code-toggle"
        onClick={() => setRoomCodeDisplayed(!roomCodeDisplayed)}
      >
        {roomCodeDisplayed ? (
          <img src={eyeHidden} alt="Hide room code" className="eye-icon" />
        ) : (
          <img src={eyeVisible} alt="Show room code" className="eye-icon" />
        )}
      </button>

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
          submitEdits={(responseToSubmit) => submitResponse(responseToSubmit)}
        />
      )}

      <ActionsMenu
        actionToggle={() => setMeetingActionsShown(!meetingActionsShown)}
        className="user-actions main-meeting-actions"
      >
        {meetingActionsShown && (
          <MeetingActionList
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
