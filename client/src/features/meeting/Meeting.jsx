import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
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
import useMeeting from "./useMeeting";
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

  useEffect(() => {
    if (!userHasSignedIn()) setFormShown(true);
  }, []);

  /**
   * Searches the sign-ins array for a sign-in that the user has submitted and uses that information to return true if the user has signed in, or false if they have not.
   *
   * @returns {boolean} whether or not the user has signed into this meeting.
   */
  function userHasSignedIn() {
    // TODO Rebuild this function!!!

    return true | false;
  }

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <MeetingHeading group={group} />

      {/* If the user has not entered a sign-in, automatically prompt it. */}
      {!userHasSignedIn() ?? setFormShown(true)}

      {/* Show the list of sign-ins for the group if there are sign-ins to show. */}
      {signIns.length > 0 ? (
        <SignInList
          deleteSignIn={deleteSignIn}
          signIns={signIns}
          submitSignIn={submitSignIn}
        />
      ) : (
        <p>No one has signed in to this meeting yet.</p>
      )}

      {/* Display the actions button at the bottom-right of the screen. */}
      <ActionsMenu
        currentGroup={group}
        handleNewSignInClick={() => setFormShown(true)}
        signIns={signIns}
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
