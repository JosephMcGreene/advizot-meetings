import { useState } from "react";
//Assets
import editPen from "../../../assets/img/pen-solid.svg";
//Components
import ModalTemplate from "../../../shared/modals/ModalTemplate";
import MeetingForm from "../form/MeetingForm";

export default function AdminTableCell({
  responseBody,
  responseItem,
  submitEdits,
}) {
  const [editPenShown, setEditPenShown] = useState(false);
  const [meetingFormShown, setMeetingFormShown] = useState(false);

  return (
    <>
      <p
        onClick={() => setMeetingFormShown(!meetingFormShown)}
        onMouseEnter={() => setEditPenShown(true)}
        onMouseLeave={() => setEditPenShown(false)}
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
            onSubmit={(responseToSubmit) => submitEdits(responseToSubmit)}
            onClose={() => setMeetingFormShown(false)}
            existingResponse={responseBody}
          />
        </ModalTemplate>
      )}
    </>
  );
}
