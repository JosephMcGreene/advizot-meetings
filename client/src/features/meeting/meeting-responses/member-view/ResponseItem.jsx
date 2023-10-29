import { useState } from "react";
//Assets
import editPen from "../../../../assets/img/pen-solid.svg";
//Components
import ModalTemplate from "../../../../shared/modals/ModalTemplate";
import MeetingForm from "../../form/MeetingForm";

export default function ResponseItem({
  title,
  text,
  className,
  handleSubmitEdits,
  responseBody,
  responseBelongsToUser,
}) {
  const [meetingFormShown, setMeetingFormShown] = useState(false);

  return (
    <>
      <article
        className={className}
        onClick={
          responseBelongsToUser()
            ? () => setMeetingFormShown(!meetingFormShown)
            : undefined
        }
      >
        <h4>
          <strong>{title}</strong>
        </h4>

        <br />

        {text}
        {responseBelongsToUser() && (
          <img src={editPen} alt="edit" className="edit-pen" />
        )}
      </article>

      {meetingFormShown && (
        <ModalTemplate
          title="Edit Response"
          handleClose={() => setMeetingFormShown(false)}
        >
          <MeetingForm
            handleSubmit={(responseToSubmit, existingResponse) =>
              handleSubmitEdits(responseToSubmit, existingResponse)
            }
            handleClose={() => setMeetingFormShown(false)}
            existingResponse={responseBody}
          />
        </ModalTemplate>
      )}
    </>
  );
}
