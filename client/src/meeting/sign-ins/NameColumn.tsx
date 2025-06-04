import { useState, useContext } from "react";
import { UserContext } from "../../App";
// Assets
import { ReactComponent as CheckInIcon } from "../../assets/img/handshake-solid.svg";
import { ReactComponent as DeleteBtn } from "../../assets/img/trash-can-solid.svg";
import { ReactComponent as EditBtn } from "../../assets/img/pen-solid.svg";
import { ReactComponent as Lightning } from "../../assets/img/bolt-lightning-solid.svg";
// Components
import MainForm from "../../shared/form/MainForm";
import ModalTemplate from "../../shared/modals/ModalTemplate";
// External
import { useLocation } from "react-router-dom";
// Internal
import { currentDate } from "../../helpers";
// Types
import type { SignIn } from "../../types/signIn.d.ts";

type Props = {
  handleDelete: () => void;
  handleSubmitEdits: () => void;
  signInBody: SignIn;
};

export default function NameColumn({
  handleDelete,
  handleSubmitEdits,
  signInBody,
}: Props) {
  const location = useLocation();
  const user = useContext(UserContext);
  const [meetingFormShown, setMeetingFormShown] = useState(false);

  /**
   * Assesses whether the current user has permissions to edit or delete a sign-in.
   * @returns {boolean} whether or not the user can edit or delete the sign-in.
   */
  function signInBelongsToUser(signInID) {
    if (user.advizotID === signInID) return true;
    return false;
  }

  /**
   * @returns {boolean} Whether or not the user is authorized to edit the sign-in.
   */
  function canEdit() {
    if (signInBelongsToUser(signInBody?.userID) || user.role === "admin") {
      return true;
    }

    return false;
  }

  const isProfilePage = location.pathname.includes("/profile");

  return (
    <>
      <article className="sign-in-name-col">
        {signInBody.forOneToOne && <CheckInIcon className="check-in-icon" />}

        <h2 className="user-name">{signInBody.userName}</h2>

        {isProfilePage && (
          <h3 className="date">
            {currentDate("month", new Date(signInBody.date))},{" "}
            {currentDate("year", new Date(signInBody.date))}
          </h3>
        )}

        <h3 className="priority">
          Priority:{" "}
          {signInBody.priority.substring(1) === "L" ? (
            <Lightning width="12px" />
          ) : (
            signInBody.priority.substring(1)
          )}
        </h3>

        {canEdit() && (
          <div className="icon-container">
            {/* prettier-ignore */}
            <EditBtn className="edit-icon" onClick={() => canEdit() && setMeetingFormShown(!meetingFormShown)} />
            {/* prettier-ignore */}
            <DeleteBtn className="edit-icon" onClick={() => handleDelete(signInBody._id)} />
          </div>
        )}
      </article>

      {meetingFormShown && (
        <ModalTemplate
          handleClose={() => setMeetingFormShown(false)}
          title="Edit Sign-in"
        >
          <MainForm
            existingSignIn={signInBody}
            handleClose={() => setMeetingFormShown(false)}
            handleSubmit={(signInToSubmit, existingSignIn) =>
              handleSubmitEdits(signInToSubmit, existingSignIn)
            }
          />
        </ModalTemplate>
      )}
    </>
  );
}
