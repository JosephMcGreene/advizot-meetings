//Components
import Responses from "../responses/user/Responses";
// import UtilButtons from "../utilities/UtilButtons";
// import MeetingForm from "../form/MeetingForm";

export default function MemberContent(props) {
  return (
    <>
      <Responses
        sortedResponses={props.sortedResponses}
        loading={props.loading}
        onSubmitEdits={(responseToSubmit) => props.onSubmit(responseToSubmit)}
        onDelete={(responseToDelete) => props.onDelete(responseToDelete)}
      />
      {/* <UtilButtons props.openForm={openForm} />

      {showForm && (
        <MeetingForm
          onClose={() => props.closeForm(false)}
          onSubmit={(responseToSubmit) => props.onSubmit(responseToSubmit)}
        />
      )} */}
    </>
  );
}
