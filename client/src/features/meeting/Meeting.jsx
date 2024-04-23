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
import SignInsCardView from "./meeting-responses/card-view/SignInsCardView";
import SignInsTableView from "./meeting-responses/table-view/SignInsTableView";
import ModalTemplate from "../../shared/modals/ModalTemplate";
import MeetingForm from "./form/MeetingForm";
import ActionsMenu from "./ActionsMenu";

export default function Meeting() {
  const user = useContext(UserContext);
  const [formShown, setFormShown] = useState(false);
  const [cardView, setCardView] = useState(false);

  const { group } = useParams();

  const [signIns, loading, currentGroup, submitSignIn, deleteSignIn] =
    useMeeting("get", `/signIns/${group}`);

  /**
   * Assesses whether the current user has permissions to edit or delete the sign-in they hover over
   *
   * @returns {boolean} whether or not the user can edit or delete the sign-in
   */
  function signInBelongsToUser(signInBody) {
    if (user.advizotID === signInBody?.userID) return true;
    return false;
  }

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <MeetingHeading currentGroup={group} />

      {cardView ? (
        <SignInsCardView
          signIns={signIns}
          handleSubmitEdits={async (signInToSubmit, existingSignIn) => {
            await submitSignIn(signInToSubmit, existingSignIn);
          }}
          handleDelete={async (signInID) => {
            await deleteSignIn(signInID);
          }}
          signInBelongsToUser={signInBelongsToUser}
        />
      ) : (
        <SignInsTableView
          signIns={signIns}
          handleSubmitEdits={async (signInToSubmit, existingSignIn) => {
            await submitSignIn(signInToSubmit, existingSignIn);
          }}
          handleDelete={async (signInID) => {
            await deleteSignIn(signInID);
          }}
          signInBelongsToUser={signInBelongsToUser}
        />
      )}

      <ActionsMenu
        currentGroup={currentGroup}
        signIns={signIns}
        handleNewSignInClick={() => setFormShown(!formShown)}
        cardView={cardView}
        handleViewAsMemberClick={() => setCardView(!cardView)}
      />

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
