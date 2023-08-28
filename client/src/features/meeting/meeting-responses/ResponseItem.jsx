import { useState } from "react";
//Assets
import editPen from "../../../assets/img/pen-solid.svg";
//Components
import ModalTemplate from "../../../shared/modals/ModalTemplate";
import MeetingForm from "../form/MeetingForm";

export default function ResponseItem({
  title,
  text,
  className,
  submitEdits,
  responseBody,
  isCorrectUser,
}) {
  const [editPenShown, setEditPenShown] = useState(false);
  const [meetingFormShown, setMeetingFormShown] = useState(false);

  return (
    <>
      <article
        className={className}
        onMouseEnter={() => setEditPenShown(true)}
        onMouseLeave={() => setEditPenShown(false)}
        onClick={
          isCorrectUser()
            ? () => setMeetingFormShown(!meetingFormShown)
            : undefined
        }
      >
        <h4>
          <strong>{title}</strong>
        </h4>

        <br />

        {text}
        {isCorrectUser() && editPenShown && (
          <img src={editPen} alt="edit" className="edit-pen" />
        )}
      </article>

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
