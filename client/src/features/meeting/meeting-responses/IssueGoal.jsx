import { useState } from "react";
//Assets
import editPen from "../../../assets/img/pen-solid.svg";
//Components
import ModalTemplate from "../../../shared/modals/ModalTemplate";
import MeetingForm from "../form/MeetingForm";

export default function IssueGoal({
  title,
  className,
  text,
  submitEdits,
  userResponseBody,
}) {
  const [editPenShown, setEditPenShown] = useState(false);
  const [meetingFormShown, setMeetingFormShown] = useState(false);

  return (
    <>
      <article
        className={className}
        onMouseEnter={() => setEditPenShown(true)}
        onMouseLeave={() => setEditPenShown(false)}
        onClick={() => setMeetingFormShown(!meetingFormShown)}
      >
        <h4>
          <strong>{title}</strong>
        </h4>

        <br />

        {text}
        {editPenShown && <img src={editPen} alt="edit" className="edit-pen" />}
      </article>

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
