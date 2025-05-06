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
      <th className="meeting-table-column1">
        <h4 className="user-name">{signInBody.userName}</h4>

        <h5 className="priority">
          Priority:{" "}
          {signInBody.priority.substring(1) === "L" ? (
            <Lightning width="12px" />
          ) : (
            signInBody.priority.substring(1)
          )}
        </h5>

        {canEdit() && (
          <div className="icon-container">
            {/* prettier-ignore */}
            <EditBtn onClick={() => canEdit() && setMeetingFormShown(!meetingFormShown)} />
            {/* prettier-ignore */}
            <DeleteBtn onClick={() => handleDelete(signInBody._id)} />
          </div>
        )}
      </th>

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
