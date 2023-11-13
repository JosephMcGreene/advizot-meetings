import { useState } from "react";
//Assets
import editPen from "../../../../assets/img/pen-solid.svg";
//Components
import ModalTemplate from "../../../../shared/modals/ModalTemplate";
import MeetingForm from "../../form/MeetingForm";

export default function SignInItem({
  title,
  text,
  className,
  handleSubmitEdits,
  signInBody,
  signInBelongsToUser,
}) {
  const [meetingFormShown, setMeetingFormShown] = useState(false);

  return (
    <>
      <article
        className={className}
        onClick={
          signInBelongsToUser()
            ? () => setMeetingFormShown(!meetingFormShown)
            : undefined
        }
      >
        <h4>
          <strong>{title}</strong>
        </h4>

        <br />

        {text}
        {signInBelongsToUser() && (
          <img src={editPen} alt="edit" className="edit-pen" />
        )}
      </article>

      {meetingFormShown && (
        <ModalTemplate
          title="Edit Sign-In"
          handleClose={() => setMeetingFormShown(false)}
        >
          <MeetingForm
            handleSubmit={(signInToSubmit, existingSignIn) =>
              handleSubmitEdits(signInToSubmit, existingSignIn)
            }
            handleClose={() => setMeetingFormShown(false)}
            existingSignIn={signInBody}
          />
        </ModalTemplate>
      )}
    </>
  );
}
