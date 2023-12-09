import { useState, useContext } from "react";
import { UserContext } from "../../App";
//Helpers
import { currentDate } from "../../helpers";
//Hooks
import useMeeting from "../../hooks/useMeeting";
//Components
import LoadingSpinner from "../../shared/LoadingSpinner";
import AdminView from "./meeting-responses/admin-view/AdminView";
import MemberView from "./meeting-responses/member-view/MemberView";
import ModalTemplate from "../../shared/modals/ModalTemplate";
import MeetingForm from "./form/MeetingForm";

export default function Meeting() {
  const user = useContext(UserContext);
  const [formShown, setFormShown] = useState(false);

  const [
    signIns,
    loading,
    currentGroup,
    getSignIns,
    submitSignIn,
    deleteSignIn,
  ] = useMeeting("get", `/signIns/${user.group}`);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      {user.role === "admin" && (
        <AdminView
          signIns={signIns}
          currentGroup={currentGroup}
          handleSubmitEdits={async (signInToSubmit, existingSignIn) => {
            await submitSignIn(signInToSubmit, existingSignIn);
          }}
          handleDelete={async (signInID) => {
            await deleteSignIn(signInID);
          }}
          handleNewSignInClick={() => setFormShown(!formShown)}
          handleFilterSubmit={async (filtersToSubmit) =>
            await getSignIns("get", `/signIns/${filtersToSubmit?.group}`)
          }
        />
      )}

      {user.role === "member" && (
        <MemberView
          signIns={signIns}
          handleSubmitEdits={async (signInToSubmit, existingSignIn) => {
            await submitSignIn(signInToSubmit, existingSignIn);
          }}
          handleDelete={async (signInID) => {
            await deleteSignIn(signInID);
          }}
          handleSignInClick={() => setFormShown(!formShown)}
        />
      )}

      {formShown && (
        <ModalTemplate
          title={`${currentDate("month")}, ${currentDate("year")}`}
          handleClose={() => setFormShown(false)}
        >
          <MeetingForm
            handleSubmit={(signInToSubmit) => submitSignIn(signInToSubmit)}
            handleClose={() => setFormShown(false)}
          />
        </ModalTemplate>
      )}
    </>
  );
}
