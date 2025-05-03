import { useState } from "react";
// Assets
import { ReactComponent as EditPen } from "../../../assets/img/pen-solid.svg";
import { ReactComponent as Lightning } from "../../../assets/img/bolt-lightning-solid.svg";
// Components
import ModalTemplate from "../../../shared/modals/ModalTemplate";
import MeetingForm from "../form/MeetingForm";

export default function TableCell({ signInBody, canEdit, handleSubmitEdits }) {
  const [meetingFormShown, setMeetingFormShown] = useState(false);

  return (
    <>
      <td
        onClick={() => canEdit() && setMeetingFormShown(!meetingFormShown)}
        className="tbody-th"
      >
        <div className="inner-table-row">
          <p>Business: {signInBody.business}</p>
          <p>Personal: {signInBody.personal}</p>
          <p>Relationships: {signInBody.relationships}</p>
        </div>
        <div className="lower-row">
          <h4>Issue</h4>
          <p>{signInBody.monthlyIssue}</p>
        </div>
        <div className="lower-row">
          <h4>Goal</h4>
          <p>{signInBody.monthlyGoal}</p>
        </div>
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
