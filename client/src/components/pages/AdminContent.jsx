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
  onDelete,
}) {
  return (
    <>
      <AdminResponses
        sortedResponses={sortedResponses}
        onDelete={onDelete}
        loading={loading}
      />
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
