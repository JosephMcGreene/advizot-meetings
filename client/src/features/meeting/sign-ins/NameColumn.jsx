import { useState } from "react";
// Assets
import { ReactComponent as DeleteBtn } from "../../../assets/img/trash-can-solid.svg";
import { ReactComponent as EditBtn } from "../../../assets/img/pen-solid.svg";
import { ReactComponent as Lightning } from "../../../assets/img/bolt-lightning-solid.svg";
// Components
import ModalTemplate from "../../../shared/modals/ModalTemplate";
import MeetingForm from "../form/MeetingForm";

export default function NameColumn({
  canEdit,
  handleDelete,
  handleSubmitEdits,
  signInBody,
}) {
  const [meetingFormShown, setMeetingFormShown] = useState(false);

  return (
    <>
      <article className="sign-in-name-col">
        <h2 className="user-name">{signInBody.userName}</h2>

        <h3 className="priority">
          Priority:{" "}
          {signInBody.priority.substring(1) === "L" ? (
            <Lightning width="12px" />
          ) : (
            signInBody.priority.substring(1)
          )}
        </h3>

        {canEdit() && (
          <div className="icon-container">
            {/* prettier-ignore */}
            <EditBtn className="edit-icon" onClick={() => canEdit() && setMeetingFormShown(!meetingFormShown)} />
            {/* prettier-ignore */}
            <DeleteBtn className="edit-icon" onClick={() => handleDelete(signInBody._id)} />
          </div>
        )}
      </article>

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
