import { useState, useContext } from "react";
import { UserContext } from "../../App";
//Assets
import newResponse from "../../assets/img/file-circle-plus-solid.svg";
//Helpers
import { constructCurrentDate } from "../../helpers";
//Hooks
import useMeeting from "../../hooks/useMeeting";
//Components
import LoadingSpinner from "../../shared/LoadingSpinner";
import ErrorPage from "../../shared/ErrorPage";
import RoomCodeToggle from "./RoomCodeToggle";
import AdminResponses from "./meeting-responses/AdminResponses";
import Responses from "./meeting-responses/Responses";
import ModalTemplate from "../../shared/modals/ModalTemplate";
import MeetingForm from "./form/MeetingForm";

export default function Meeting() {
  const user = useContext(UserContext);

  const [roomCodeDisplayed, setRoomCodeDisplayed] = useState(false);
  const [formDisplayed, setFormDisplayed] = useState(false);

  const [responses, loading, error, submitResponse, deleteResponse] =
    useMeeting("get", "/db/responses");

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage error={error} />;

  return (
    <>
      <h1 className="meeting-heading">Answers for {constructCurrentDate()}</h1>

      <RoomCodeToggle
        handleClick={() => setRoomCodeDisplayed(!roomCodeDisplayed)}
        roomCodeDisplayed={roomCodeDisplayed}
      />

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

      <button
        className="add-response-btn"
        handleClick={() => setFormDisplayed(!formDisplayed)}
      >
        <img src={newResponse} alt="user actions" className="add-icon" />
      </button>

      {formDisplayed && (
        <ModalTemplate
          title={constructCurrentDate() + " Meeting"}
          onClose={() => setFormDisplayed(false)}
        >
          <MeetingForm
            onSubmit={(responseToSubmit) => submitResponse(responseToSubmit)}
            onClose={() => setFormDisplayed(false)}
          />
        </ModalTemplate>
      )}
    </>
  );
}
