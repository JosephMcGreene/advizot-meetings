import { useState } from "react";
//Internal
import { constructCurrentDate } from "../../helpers";
//Components
import AdminResponses from "../responses/admin/AdminResponses";
import UtilButtons from "../utilities/UtilButtons";
import MeetingForm from "../modals/form/MeetingForm";
import ModalTemplate from "../modals/ModalTemplate";
import NewMeeting from "../modals/NewMeeting";

export default function AdminContent({
  sortedResponses,
  loading,
  openForm,
  formDisplayed,
  onSubmit,
  closeForm,
}) {
  const [showNewMeeting, setShowNewMeeting] = useState(false);

  async function generateMeeting() {}

  return (
    <>
      <AdminResponses sortedResponses={sortedResponses} loading={loading} />

      <UtilButtons
        openForm={() => openForm(true)}
        openNewMeeting={() => setShowNewMeeting(true)}
      />
      {formDisplayed && (
        <ModalTemplate
          title={constructCurrentDate() + " Meeting"}
          onClose={() => closeForm()}
          body={
            <MeetingForm
              onSubmit={(responseToSubmit) => onSubmit(responseToSubmit)}
              onClose={() => closeForm()}
            />
          }
        />
      )}
      {showNewMeeting && (
        <ModalTemplate
          title={"New Meeting"}
          onClose={() => setShowNewMeeting(false)}
          body={
            <NewMeeting
              onSubmit={(meetingInfo) => generateMeeting(meetingInfo)}
            />
          }
        />
      )}
    </>
  );
}
