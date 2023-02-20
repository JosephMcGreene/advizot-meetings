//Components
import AdminResponses from "../responses/AdminResponses";
import ActionsMenu from "../utilities/ActionsMenu";

export default function AdminContent({
  sortedResponses,
  loading,
  openForm,
  formDisplayed,
  onSubmit,
  closeForm,
}) {

  // async function generateMeeting() {}

  return (
    <>
      <AdminResponses sortedResponses={sortedResponses} loading={loading} />

      <ActionsMenu />
    </>
  );
}
