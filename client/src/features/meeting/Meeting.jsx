import { useState, useContext } from "react";
import { UserContext } from "../../App";
// Assets
import { ReactComponent as AddSignInIcon } from "../../assets/img/file-circle-plus-solid.svg";
// Components
import ActionsMenu from "./admin-actions/ActionsMenu";
import LoadingSpinner from "../../shared/LoadingSpinner";
import MeetingForm from "./form/MeetingForm";
import MeetingHeading from "./MeetingHeading";
import ModalTemplate from "../../shared/modals/ModalTemplate";
import SignInList from "./sign-ins/SignInList";
// External
import { useParams } from "react-router-dom";
// Hooks
import useMeeting from "./useMeeting";
// Internal
import { currentDate } from "../../helpers";

export default function Meeting() {
  const { group } = useParams();

  const user = useContext(UserContext);
  const [formShown, setFormShown] = useState(false);
  const [signIns, loading, submitSignIn, deleteSignIn, getNewRoomCode] =
    useMeeting("get", `/signIns/${group}`);

  /**
   * determines if a user has entered a sign-in to this meeting by searching through the current list of sign-ins for one with a userID property that matches the user's advizotID.
   *
   * @returns {boolean} Whether the user has submitted a sign-in (true) or not (false).
   */
  function userHasSubmitted() {
    // prettier-ignore
    const signInOfUser = signIns.find(signIn => signIn.userID === user.advizotID);
    if (signInOfUser) return true;
    return false;
  }

  /**
   * Determines whether or not to display the list of sign-ins for the current group and meeting.
   *
   * @returns {boolean} whether or not to display the sign-in list.
   */
  function signInListShown() {
    if (user.role === "admin") return true;
    if (userHasSubmitted()) return true;
    return false;
  }

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <MeetingHeading getNewRoomCode={getNewRoomCode} group={group} />
      {/* Show the list of sign-ins for the group, or a button to add a new sign-in. */}
      {signInListShown() ? (
        <SignInList
          deleteSignIn={deleteSignIn}
          signIns={signIns}
          submitSignIn={submitSignIn}
        />
      ) : (
        <button className="btn" onClick={() => setFormShown(true)}>
          <AddSignInIcon className="icon" />
          Add a Sign In
        </button>
      )}

      {/* Display the actions button at the bottom-right of the screen. */}
      <ActionsMenu
        currentGroup={group}
        handleNewSignInClick={() => setFormShown(true)}
      />
      {/* Display the sign-in form when necessary. */}
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
