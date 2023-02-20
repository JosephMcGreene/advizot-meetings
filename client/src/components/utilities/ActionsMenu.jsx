import { useState } from "react";
//Assets
import verticalEllipse from "../../assets/img/ellipsis-vertical-solid.svg";
//Components
import ActionsList from "./ActionsList";

export default function ActionsMenu({ openForm, openNewMeeting }) {
  const [showActions, setShowActions] = useState(false);

  return (
    <nav className="user-actions">
      {showActions && <ActionsList />}

      <button
        onClick={() => setShowActions(!showActions)}
        className="user-action-btn"
      >
        <img
          src={verticalEllipse}
          alt="user-actions"
          className="actions-icon"
        />
      </button>
    </nav>
  );
}
