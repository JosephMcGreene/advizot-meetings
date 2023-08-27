import { useState } from "react";
//Assets
import editPen from "../../../assets/img/pen-solid.svg";
//Components
import ModalTemplate from "../../../shared/modals/ModalTemplate";
import MeetingForm from "../form/MeetingForm";

export default function RatingOrPriority({
  title,
  text,
  className,
  submitEdits,
  userResponseBody,
}) {
  const [editPenShown, setEditPenShown] = useState(false);
  const [meetingFormShown, setMeetingFormShown] = useState(false);

  return (
    <>
      <span
        className={className}
        onMouseEnter={() => setEditPenShown(true)}
        onMouseLeave={() => setEditPenShown(false)}
        onClick={() => setMeetingFormShown(!meetingFormShown)}
      >
        <u>{title}</u>

        <br />

        {text}
        {editPenShown && <img src={editPen} alt="edit" className="edit-pen" />}
      </span>

      {meetingFormShown && (
        <ModalTemplate
          title="Edit Response"
          onClose={() => setMeetingFormShown(false)}
        >
          <MeetingForm
            onSubmit={(responseToSubmit) => submitEdits(responseToSubmit)}
            onClose={() => setMeetingFormShown(false)}
            existingResponse={userResponseBody}
          />
        </ModalTemplate>
      )}
    </>
  );
}
