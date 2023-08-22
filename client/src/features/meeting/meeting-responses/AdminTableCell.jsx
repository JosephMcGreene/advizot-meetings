import { useState } from "react";
//Assets
import editPen from "../../../assets/img/pen-solid.svg";
//Hooks
import useResponses from "../../../hooks/useResponses";
//Components
import ModalTemplate from "../../../shared/modals/ModalTemplate";
import MeetingForm from "../form/MeetingForm";

export default function AdminTableCell({ userResponseBody, responseItem }) {
  const [editPenShown, setEditPenShown] = useState(false);
  const [meetingFormShown, setMeetingFormShown] = useState(false);
  //eslint-disable-next-line
  const [responses, loading, error, submitResponse, deleteResponse] =
    useResponses();

  return (
    <>
      <p
        onMouseEnter={() => setEditPenShown(true)}
        onMouseLeave={() => setEditPenShown(false)}
        onClick={() => setMeetingFormShown(true)}
        className="admin-info-cell"
      >
        {responseItem}
        {editPenShown && <img src={editPen} alt="edit" className="edit-pen" />}
      </p>

      {meetingFormShown && (
        <ModalTemplate
          title="Edit Response"
          onClose={() => setMeetingFormShown(false)}
        >
          <MeetingForm
            onSubmit={(responseToSubmit) => submitResponse(responseToSubmit)}
            onClose={() => setMeetingFormShown(false)}
            existingResponse={userResponseBody}
          />
        </ModalTemplate>
      )}
    </>
  );
}
