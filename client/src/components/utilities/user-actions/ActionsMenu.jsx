import { useState } from "react";
//Assets
import verticalEllipse from "../../../assets/img/ellipsis-vertical-solid.svg";
//Components
import ActionsList from "./ActionsList";

export default function ActionsMenu({ displayPasscode, onFormSubmit }) {
  const [actionsShown, setActionsShown] = useState(false);

  return (
    <nav className="user-actions">
      {actionsShown && (
        <ActionsList
          displayPasscode={displayPasscode}
          onFormSubmit={onFormSubmit}
          onClose={() => setActionsShown(!actionsShown)}
        />
      )}

      <button
        onClick={() => setActionsShown(!actionsShown)}
        className="user-action-btn"
      >
        <img src={verticalEllipse} alt="user-actions" className="dots-icon" />
      </button>
    </nav>
  );
}
