//Internal
import { constructCurrentDate } from "../../helpers";
//Components
import Responses from "../responses/user/Responses";
// import UtilButtons from "../utilities/UtilButtons";
import MeetingForm from "../modals/form/MeetingForm";
import ModalTemplate from "../modals/ModalTemplate";

export default function MemberContent({
  sortedResponses,
  loading,
  formDisplayed,
  onSubmit,
  openForm,
  closeForm,
}) {
  return (
    <>
      <Responses
        sortedResponses={sortedResponses}
        loading={loading}
        onSubmitEdits={(responseToSubmit) => onSubmit(responseToSubmit)}
      />
      {/* <UtilButtons openForm={openForm} /> */}

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
    </>
  );
}
