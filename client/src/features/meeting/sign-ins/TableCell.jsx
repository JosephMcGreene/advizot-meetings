import { useState } from "react";
// Assets
import { ReactComponent as EditPen } from "../../../assets/img/pen-solid.svg";
import { ReactComponent as Lightning } from "../../../assets/img/bolt-lightning-solid.svg";
// Components
import ModalTemplate from "../../../shared/modals/ModalTemplate";
import MeetingForm from "../form/MeetingForm";

export default function TableCell({
  signInBody,
  signInItem,
  canEdit,
  handleSubmitEdits,
}) {
  const [meetingFormShown, setMeetingFormShown] = useState(false);

  return (
    <>
      <td
        onClick={() => canEdit() && setMeetingFormShown(!meetingFormShown)}
        className="tbody-th"
      >
        {signInItem === "L" ? <Lightning className="icon" /> : signInItem}
        {canEdit() && <EditPen className="edit-pen" />}
      </td>

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
