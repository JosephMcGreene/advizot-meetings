import { useState } from "react";
import { constructDate } from "../../helpers";
import AdminResponses from "../responses/admin/AdminResponses";
import UtilButtons from "../utilities/UtilButtons";
import MeetingForm from "../form/MeetingForm";
import ModalTemplate from "../modals/ModalTemplate";
import NewMeeting from "../modals/NewMeeting";

export default function AdminContent({
  sortedResponses,
  loading,
  showForm,
  openForm,
  closeForm,
  onSubmit,
  onDelete,
}) {
  const [showNewMeeting, setShowNewMeeting] = useState(false);

  function generateMeeting() {}

  return (
    <>
      <AdminResponses
        sortedResponses={sortedResponses}
        onDelete={onDelete}
        loading={loading}
      />

      <UtilButtons
        openForm={openForm}
        openNewMeeting={() => setShowNewMeeting(true)}
      />
      {showNewMeeting && (
        <ModalTemplate
          body={
            <NewMeeting
              onSubmit={(meetingInfo) => generateMeeting(meetingInfo)}
            />
          }
          title={constructDate() + " Meeting"}
          onClose={() => setShowNewMeeting(false)}
        />
      )}
      {showForm && (
        <MeetingForm
          onClose={() => closeForm(false)}
          onSubmit={(responseToSubmit) => onSubmit(responseToSubmit)}
        />
      )}
    </>
  );
}
