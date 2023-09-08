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
  handleSubmitEdits,
  responseBody,
  isCorrectUser,
}) {
  const [meetingFormShown, setMeetingFormShown] = useState(false);

  return (
    <>
      <article
        className={className}
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
        {isCorrectUser() && (
          <img src={editPen} alt="edit" className="edit-pen" />
        )}
      </article>

      {meetingFormShown && (
        <ModalTemplate
          title="Edit Response"
          handleClose={() => setMeetingFormShown(false)}
        >
          <MeetingForm
            handleSubmit={(responseToSubmit) =>
              handleSubmitEdits(responseToSubmit)
            }
            handleClose={() => setMeetingFormShown(false)}
            existingResponse={responseBody}
          />
        </ModalTemplate>
      )}
    </>
  );
}
