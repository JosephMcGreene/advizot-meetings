import { useState } from "react";
import { constructDate } from "../../helpers";
import AdminResponses from "../responses/admin/AdminResponses";
import UtilButtons from "../utilities/UtilButtons";
import MeetingForm from "../form/MeetingForm";
import Modal from "../modals/Modal";
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

  return (
    <>
      <AdminResponses
        sortedResponses={sortedResponses}
        onDelete={onDelete}
        loading={loading}
      />
      <UtilButtons
        openForm={openForm}
        generateMeeting={() => setShowNewMeeting(true)}
      />

      {showForm && (
        <MeetingForm
          onClose={() => closeForm(false)}
          onSubmit={(responseToSubmit) => onSubmit(responseToSubmit)}
        />
      )}

      {showNewMeeting && (
        <Modal
          title={constructDate() + " Meeting"}
          onClose={() => setShowNewMeeting(false)}
          body={<NewMeeting />}
        />
      )}
    </>
  );
}
