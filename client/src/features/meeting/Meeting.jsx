import { useState, useContext } from "react";
import { UserContext } from "../../App";
//External
import { useParams } from "react-router-dom";
//Internal
import { currentDate } from "../../helpers";
//Hooks
import useMeeting from "../../hooks/useMeeting";
//Components
import LoadingSpinner from "../../shared/LoadingSpinner";
import MeetingHeading from "./MeetingHeading";
import AdminView from "./meeting-responses/admin-view/AdminView";
import MemberView from "./meeting-responses/member-view/MemberView";
import ModalTemplate from "../../shared/modals/ModalTemplate";
import MeetingForm from "./form/MeetingForm";

export default function Meeting() {
  const user = useContext(UserContext);
  const [formShown, setFormShown] = useState(false);
  const { group } = useParams();

  const [
    signIns,
    loading,
    currentGroup,
    getSignIns,
    submitSignIn,
    deleteSignIn,
  ] = useMeeting("get", `/signIns/${group}`);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <MeetingHeading currentGroup={group} />

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
          handleGroupChangeSubmit={async (groupToChange) =>
            await getSignIns("get", `/signIns/${groupToChange?.group}`)
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
