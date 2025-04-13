import { useContext } from "react";
import { UserContext } from "../../../App";
// Internal
import SignInsCardView from "../sign-ins/card-view/SignInsCardView";
import SignInsTableView from "../sign-ins/table-view/SignInsTableView";

export default function SignInList({ deleteSignIn, signIns, submitSignIn }) {
  const user = useContext(UserContext);

  /**
   * Assesses whether the current user has permissions to edit or delete the sign-in they hover over
   *
   * @returns {boolean} whether or not the user can edit or delete the sign-in
   */
  function signInBelongsToUser(signInBody) {
    if (user.advizotID === signInBody?.userID) return true;
    return false;
  }

  return (
    <div>
      {window.innerWidth < 768 ? (
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
    </div>
  );
}
