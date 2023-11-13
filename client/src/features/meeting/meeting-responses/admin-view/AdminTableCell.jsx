import { useState } from "react";
//Assets
import editPen from "../../../../assets/img/pen-solid.svg";
//Components
import ModalTemplate from "../../../../shared/modals/ModalTemplate";
import MeetingForm from "../../form/MeetingForm";

export default function AdminTableCell({
  signInBody,
  signInItem,
  handleSubmitEdits,
}) {
  const [meetingFormShown, setMeetingFormShown] = useState(false);

  return (
    <>
      <p
        onClick={() => setMeetingFormShown(!meetingFormShown)}
        className="admin-info-cell"
      >
        {signInItem}
        <img src={editPen} alt="edit" className="edit-pen" />
      </p>

      {meetingFormShown && (
        <ModalTemplate
          title="Edit Sign-in"
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
