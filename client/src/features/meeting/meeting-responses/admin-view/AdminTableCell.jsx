import { useState } from "react";
//Assets
import editPen from "../../../../assets/img/pen-solid.svg";
//Components
import ModalTemplate from "../../../../shared/modals/ModalTemplate";
import MeetingForm from "../../form/MeetingForm";

export default function AdminTableCell({
  responseBody,
  responseItem,
  handleSubmitEdits,
}) {
  const [meetingFormShown, setMeetingFormShown] = useState(false);

  return (
    <>
      <p
        onClick={() => setMeetingFormShown(!meetingFormShown)}
        className="admin-info-cell"
      >
        {responseItem}
        <img src={editPen} alt="edit" className="edit-pen" />
      </p>

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
