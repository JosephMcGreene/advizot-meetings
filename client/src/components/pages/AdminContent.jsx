import { useState } from "react";
//Internal
import { constructCurrentDate } from "../../helpers";
//Components
import AdminResponses from "../responses/admin/AdminResponses";
import UtilButtons from "../utilities/UtilButtons";
import MeetingForm from "../modals/form/MeetingForm";
import ModalTemplate from "../modals/ModalTemplate";
import NewMeeting from "../modals/NewMeeting";

export default function AdminContent(props) {
  const [showNewMeeting, setShowNewMeeting] = useState(false);

  async function generateMeeting() {}

  return (
    <>
      <AdminResponses
        sortedResponses={props.sortedResponses}
        onDelete={props.onDelete}
        loading={props.loading}
      />

      <UtilButtons
        openForm={() => props.openForm(true)}
        openNewMeeting={() => setShowNewMeeting(true)}
      />
      {props.showForm && (
        <ModalTemplate
          body={
            <MeetingForm
              onSubmit={(responseToSubmit) => props.onSubmit(responseToSubmit)}
              onClose={() => props.closeForm(false)}
            />
          }
          title={constructCurrentDate() + " Meeting"}
          onClose={() => props.closeForm(false)}
        />
      )}
      {showNewMeeting && (
        <ModalTemplate
          body={
            <NewMeeting
              onSubmit={(meetingInfo) => generateMeeting(meetingInfo)}
            />
          }
          title={"New Meeting"}
          onClose={() => setShowNewMeeting(false)}
        />
      )}
    </>
  );
}
