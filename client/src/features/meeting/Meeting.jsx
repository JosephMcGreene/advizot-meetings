import { useState, useContext } from "react";
import { UserContext } from "../../App";
// Assets
import { ReactComponent as AddIcon } from "../../assets/img/file-circle-plus-solid.svg";
// Components
import LoadingSpinner from "../../shared/LoadingSpinner";
import MeetingHeading from "./MeetingHeading";
import SignInList from "./sign-ins/SignInList";
import ModalTemplate from "../../shared/modals/ModalTemplate";
import MeetingForm from "./form/MeetingForm";
import ActionsMenu from "./ActionsMenu";
// External
import { useParams } from "react-router-dom";
// Hooks
import useMeeting from "../../hooks/useMeeting";
// Internal
import { currentDate } from "../../helpers";

export default function Meeting() {
  const { group } = useParams();

  const user = useContext(UserContext);
  const [formShown, setFormShown] = useState(false);
  const [signIns, loading, submitSignIn, deleteSignIn] = useMeeting(
    "get",
    `/signIns/${group}`
  );

  /**
   * Searches the sign-ins array for a sign-in that the user has submitted and uses that information to return true if the user has signed in, or false if they have not.
   *
   * @returns {boolean} whether or not the user has signed into this meeting
   */
  function userHasSignedIn() {
    const signInOfUser = signIns.find(
      (signIn) => signIn.userID === user.advizotID
    );
    return signInOfUser ? true : false;
  }

  /**
   * Assesses whether or not to display the sign-in list, nothing, or the "Add sign-in" button for the meeting
   *
   * @returns {boolean} whether or not to display the sign-in list
   */
  function showSignInList() {
    if (user.role === "admin" || userHasSignedIn()) return false;
    if (signIns.length === 0 && user.role === "member") return true;
    return false;
  }

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <MeetingHeading group={group} />

      {showSignInList() ? (
        <button className="btn" onClick={() => setFormShown(true)}>
          <AddIcon className="icon" />
          Sign in to the Meeting
        </button>
      ) : (
        <SignInList
          deleteSignIn={deleteSignIn}
          signIns={signIns}
          submitSignIn={submitSignIn}
        />
      )}

      <ActionsMenu
        currentGroup={group}
        handleNewSignInClick={() => setFormShown(true)}
        signIns={signIns}
      />

      {formShown && (
        <ModalTemplate
          handleClose={() => setFormShown(false)}
          title={`${currentDate("month")}, ${currentDate("year")}`}
        >
          <MeetingForm
            handleClose={() => setFormShown(false)}
            handleSubmit={(signInToSubmit) => submitSignIn(signInToSubmit)}
          />
        </ModalTemplate>
      )}
    </>
  );
}
