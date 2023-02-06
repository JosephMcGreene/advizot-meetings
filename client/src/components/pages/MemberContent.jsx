import Responses from "../responses/user/Responses";
import UtilButtons from "../utilities/UtilButtons";
import MeetingForm from "../form/MeetingForm";

export default function MemberContent({
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
      <Responses
        sortedResponses={sortedResponses}
        loading={loading}
        onSubmitEdits={(responseToSubmit) => onSubmit(responseToSubmit)}
        onDelete={(responseToDelete) => onDelete(responseToDelete)}
      />
      {/* <UtilButtons openForm={openForm} />

      {showForm && (
        <MeetingForm
          onClose={() => closeForm(false)}
          onSubmit={(responseToSubmit) => onSubmit(responseToSubmit)}
        />
      )} */}
    </>
  );
}
