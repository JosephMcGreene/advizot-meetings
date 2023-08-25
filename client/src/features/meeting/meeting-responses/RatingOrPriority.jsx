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
