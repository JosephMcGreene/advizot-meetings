import { useState } from "react";
//Internal
import { constructCurrentDate } from "../../helpers";
//Assets
import formIcon from "../../assets/img/file-pen-solid.svg";
import meetingIcon from "../../assets/img/people-group-solid.svg";
//Components
import ModalTemplate from "../modals/ModalTemplate";
import MeetingForm from "../modals/form/MeetingForm";
import NewMeeting from "../modals/NewMeeting";

export default function ActionsList({ onNewMeeting, onFormSubmit }) {
  const [formDisplayed, seFormDisplayed] = useState(false);
  const [newMeetingDisplayed, setNewMeetingDisplayed] = useState(false);

  return (
    <ul className="actions-list">
      <li className="actions-item">
        <button
          onClick={() => setNewMeetingDisplayed(!newMeetingDisplayed)}
          className="actions-btn"
        >
          <span className="actions-label">New Meeting</span>
          <img
            className="actions-list-icon"
            src={meetingIcon}
            alt="New Meeting"
          />
        </button>
      </li>
      {newMeetingDisplayed && (
        <ModalTemplate
          title="New Meeting"
          onClose={() => setNewMeetingDisplayed(false)}
        >
          <NewMeeting
            onSubmit={onNewMeeting}
            onClose={() => setNewMeetingDisplayed(false)}
          />
        </ModalTemplate>
      )}

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
        <ModalTemplate
          title={constructCurrentDate() + " Meeting"}
          onClose={() => seFormDisplayed(false)}
        >
          <MeetingForm
            onSubmit={onFormSubmit}
            onClose={() => seFormDisplayed(false)}
          />
        </ModalTemplate>
      )}
    </ul>
  );
}
