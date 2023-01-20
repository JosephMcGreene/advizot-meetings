import AdminResponses from "../responses/admin/AdminResponses";
import UtilButtons from "../../utilities/UtilButtons";
import MeetingForm from "../form/MeetingForm";

export default function AdminContent({
  sortedResponses,
  loading,
  showForm,
  openForm,
  closeForm,
  onSubmit,
}) {
  return (
    <>
      <AdminResponses sortedResponses={sortedResponses} loading={loading} />
      <UtilButtons openForm={openForm} />

      {showForm && (
        <MeetingForm
          onClose={() => closeForm(false)}
          onSubmit={(responseToSubmit) => onSubmit(responseToSubmit)}
        />
      )}
    </>
  );
}
