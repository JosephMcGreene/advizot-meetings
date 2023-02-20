import { useState } from "react";
//Assets
import formIcon from "../../assets/img/file-pen-solid.svg";
import meetingIcon from "../../assets/img/people-group-solid.svg";
//Components
import ModalTemplate from "../modals/ModalTemplate";
import MeetingForm from "../modals/form/MeetingForm";

export default function ActionsList({ onSubmit }) {
  const [formDisplayed, seFormDisplayed] = useState(false);

  return (
    <ul className="actions-list">
      <li className="actions-item">
        <button className="actions-btn">
          <span className="actions-label">New Meeting</span>
          <img
            className="actions-list-icon"
            src={meetingIcon}
            alt="New Meeting"
          />
        </button>
      </li>

      <li className="actions-item">
        <button
          onClick={() => seFormDisplayed(!formDisplayed)}
          className="actions-btn"
        >
          <span className="actions-label">Show Form</span>
          <img className="actions-list-icon" src={formIcon} alt="Form" />
        </button>
      </li>
      {formDisplayed && (
        <ModalTemplate title="Meeting" onClose={() => seFormDisplayed(false)}>
          <MeetingForm onSubmit={onSubmit} />
        </ModalTemplate>
      )}
    </ul>
  );
}
